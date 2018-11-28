import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { appHistory, reduxStoreInstance } from './state/store';
import { Routes } from './routes';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import LuxonUtils from '@date-io/luxon';
import registerServiceWorker from './registerServiceWorker';

// @ts-ignore
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

import './index.css';

const AppComponent = (
  <MuiPickersUtilsProvider utils={LuxonUtils}>
  <Provider store={reduxStoreInstance}>
      <Routes history={appHistory} isAuthenticated={Boolean(reduxStoreInstance.getState().auth.loggedInUser)} />
    </Provider>
  </MuiPickersUtilsProvider>
);

if (!module.parent) { // if this file is imported directly
    ReactDOM.render(
        AppComponent,
        document.getElementById('root') as HTMLElement
    );

    registerServiceWorker();
}

export default AppComponent;
