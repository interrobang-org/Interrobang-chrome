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
var nodes = [];
function getNodesToFetchSummary() {
}
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(444, message, sender);
});
// document.querySelectorAll('.athing .title:not([align="right"])');
