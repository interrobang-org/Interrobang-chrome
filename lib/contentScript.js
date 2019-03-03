var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
(function () {
    var ENDPOINT = 'https://httpbin.org/post';
    var MODULE_NAME = 'interrobang-chrome';
    var log = function (format) {
        var msg = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            msg[_i - 1] = arguments[_i];
        }
        return console.log.apply(console, ["[" + MODULE_NAME + "] " + format].concat(msg));
    };
    log("Reading contentScript...");
    var state = {
        data: undefined,
        nodes: [],
        selector: null,
    };
    var TagClassName = {
        label: MODULE_NAME + "-label",
        wrapper: MODULE_NAME + "-wrapper",
    };
    function initialize() {
        return __awaiter(this, void 0, void 0, function () {
            var message;
            return __generator(this, function (_a) {
                message = {
                    payload: {
                        host: window.location.host,
                    },
                    type: 'initialize',
                };
                log('initialize() with message', message);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        chrome.runtime.sendMessage(message, function (response) {
                            log('response: %o', response);
                            state.selector = response.selector;
                            utils.createStyleNode(response.style);
                            resolve(response);
                        });
                    })];
            });
        });
    }
    function getNodesToFetchSummary() {
        return __awaiter(this, void 0, void 0, function () {
            var selector, nodes;
            return __generator(this, function (_a) {
                selector = state.selector;
                log('getNodesToFetchSummary() selector: %s', selector);
                nodes = document.querySelectorAll(selector);
                log('getNodesToFetchSummary() nodes size: %s', nodes.length);
                state.nodes = nodes;
                return [2 /*return*/, nodes];
            });
        });
    }
    function fetchSummary() {
        return __awaiter(this, void 0, void 0, function () {
            var nodes, nextIndex, tick, makeRequestBatch, fetchCallback;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nodes = state.nodes;
                        nextIndex = 0;
                        tick = 1;
                        makeRequestBatch = function (start, end, callback) { return __awaiter(_this, void 0, void 0, function () {
                            var idx, node, data;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        idx = start;
                                        _a.label = 1;
                                    case 1:
                                        if (!(idx < end)) return [3 /*break*/, 4];
                                        console.log('request idx: %s', idx);
                                        node = nodes[idx];
                                        return [4 /*yield*/, utils.postData(ENDPOINT, {
                                                idx: idx,
                                                url: node.getAttribute('href'),
                                            })];
                                    case 2:
                                        data = _a.sent();
                                        callback({
                                            data: data,
                                            idx: idx,
                                        });
                                        _a.label = 3;
                                    case 3:
                                        idx++;
                                        return [3 /*break*/, 1];
                                    case 4: return [2 /*return*/, new Promise(function (resolve, reject) {
                                            setTimeout(resolve, 2000);
                                        })];
                                }
                            });
                        }); };
                        fetchCallback = function (_a) {
                            var data = _a.data, idx = _a.idx;
                            var parentNode = nodes[idx].parentNode;
                            var node = utils.createSummaryNode(33);
                            parentNode.appendChild(node);
                        };
                        _a.label = 1;
                    case 1:
                        if (!(nextIndex < nodes.length)) return [3 /*break*/, 3];
                        return [4 /*yield*/, makeRequestBatch(nextIndex, nextIndex + tick, fetchCallback)];
                    case 2:
                        _a.sent();
                        nextIndex = nextIndex + tick;
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    (function runTheApplication() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, initialize()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, getNodesToFetchSummary()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, fetchSummary()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    })();
    var utils = {
        createStyleNode: function (styleDef) {
            var style = document.createElement('style');
            style.type = 'text/css';
            style.textContent = styleDef;
            document.getElementsByTagName('head')[0].appendChild(style);
        },
        createSummaryNode: function (data) {
            var root = document.createElement('div');
            root.textContent = data;
            root.setAttribute('class', TagClassName.wrapper);
            var label = document.createElement('span');
            label.innerHTML = "powered by <b>interrobang</b>";
            label.setAttribute('class', TagClassName.label);
            root.appendChild(label);
            return root;
        },
        postData: function (endpoint, data) {
            return fetch(endpoint, {
                body: JSON.stringify(data),
                method: 'POST',
            })
                .then(function (response) {
                log('postData() success: %o', response);
                return response.json();
            });
        },
    };
})();
