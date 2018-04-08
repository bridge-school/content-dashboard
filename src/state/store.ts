import { createStore, applyMiddleware, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

import { History } from 'history';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';

import { rootReducer } from './reducers';
import { classModules } from '../scenes/home/home.content';
import { ModuleState } from './reducers/module';

const isDevelopment = process.env.NODE_ENV === 'development';

export const INITIAL_MODULE_STATE: ModuleState = {
    modules: classModules,
    timeline: []
};

const configureStore = (routerHistory: History) => {
    const logger: Middleware = createLogger({collapsed: true});

    const middlewares: Array<Middleware> = [
        routerMiddleware(routerHistory),
    ];

    if (isDevelopment) {
        middlewares.push(logger);
    }

    return createStore(
        rootReducer,
        {
            router: null,
            module: INITIAL_MODULE_STATE
        },
        composeWithDevTools({})(applyMiddleware(
            ...middlewares,
        ))
    );
};

export default configureStore;
