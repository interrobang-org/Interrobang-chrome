declare const chrome;

const meta = {
  'news.ycombinator.com': {
    selector: '.athing .title:not([align="right"]) a.storylink',
  },
};

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log('The color is green.11');
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
    ? `from a content script: ${sender.tab.url}`
    : `from the extension`;
  console.log(logMsg, message);
  
  if (message.type === 'initialize') {
    sendResponse({
      meta: meta[message.payload.host],
    });
  }
});
