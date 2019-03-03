const button = document.getElementById('button')!;

button.onclick = function(element: any) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {
        file: 'contentScript.js',
      },
    );
  });
};
