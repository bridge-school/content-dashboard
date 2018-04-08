import { Reducer } from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';

export interface RouterReducer {
    router: Reducer<RouterState>;
}

export interface RouterReducerState {
    router: RouterState;
}

export const RouterReducer: RouterReducer = {
    router: routerReducer,
};
