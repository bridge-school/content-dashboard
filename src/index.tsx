import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { appHistory, reduxStoreInstance } from './state/store';
import { Routes } from './routes';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const AppComponent = (
    <Provider store={reduxStoreInstance}>
      <Routes history={appHistory}/>
    </Provider>
);

if (!module.parent) { // if this file is imported directly
    ReactDOM.render(
        AppComponent,
        document.getElementById('root') as HTMLElement
    );

    registerServiceWorker();
}

export default AppComponent;
