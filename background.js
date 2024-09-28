chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Check if the tab has finished loading
  if (changeInfo.status === 'complete' && tab.active) {
      // Open the popup when a tab finishes loading
      chrome.action.openPopup();
  }
});
