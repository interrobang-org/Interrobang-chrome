let changeColor = document.getElementById('changeColor')!;

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element: any) {
  let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id, 
      {
        file: 'contentScript.js',
      },
      () => {
        chrome.tabs.sendMessage(tabs[0].id, { foo: 1 }, (arg) => {
          console.log(44, arg);
        });
      });
  });
};
