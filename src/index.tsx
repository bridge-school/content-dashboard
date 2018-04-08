import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { History } from 'history';
import createHistory from 'history/createBrowserHistory';
import configureStore from './state/store';
import { Routes } from './routes';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const history: History = createHistory();
const store = configureStore(history);

ReactDOM.render(
  (
    <Provider store={store}>
      <Routes history={history} />
    </Provider>
  ),
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
