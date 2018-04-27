import { Reducer } from 'redux';

import { Action, TypeKeys } from '../actions';

import { DRAG_MODULE } from '../actions/dragModule';
import DragModuleAction = DRAG_MODULE.DragModuleAction;

import { DROP_MODULE } from '../actions/dropModule';
import DropModuleAction = DROP_MODULE.DropModuleAction;

import { GET_MODULES } from '../actions/getModules';
import GetModuleAction = GET_MODULES.GetModuleAction;

import { ContentModule } from '../../constants';
import { SetCurrentModuleAction } from '../actions/setCurrentModule';

export interface ModuleState {
    allModules: ContentModule[];
    modules: ContentModule[];
    timeline: ContentModule[];
    currentModuleID: string;
}

export type ModuleReducerMap =  {[action: string]: Reducer<ModuleState>};

const ModuleReducerMap: ModuleReducerMap = {
    [TypeKeys.GET_MODULES]: (state: ModuleState, action: GetModuleAction): ModuleState => {
        return { ...state, modules: action.payload, allModules: action.payload };
    },
  [TypeKeys.SET_CURRENT_MODULE]: (state: ModuleState, action: SetCurrentModuleAction): ModuleState => {
        return { ...state, currentModuleID: action.payload };
    },
    [TypeKeys.DRAG_MODULE]: (state: ModuleState, action: DragModuleAction): ModuleState => {
        return state;
    },
    [TypeKeys.DROP_MODULE]: (state: ModuleState, action: DropModuleAction): ModuleState => {
        const moduleIndex = state.modules.findIndex(module => module.id === action.payload.id);

        if (moduleIndex > -1) {
            return {
                ...state,
                modules: state.modules.slice(0, moduleIndex)
                    .concat(
                        state.modules.slice(moduleIndex + 1)
                    ),

                timeline: (state.timeline || []).concat([state.modules[moduleIndex]])
            };
        }

        return state;
    }
};

const moduleReducer = (state: ModuleState = null, action: Action) => {
    if (action && ModuleReducerMap.hasOwnProperty(action.type)) {
        return ModuleReducerMap[action.type](state, action);
    }

    return state;
};

export interface ModuleReducer {
    module: Reducer<ModuleState>;
}

export interface ModuleReducerState {
    module: ModuleState;
}

export const ModuleReducer: ModuleReducer = {
    module: moduleReducer
};
