declare const chrome;
declare const axios;

(() => {

const MODULE_NAME = 'interrobang-chrome';

const defaultStyle =`
.${MODULE_NAME}-wrapper {
  align-items: center;
  background-color: #6b6b6b0a;
  border-radius: 3px;
  display: flex;
  font-size: 0.95em;
  max-width: 785px;
  padding: 10px 5px 3px;
  position: relative;
}
.${MODULE_NAME}-logo {
  font-size: 9px;
  position: absolute;
  right: 3px;
  top: 0;
}
.${MODULE_NAME}-text {
  margin: 0;
}
.${MODULE_NAME}-spinner-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.${MODULE_NAME}-spinner {
  display: inline-block;
  width: 26px;
  height: 26px;
}
.${MODULE_NAME}-spinner:after {
  content: " ";
  display: block;
  width: 13px;
  height: 13px;
  margin: 1px;
  border-radius: 50%;
  border: 2px solid #888;
  border-color: #888 transparent #888 transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
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
      actions: [ new chrome.declarativeContent.ShowPageAction() ],
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostEquals: 'news.ycombinator.com' },
        }),
      ],
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

  if (message.type === 'network') {
    const { data, endpoint } = message.payload;
    utils.postData(endpoint, data)
      .then((res) => {
        sendResponse(res);
      });
  }

  return true;
});

const utils = {
  postData(endpoint, data) {
    return fetch(endpoint, {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: 'POST',
      mode: 'cors',
    })
      .then((response) => {
        console.log('postData() success: %o', response);
        return response.json();
      });
  },
};

})();
