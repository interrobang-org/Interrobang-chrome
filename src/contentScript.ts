const tag = '[interrobang-chrome]';
const log = (...msg) => console.log(`${tag} ${msg}`);

log(`start`, '1');

const state = {
  nodes: [],
  selector: null,
};

(function initialize(callback = () => {}) {
  const message = {
    payload: {
      host: window.location.host,
    },
    type: 'initialize',
  };

  chrome.runtime.sendMessage(message, (response) => {
    console.log('response: %o', response);

    state.selector = response.selector;
    callback();
  });
})();

function getNodesToFetchSummary() {
   console.log(123, state.selector);
}
