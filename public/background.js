// src/background.ts
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  console.log("background.js before conditional");
  if (request.action === 'extractEmails') {
    console.log(request.action);
    // Send a message to the content script to extract email addresses
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log(tabs);
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { action: 'extractEmails' }, (response) => {
        sendResponse(response);
      });
    });

    // Return true to indicate that sendResponse will be called asynchronously
    return true;
  }
});