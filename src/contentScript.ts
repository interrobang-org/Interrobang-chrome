const ENDPOINT = 'https://httpbin.org/post';
const TAG = '[interrobang-chrome]';
const log = (...msg) => console.log(TAG, ...msg);

log(`Reading contentScript...`);

const state = {
  data: undefined,
  nodes: [],
  selector: null,
};

async function initialize() {
  const message = {
    payload: {
      host: window.location.host,
    },
    type: 'initialize',
  };

  log('initialize() with message', message);

  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, (response) => {
      log('response: %o', response);
  
      state.selector = response.meta.selector;
      resolve(response);
    });
  });
}

async function getNodesToFetchSummary() {
  const { selector } = state;
  log('getNodesToFetchSummary() selector: %s', selector);

  const nodes = document.querySelectorAll(selector!);
  const { data } = await axios.post(ENDPOINT, {
    power: 1,
  });

  log('getNodesToFetchSummary() fetchResult: %o', data);

  state.data = data;
  return data;
}

(async function runTheApplication() {
  await initialize();
  await getNodesToFetchSummary();
})();
