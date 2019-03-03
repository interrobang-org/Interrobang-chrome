"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styled_components_1 = require("styled-components");
var GlobalStyle_1 = require("./GlobalStyle");
var StyledRoot = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  color: blue;\n  display: flex;\n  justify-content: center;\n  width: 100%;\n"], ["\n  color: blue;\n  display: flex;\n  justify-content: center;\n  width: 100%;\n"])));
var Wrapper = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  border: 1px solid green;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  width: 800px;\n"], ["\n  border: 1px solid green;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  width: 800px;\n"])));
var Textarea = styled_components_1.default.textarea(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: block;\n  resize: none;\n  width: 600px;\n"], ["\n  display: block;\n  resize: none;\n  width: 600px;\n"])));
var ResultGroup = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject([""], [""])));
var Root = function () {
    return (React.createElement(StyledRoot, null,
        React.createElement(GlobalStyle_1.default, null),
        React.createElement(Wrapper, null,
            React.createElement(Textarea, null),
            React.createElement("button", null, "convert"),
            React.createElement(ResultGroup, null,
                React.createElement("div", null, "3"),
                React.createElement("div", null, "4")))));
};
exports.default = Root;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
