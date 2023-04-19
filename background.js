
chrome.action.onClicked.addListener((tab) => {
  // Handle the click event here
  chrome.tabs.sendMessage(tab.id, {action: "iconClicked"});
});
