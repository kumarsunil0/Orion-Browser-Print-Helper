(function() {
    // Domain filtering: Only run if site is in the allowed list
    const currentHost = window.location.hostname.toLowerCase();
    
    chrome.storage.local.get({ allowed_domains: ['delhivery.com'] }, (data) => {
        const domains = data.allowed_domains;
        const isAllowed = domains.some(domain => currentHost.includes(domain));
        
        if (!isAllowed) {
            return;
        }

        console.log("Orion Print Helper Active on " + currentHost);
        injectOverride();
    });

    function injectOverride() {
        const code = `
            (function() {
                if (window.orion_helper_active) return;
                window.orion_helper_active = true;

                const originalOpen = window.open;

                window.open = function(url, name, specs) {
                    console.log("Orion Print Helper: Intercepting window.open. URL:", url);
                    
                    if (url && url !== 'about:blank' && url.length > 0) {
                        console.log("Orion Print Helper: Requesting background to open tab...");
                        chrome.runtime.sendMessage({ 
                            action: "open_new_tab", 
                            url: url 
                        });
                        return { closed: false, focus: function(){} }; // Dummy
                    } else {
                        // For blank popups (document.write), we still have to use the same tab
                        // because background scripts cannot document.write to a new tab easily.
                        console.log("Orion Print Helper: Forcing blank popup to same tab");
                        return window; 
                    }
                };

                // Aggressively force forms to background
                document.addEventListener('submit', function(e) {
                    // Note: Form submission is harder to direct to background without a URL.
                    // For now, we still rely on target="_blank".
                    const form = e.target;
                    form.target = '_blank';
                }, true);

                // Force clicks to background
                document.addEventListener('click', function(e) {
                    const btn = e.target.closest('button, input[type="button"], a');
                    if (btn) {
                        const isPrint = (btn.innerText && btn.innerText.toLowerCase().includes('print')) || 
                                        (btn.href && btn.href.includes('print')) ||
                                        (btn.className && btn.className.toLowerCase().includes('print'));

                        if (isPrint) {
                            console.log("Orion Print Helper: Print action detected.");
                            if (btn.tagName === 'A' && btn.href && !btn.href.startsWith('javascript:')) {
                                e.preventDefault();
                                e.stopImmediatePropagation();
                                chrome.runtime.sendMessage({ action: "open_new_tab", url: btn.href });
                            }
                        }
                    }
                }, true);

            })();
        `;

        const script = document.createElement('script');
        script.textContent = code;
        (document.head || document.documentElement).appendChild(script);
        script.remove();
    }

    injectOverride();
    setInterval(injectOverride, 2000);
})();
