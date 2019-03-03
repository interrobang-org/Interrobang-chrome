"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var GlobalStyle_1 = require("./GlobalStyle");
// const ENDPOINT_HOST = 'https://frozen-sands-16144.herokuapp.com';
var ENDPOINT_HOST = 'http://127.0.0.1:5000';
var Endpoint = {
    playground: ENDPOINT_HOST + "/api/playground",
    questions: ENDPOINT_HOST + "/api/questions",
    summary: ENDPOINT_HOST + "/api/summary",
};
var textareaPlaceholder = "Live coverage of the rendezvous and docking aired on NASA television and the agency's website, with the next highlight due at about 8:30 a.m. Eastern with the hatch opening. It\u2019s been a big weekend for commercial spaceflight. Tourists flocked to the Kennedy Space Center in Florida to watch the launch of the Falcon 9 rocket at 2:49 a.m. Saturday. President Donald Trump congratulated SpaceX in a tweet Saturday afternoon.\n\nThe inaugural flight, known as Demo-1, is an important mission designed to test the end-to-end capabilities of the new system, NASA said. It paves the way for Demo-2, a test flight with a crew to carry NASA astronauts Bob Behnken and Doug Hurley to the ISS. That flight is currently slated for July.\n\nCrew Dragon will remain connected to the space station for five days, and will depart on Friday. The mission will not be complete until the spacecraft safely departs from the station and deploys parachutes as part of its splashdown in the Atlantic Ocean.\n\nIn 2014, NASA awarded SpaceX and Boeing combined contracts worth as much as $6.8 billion to fly U.S. astronauts to the space station. The agency chose two companies for the unique public-private partnership to assure safe, reliable and cost-effective access to space while avoiding the perils of one provider having a monopoly. The U.S. government is also eager to have the ability to fly to the ISS without buying seats on Russian Soyuz capsules.";
var StyledRoot = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  width: 100%;\n"], ["\n  display: flex;\n  justify-content: center;\n  width: 100%;\n"])));
var Wrapper = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  padding-top: 50px;\n  width: 705px;\n"], ["\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  padding-top: 50px;\n  width: 705px;\n"])));
var Title = styled_components_1.default.p(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  font-size: 24px;\n  font-weight: bold;\n"], ["\n  font-size: 24px;\n  font-weight: bold;\n"])));
var Subtitle = styled_components_1.default.p(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  font-size: 20px;\n"], ["\n  font-size: 20px;\n"])));
var Textarea = styled_components_1.default.textarea(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  border: 1px solid #a2a2a2;\n  border-radius: 3px;\n  display: block;\n  font-size: 13px;\n  height: 250px;\n  margin: 20px 0 10px;\n  outline: none;\n  padding: 6px 7px;\n  resize: none;\n  width: 100%;\n"], ["\n  border: 1px solid #a2a2a2;\n  border-radius: 3px;\n  display: block;\n  font-size: 13px;\n  height: 250px;\n  margin: 20px 0 10px;\n  outline: none;\n  padding: 6px 7px;\n  resize: none;\n  width: 100%;\n"])));
var ButtonGroup = styled_components_1.default.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  align-items: center;\n  display: flex;\n"], ["\n  align-items: center;\n  display: flex;\n"])));
var Button = styled_components_1.default.p(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  cursor: pointer;\n  font-size: 16px;\n  outline: none;\n  text-decoration: underline;\n\n  &:hover {\n    color: #2828bd;\n  }\n"], ["\n  cursor: pointer;\n  font-size: 16px;\n  outline: none;\n  text-decoration: underline;\n\n  &:hover {\n    color: #2828bd;\n  }\n"])));
var Status = styled_components_1.default.p(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  color: gray;\n  font-size: 12px;\n  font-style: italic;\n  margin-left: 22px;\n"], ["\n  color: gray;\n  font-size: 12px;\n  font-style: italic;\n  margin-left: 22px;\n"])));
var ResultGroup = styled_components_1.default.div(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  color: #545454;\n  display: flex;\n  justify-content: space-between;\n  margin-top: 32px;\n  width: 100%;\n\n  > div {\n    width: 48%;\n  }\n"], ["\n  color: #545454;\n  display: flex;\n  justify-content: space-between;\n  margin-top: 32px;\n  width: 100%;\n\n  > div {\n    width: 48%;\n  }\n"])));
var ResultBox = styled_components_1.default.div(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  background-color: #f7f7f7;\n  border-radius: 3px;\n  font-size: 13px;\n  height: 170px;\n  margin-top: 9px;\n  overflow-y: scroll;\n  padding: 5px 6px;\n\n  > div {\n    margin-bottom: 7px;\n    > span:first-child {\n      font-weight: bold;\n    }\n  }\n"], ["\n  background-color: #f7f7f7;\n  border-radius: 3px;\n  font-size: 13px;\n  height: 170px;\n  margin-top: 9px;\n  overflow-y: scroll;\n  padding: 5px 6px;\n\n  > div {\n    margin-bottom: 7px;\n    > span:first-child {\n      font-weight: bold;\n    }\n  }\n"])));
var Result = function (_a) {
    var title = _a.title, label = _a.label;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", null, title),
        react_1.default.createElement(ResultBox, null, label)));
};
var QuestionResult = function (_a) {
    var question = _a.question, title = _a.title;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", null, title),
        react_1.default.createElement(ResultBox, null,
            react_1.default.createElement("div", null,
                react_1.default.createElement("span", null, "Questions: "),
                react_1.default.createElement("span", null, question.questions)),
            react_1.default.createElement("div", null,
                react_1.default.createElement("span", null, "Answers: "),
                react_1.default.createElement("span", null, question.answers)))));
};
var Credit = styled_components_1.default.div(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  color: gray;\n  margin-top: 20px;\n\n  span {\n    margin-right: 12px;\n    \n  }\n\n  a {\n    text-decoration: none;\n  }\n"], ["\n  color: gray;\n  margin-top: 20px;\n\n  span {\n    margin-right: 12px;\n    \n  }\n\n  a {\n    text-decoration: none;\n  }\n"])));
var Root = function () {
    var _a = react_1.useState(''), fetchStatus = _a[0], setFetchStatus = _a[1];
    var _b = react_1.useState(textareaPlaceholder), text = _b[0], setText = _b[1];
    var _c = react_1.useState('[summary]'), summary = _c[0], setSummary = _c[1];
    var _d = react_1.useState({
        questions: '[question]',
        answers: '[answers]',
    }), question = _d[0], setQuestion = _d[1];
    var handleClickConvert = react_1.useMemo(function () { return function (e) {
        setFetchStatus('Data is being fetched...');
        var p1 = postData(Endpoint.summary, {
            text: text,
        });
        var p2 = postData(Endpoint.playground, {
            text: text,
            noqs: 3,
        });
        Promise.all([p1, p2])
            .then(function (_a) {
            var summaryRes = _a[0], questionRes = _a[1];
            setFetchStatus('Data is successfully fetched');
            setSummary(summaryRes['summary']);
            setQuestion(questionRes);
        });
    }; }, [summary]);
    var handleChangeTextarea = react_1.useMemo(function () { return function (e) {
        setText(e.target.value);
    }; }, [text]);
    return (react_1.default.createElement(StyledRoot, null,
        react_1.default.createElement(GlobalStyle_1.default, null),
        react_1.default.createElement(Wrapper, null,
            react_1.default.createElement(Title, null, "Interrobang - Playground"),
            react_1.default.createElement(Subtitle, null, "subtitle"),
            react_1.default.createElement(Textarea, { onChange: handleChangeTextarea }, text),
            react_1.default.createElement(ButtonGroup, null,
                react_1.default.createElement(Button, { onClick: handleClickConvert }, "convert"),
                react_1.default.createElement(Status, null, fetchStatus)),
            react_1.default.createElement(ResultGroup, null,
                react_1.default.createElement(Result, { label: summary, title: 'Summary' }),
                react_1.default.createElement(QuestionResult, { question: question, title: 'Questions' })),
            react_1.default.createElement(Credit, null,
                react_1.default.createElement("div", null,
                    react_1.default.createElement("span", null, "Interrobang"),
                    react_1.default.createElement("span", null,
                        react_1.default.createElement("a", { href: "https://github.com/interrobang-org" }, "Github")))))));
};
exports.default = Root;
function postData(endpoint, data) {
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
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11;
