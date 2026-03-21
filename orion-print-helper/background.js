// Background script for Orion Print Helper
// Handles opening new tabs using chrome.tabs API to bypass popup blockers

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "open_new_tab" && request.url) {
        console.log("Background Script: Opening new tab for URL:", request.url);
        chrome.tabs.create({ 
            url: request.url,
            active: true 
        });
    }
});
