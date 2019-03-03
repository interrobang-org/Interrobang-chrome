var meta = {
    'news.ycombinator.com': {
        selector: '.athing .title:not([align="right"]) a.storylink',
    },
};
chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ foo: 'bar' }, function () {
        console.log('storage check');
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { hostEquals: 'news.ycombinator.com' },
                    }),
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
            }]);
    });
});
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    var logMsg = sender.tab
        ? "Message from a content script: " + sender.tab.url
        : "Message from the extension";
    console.log(logMsg, message);
    if (message.type === 'initialize') {
        sendResponse({
            meta: meta[message.payload.host],
        });
    }
});
