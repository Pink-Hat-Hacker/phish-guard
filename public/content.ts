// src/content.ts
function extractEmailAddresses() {
    // Regular expression to match email addresses
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    // Get all text content on the page
    const pageText = document.body.innerText;
    // Extract email addresses using the regular expression
    const emailAddresses = pageText.match(emailRegex) || [];

    return [...new Set(emailAddresses)]; // Remove duplicates
}

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    if (request.action === 'extractEmails') {
        const emailAddresses = extractEmailAddresses();
        sendResponse({ emailAddresses });
    }
});