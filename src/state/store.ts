import { createStore, applyMiddleware, compose, Middleware } from 'redux';

import { History } from 'history';
import createHistory from 'history/createBrowserHistory';
import { createLogger } from 'redux-logger';
import { routerMiddleware, connectRouter } from 'connected-react-router';

import { rootReducer } from './reducers';
import { epicMiddleware } from './epics';

export const appHistory: History = createHistory();

const isDevelopment = process.env.NODE_ENV === 'development';

const configureStore = (routerHistory: History) => {
    const logger: Middleware = createLogger({ collapsed: true });

    const middlewares: Array<Middleware> = [
        routerMiddleware(routerHistory),
        epicMiddleware,
    ];

    if (isDevelopment) {
        middlewares.push(logger);
    }

    const composeEnhancers = isDevelopment && (<any> window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    return createStore(
        connectRouter(appHistory)(rootReducer),
        composeEnhancers(
            applyMiddleware(
            ...middlewares,
            )
        )
    );
};

export const reduxStoreInstance = configureStore(appHistory);
