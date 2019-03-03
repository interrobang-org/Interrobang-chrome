(() => {

const ENDPOINT = 'https://httpbin.org/post';
const MODULE_NAME = 'interrobang-chrome';

const log = (format, ...msg) => console.log(`[${MODULE_NAME}] ${format}`, ...msg);
log(`Reading contentScript...`);

const state: State = {
  data: undefined,
  nodes: [],
  selector: null,
};

const TagClassName = {
  label: `${MODULE_NAME}-label`,
  wrapper: `${MODULE_NAME}-wrapper`,
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
    chrome.runtime.sendMessage(message, (response: MetaResponse) => {
      log('response: %o', response);

      state.selector = response.selector;

      utils.createStyleNode(response.style);
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
    for (let idx = start; idx < end; idx++) {
      console.log('request idx: %s', idx);
      const node = nodes[idx];
      const data = await utils.postData(ENDPOINT, {
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
    const node = utils.createSummaryNode(33);
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

const utils = {
  createStyleNode(styleDef: string) {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = styleDef;
    document.getElementsByTagName('head')[0].appendChild(style);
  },
  createSummaryNode(data) {
    const root = document.createElement('div');
    root.textContent = data;
    root.setAttribute('class', TagClassName.wrapper);

    const label = document.createElement('span');
    label.innerHTML = `powered by <b>interrobang</b>`;
    label.setAttribute('class', TagClassName.label);

    root.appendChild(label);
    return root;
  },
  postData(endpoint, data) {
    return fetch(endpoint, {
      body: JSON.stringify(data),
      method: 'POST',
    })
      .then((response) => {
        log('postData() success: %o', response);
        return response.json();
      });
  },
};
})();

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

interface MetaResponse {
  selector: string;
  style: string; 
}
