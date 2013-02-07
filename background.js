var isDisable = false; // falseは動作中
var currentTab = 0;


function action(tab) {
    var flag = isDisable? false: true;
    chrome.tabs.sendRequest(tab.id, {doDisable: flag}, function(response) {
        iconChange()
    });
}
chrome.pageAction.onClicked.addListener(action);


function checkForValidUrl(tabId, changeInfo, tab) {
    if (tab.url.indexOf('https://plus.google.com') > -1) {
        chrome.pageAction.show(tabId);
    } else {
        chrome.pageAction.hide(tabId);
    }
    currentTab = tabId;
}
chrome.tabs.onUpdated.addListener(checkForValidUrl);


function iconChange() {
    chrome.pageAction.setIcon({
        tabId: currentTab,
        path: (isDisable? 'icon19.png': 'icon19_gray.png'),
    });
    isDisable = isDisable? false: true;
}
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    iconChange();
});
