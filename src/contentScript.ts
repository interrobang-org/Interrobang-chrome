const ENDPOINT = 'https://httpbin.org/post';
const TAG = '[interrobang-chrome]';

const log = (...msg) => console.log(TAG, ...msg);
log(`Reading contentScript...`);

const state: State = {
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
  log('getNodesToFetchSummary() nodes size: %s', nodes.length);
  state.nodes = nodes;
  
  return nodes;
}

async function fetchSummary() {
  const { nodes } = state;
  let nextIndex = 0;
  const tick = 1;

  const makeRequestBatch = async (start, end, callback: FetchCallback) => {
    log('request batch, start: %s, end: %s', start, end);

    for (let idx = start; idx < end; idx++) {
      console.log('request idx: %s', idx);
      const node = nodes[idx];
      const data = await postData(ENDPOINT, {
        idx,
        url: node.getAttribute('href'),
      });

      callback({
        data,
        idx,
      });
    }

    return new Promise((resolve, reject) => {
      setTimeout(resolve, 2000);
    });
  };

  const fetchCallback = ({ data, idx }) => {
    const parentNode = nodes[idx].parentNode;
    const node = createNode('p', 33);
    parentNode.appendChild(node);
  };

  while (nextIndex < nodes.length) {
    await makeRequestBatch(nextIndex, nextIndex + tick, fetchCallback);
    nextIndex = nextIndex + tick;
  }
}

(async function runTheApplication() {
  await initialize();
  await getNodesToFetchSummary();
  await fetchSummary();
})();

function createNode(type: string, data) {
  const node = document.createElement(type);
  const text = document.createTextNode(data);
  node.appendChild(text);
  return node;
}

function postData(endpoint, data) {
  return fetch(endpoint, {
    body: JSON.stringify(data),
    method: 'POST',
  })
    .then((response) => {
      log('postData() success: %o', response);
      return response.json();
    });
}

interface State {
  data;
  nodes: NodeListOf<any> | any[];
  selector: string | null;
}

interface FetchCallback {
  (arg: {
    data;
    idx;
  }): any;
}
