(function () {
    var MODULE_NAME = 'interrobang-chrome';
    var defaultStyle = "\n." + MODULE_NAME + "-wrapper {\n  background-color: #6b6b6b0a;\n  border-radius: 3px;\n  padding: 8px 5px 3px;\n  position: relative;\n}\n." + MODULE_NAME + "-label {\n  font-size: 9px;\n  position: absolute;\n  right: 3px;\n  top: 0;\n}\n";
    var meta = {
        'news.ycombinator.com': {
            selector: '.athing .title:not([align="right"]) a.storylink',
            style: defaultStyle,
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
            sendResponse(meta[message.payload.host]);
        }
    });
})();
