// document.body.style.backgroundColor = 'yellow';
var tag = '[interrobang-chrome]';
var log = function () {
    var msg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        msg[_i] = arguments[_i];
    }
    return console.log(tag + " " + msg);
};
log("start", '1');
var state = {
    nodes: [],
    selector: null,
};
(function initialize(callback) {
    if (callback === void 0) { callback = function () { }; }
    var message = {
        payload: {
            host: window.location.host,
        },
        type: 'initialize',
    };
    chrome.runtime.sendMessage(message, function (response) {
        console.log('response: %o', response);
        state.selector = response.selector;
        callback();
    });
})();
function getNodesToFetchSummary() {
    console.log(123, state.selector);
}
// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//   console.log(444 ,message, sender);
//   sendResponse({bar: 2});
// });
// document.querySelectorAll('.athing .title:not([align="right"])');
