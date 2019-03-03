(() => {

// const ENDPOINT_HOST = 'https://frozen-sands-16144.herokuapp.com';
const ENDPOINT_HOST = 'http://127.0.0.1:5000';
const MODULE_NAME = 'interrobang-chrome';

const log = (format, ...msg) => console.log(`[${MODULE_NAME}] ${format}`, ...msg);
log(`Reading contentScript...`);

const state: State = {
  data: undefined,
  nodes: [],
  selector: null,
  wrapperNodes: [],
};

const Endpoint = {
  playground: `${ENDPOINT_HOST}/api/playground`, 
  questions: `${ENDPOINT_HOST}/api/questions`,
  summary: `${ENDPOINT_HOST}/api/summary`,
};

const TagClassName = {
  logo: `${MODULE_NAME}-logo`,
  spinner: `${MODULE_NAME}-spinner-wrapper`,
  spinnerCore: `${MODULE_NAME}-spinner`,
  text: `${MODULE_NAME}-text`,
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

  const makeRequestBatch = async (start, end, callback: FetchSuccesCallback) => {
    for (let idx = start; idx < end; idx++) {
      log('make network request idx: %s', idx);

      const node = nodes[idx];
      fetchCallback(idx);

      const data = utils.makeNetworkRequest(Endpoint.questions, {
        summarize: 1,
        url: utils.addHostIfNotPresent(node.getAttribute('href')),
      }).then((data: SummaryData) => {
        callback({
          data,
          idx,
        });
      });
    }

    return new Promise((resolve, reject) => {
      setTimeout(resolve, 2000);
    });
  };

  const fetchCallback = (idx) => {
    const parentNode = nodes[idx].parentNode;
    const node = utils.createSpinnerNode();
    parentNode.appendChild(node);
  }

  const fetchSuccessCallback: FetchSuccesCallback = ({ data, idx }) => {
    const parentNode = state.wrapperNodes[idx];
    const node = utils.createSummaryNode(data);
    parentNode.removeChild(parentNode.firstChild);
    parentNode.appendChild(node);
  };

  while (nextIndex < nodes.length) {
    await makeRequestBatch(nextIndex, nextIndex + tick, fetchSuccessCallback);
    nextIndex = nextIndex + tick;
  }
}

(async function runTheApplication() {
  await initialize();
  await getNodesToFetchSummary();
  await fetchSummary();
})();

const utils = {
  createSpinnerNode() {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', TagClassName.wrapper);
    state.wrapperNodes.push(wrapper);
    
    const spinner = document.createElement('div');
    spinner.setAttribute('class', TagClassName.spinner);
    
    const spinnerCore = document.createElement('div');
    spinnerCore.setAttribute('class', TagClassName.spinnerCore);
    spinner.appendChild(spinnerCore);

    const logo = document.createElement('span');
    logo.innerHTML = `powered by <b>interrobang</b>`;
    logo.setAttribute('class', TagClassName.logo);

    wrapper.appendChild(spinner);
    wrapper.appendChild(logo);
    return wrapper;
  },
  createStyleNode(styleDef: string) {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = styleDef;
    document.getElementsByTagName('head')[0].appendChild(style);
  },
  createSummaryNode(data: SummaryData) {
    const text = document.createElement('p');
    text.textContent = data.error || data === undefined
      ? '(Text either not robot-friendly or processing unavailable)'
      : data.questions.join(' ');
    text.setAttribute('class', TagClassName.text);

    return text;
  },
  makeNetworkRequest(endpoint, data) {
    const message = {
      payload: {
        data,
        endpoint,
      },
      type: 'network',
    };

    log('network request: %o', message);

    return new Promise<SummaryData>((resolve, reject) => {
      chrome.runtime.sendMessage(message, (response: SummaryData) => {
        log('response: %o', response);
        resolve(response);
      });
    });
  },
  addHostIfNotPresent(url: string) {
    if (!url.startsWith('http')) {
      const location = window.location;
      return `${location.protocol}//${location.host}/${url}`;
    } else {
      return url;
    }
  },
};
})();

interface State {
  data;
  nodes: NodeListOf<any> | any[];
  selector: string | null;
  wrapperNodes: any[];
}

interface FetchSuccesCallback {
  (arg: {
    data: SummaryData;
    idx;
  }): any;
}

interface MetaResponse {
  selector: string;
  style: string; 
}

interface SummaryData {
  error: boolean;
  questions: string[];
}
