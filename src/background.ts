declare const chrome;
declare const axios;

(() => {

const MODULE_NAME = 'interrobang-chrome';

const defaultStyle =`
.${MODULE_NAME}-wrapper {
  background-color: #6b6b6b0a;
  border-radius: 3px;
  padding: 8px 5px 3px;
  position: relative;
}
.${MODULE_NAME}-label {
  font-size: 9px;
  position: absolute;
  right: 3px;
  top: 0;
}
`;

const meta = {
  'news.ycombinator.com': {
    selector: '.athing .title:not([align="right"]) a.storylink',
    style: defaultStyle,
  },
};

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ foo: 'bar'}, function() {
    console.log('storage check');
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
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

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const logMsg = sender.tab 
    ? `Message from a content script: ${sender.tab.url}`
    : `Message from the extension`;
  console.log(logMsg, message);
  
  if (message.type === 'initialize') {
    sendResponse(meta[message.payload.host]);
  }
});  

})();
