// Options page logic for Orion Print Helper

const domainInput = document.getElementById('domain-input');
const addBtn = document.getElementById('add-btn');
const domainList = document.getElementById('domain-list');

// Load domains on startup
chrome.storage.local.get({ allowed_domains: ['delhivery.com'] }, (data) => {
    updateUI(data.allowed_domains);
});

addBtn.addEventListener('click', () => {
    const domain = domainInput.value.trim().toLowerCase();
    if (domain) {
        chrome.storage.local.get({ allowed_domains: [] }, (data) => {
            const domains = data.allowed_domains;
            if (!domains.includes(domain)) {
                domains.push(domain);
                chrome.storage.local.set({ allowed_domains: domains }, () => {
                    updateUI(domains);
                    domainInput.value = '';
                });
            }
        });
    }
});

function updateUI(domains) {
    domainList.innerHTML = '';
    domains.forEach(domain => {
        const li = document.createElement('li');
        li.className = 'domain-item';
        li.innerHTML = `
            <span>${domain}</span>
            <button class="remove-btn" data-domain="${domain}">&times;</button>
        `;
        domainList.appendChild(li);
    });

    // Add remove listeners
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.onclick = (e) => {
            const domainToRemove = e.target.getAttribute('data-domain');
            chrome.storage.local.get({ allowed_domains: [] }, (data) => {
                const newDomains = data.allowed_domains.filter(d => d !== domainToRemove);
                chrome.storage.local.set({ allowed_domains: newDomains }, () => {
                    updateUI(newDomains);
                });
            });
        };
    });
}
