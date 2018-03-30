import { createStore, applyMiddleware, Middleware } from 'redux';
import { History } from 'history';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import { rootReducer } from './reducers';

const isDevelopment = process.env.NODE_ENV === 'development';

const configureStore = (routerHistory: History) => {
  const logger: Middleware = createLogger({ collapsed: true });

  const middlewares: Array<Middleware> = [
    routerMiddleware(routerHistory),
  ];

  if (isDevelopment) {
    middlewares.push(logger);
  }

  const store = createStore(
    rootReducer,
    undefined,
    applyMiddleware(
      ...middlewares,
    )
  );

  return store;
};

export default configureStore;
