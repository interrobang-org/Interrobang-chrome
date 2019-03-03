const button = document.getElementById('button')!;

button.onclick = function(element: any) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    executeScripts(tabs[0].id, [ 
      { file: "axios.js" }, 
      { file: "contentScript.js" },
  ])
    chrome.tabs.executeScript(
      tabs[0].id,
      {
        file: 'contentScript.js',
      },
    );
    
  });
};

function executeScripts(tabId, injectDetailsArray) {
  function createCallback(tabId, injectDetails, innerCallback) {
    return function () {
      chrome.tabs.executeScript(tabId, injectDetails, innerCallback);
    };
  }

  let callback: any = null;

  for (var i = injectDetailsArray.length - 1; i >= 0; --i) {
    callback = createCallback(tabId, injectDetailsArray[i], callback);
  }

  if (callback !== null) {
    callback();
  }
}