// document.body.style.backgroundColor = 'yellow';
const tag = '[interrobang-chrome]';
const log = (...msg) => console.log(`${tag} ${msg}`);

log(`start`, '1');

const nodes = [];

function getNodesToFetchSummary() {
   
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  console.log(444 ,message, sender);
});

// document.querySelectorAll('.athing .title:not([align="right"])');