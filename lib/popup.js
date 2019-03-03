var button = document.getElementById('button');
button.onclick = function (element) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, { file: "contentScript.js" }, function () {
            setTimeout(function () { return window.close(); }, 200);
        });
    });
};
function executeScripts(tabId, injectDetailsArray) {
    function createCallback(tabId, injectDetails, innerCallback) {
        return function () {
            chrome.tabs.executeScript(tabId, injectDetails, innerCallback);
        };
    }
    var callback = null;
    for (var i = injectDetailsArray.length - 1; i >= 0; --i) {
        callback = createCallback(tabId, injectDetailsArray[i], callback);
    }
    console.log(123, callback);
    if (callback !== null) {
        callback();
    }
}
