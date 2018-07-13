import { createStore, applyMiddleware, Middleware } from 'redux';

import { History } from 'history';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';

import { rootReducer } from './reducers';
import { classModules } from '../scenes/home/home.content';
import { ModuleState } from './reducers/module';
import { epicMiddleware } from './epics';

const isDevelopment = process.env.NODE_ENV === 'development';

export const INITIAL_MODULE_STATE: ModuleState = {
    allModules: classModules,
    modules: classModules,
    timeline: [],
    currentModuleID: '',
    newCohortName: '',
    newCohortStartDate: ''
};

const configureStore = (routerHistory: History) => {
    const logger: Middleware = createLogger({ collapsed: true });

    const middlewares: Array<Middleware> = [
        routerMiddleware(routerHistory),
        epicMiddleware,
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
        applyMiddleware(
            ...middlewares,
        )
    );
};

export default configureStore;
