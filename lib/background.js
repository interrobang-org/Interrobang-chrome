(function () {
    var MODULE_NAME = 'interrobang-chrome';
    var defaultStyle = "\n." + MODULE_NAME + "-wrapper {\n  align-items: center;\n  background-color: #6b6b6b0a;\n  border-radius: 3px;\n  display: flex;\n  font-size: 0.95em;\n  max-width: 785px;\n  padding: 10px 5px 3px;\n  position: relative;\n}\n." + MODULE_NAME + "-logo {\n  font-size: 9px;\n  position: absolute;\n  right: 3px;\n  top: 0;\n}\n." + MODULE_NAME + "-text {\n  margin: 0;\n}\n." + MODULE_NAME + "-spinner-wrapper {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n}\n." + MODULE_NAME + "-spinner {\n  display: inline-block;\n  width: 26px;\n  height: 26px;\n}\n." + MODULE_NAME + "-spinner:after {\n  content: \" \";\n  display: block;\n  width: 13px;\n  height: 13px;\n  margin: 1px;\n  border-radius: 50%;\n  border: 2px solid #888;\n  border-color: #888 transparent #888 transparent;\n  animation: lds-dual-ring 1.2s linear infinite;\n}\n@keyframes lds-dual-ring {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n";
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
                    actions: [new chrome.declarativeContent.ShowPageAction()],
                    conditions: [
                        new chrome.declarativeContent.PageStateMatcher({
                            pageUrl: { hostEquals: 'news.ycombinator.com' },
                        }),
                    ],
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
        if (message.type === 'network') {
            var _a = message.payload, data = _a.data, endpoint = _a.endpoint;
            utils.postData(endpoint, data)
                .then(function (res) {
                sendResponse(res);
            });
        }
        return true;
    });
    var utils = {
        postData: function (endpoint, data) {
            return fetch(endpoint, {
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
                method: 'POST',
                mode: 'cors',
            })
                .then(function (response) {
                console.log('postData() success: %o', response);
                return response.json();
            });
        },
    };
})();
