import { combineReducers, Reducer } from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';

export interface RootReducerState {
  router: RouterState;
}

export const rootReducer: Reducer<RootReducerState> = combineReducers({
  router: routerReducer,
});
