let startTime = Date.now();

window.addEventListener('beforeunload', function() {
  let endTime = Date.now();
  let timeSpent = Math.floor((endTime - startTime) / 1000);
  alert("Content script loaded!");
  chrome.storage.local.get(['timeSpent'], function(result) {
    let totalTime = result.timeSpent ? result.timeSpent + timeSpent : timeSpent;
    chrome.storage.local.set({ timeSpent: totalTime });
  });
});
