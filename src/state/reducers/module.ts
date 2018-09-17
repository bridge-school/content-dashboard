import { Reducer } from 'redux';

import { Action, StringAction, TypeKeys } from '../actions';

import { GET_MODULES } from '../actions/getModules';
import GetModuleAction = GET_MODULES.GetModuleAction;

import { INSERT_MODULE_IN_TIMELINE } from '../actions/insertModuleInTimeline';
import InsertModuleInTimelineAction = INSERT_MODULE_IN_TIMELINE.InsertModuleInTimelineAction;

import { ContentModule } from '../../constants';
import { SetCurrentModuleAction } from '../actions/setCurrentModule';
import { DROP_MODULE } from '../actions/dropModule';
import DropModuleAction = DROP_MODULE.DropModuleAction;

export interface ModuleState {
  allModules: ContentModule[];
  modules: ContentModule[];
  timeline: ContentModule[];
  currentModuleID: string;
  newCohortName: string;
  newCohortStartDate: string;
}

export type ModuleReducerMap = { [action: string]: Reducer<ModuleState> };

const ModuleReducerMap: ModuleReducerMap = {
  [TypeKeys.GET_MODULES]: (state: ModuleState, action: GetModuleAction): ModuleState => {
    return { ...state, modules: action.payload, allModules: action.payload };
  },
  [TypeKeys.SET_CURRENT_MODULE]: (state: ModuleState, action: SetCurrentModuleAction): ModuleState => {
    return { ...state, currentModuleID: action.payload };
  },
  UPDATE_MODULE_LIST: (state: ModuleState, action: any) => ({ ...state, modules: action.payload }),
  UPDATE_TIMELINE: (state: ModuleState, action: any) => ({ ...state, timeline: action.payload }),

  [TypeKeys.SET_COHORT_NAME]: (state: ModuleState, action: StringAction) =>
    ({ ...state, newCohortName: action.payload }),
  [TypeKeys.SET_COHORT_START_DATE]: (state: ModuleState, action: StringAction) =>
    ({ ...state, newCohortStartDate: action.payload }),
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
  },
  [TypeKeys.INSERT_MODULE_IN_TIMELINE]: (state: ModuleState, action: InsertModuleInTimelineAction): ModuleState => {
    const moduleIndex = state.modules.findIndex(module => module.id === action.payload.id);

    if (moduleIndex > -1) {
      // still in modules list, must not be in timeline yet. Add it.
      return {
        ...state,
        modules: state.modules.slice(0, moduleIndex)
          .concat(
            state.modules.slice(moduleIndex + 1)
          ),
        // timeline: [before dependent, new prereq module, dependent/rest]
        timeline: (state.timeline || []).slice(0, action.payload.targetPosition)
          .concat([state.modules[moduleIndex]])
          .concat((state.timeline || []).slice(action.payload.targetPosition))
      };
    } else {
      // not in modules, must already be in timeline. Move it.
      const currentPosition = state.timeline.findIndex(module => module.id === action.payload.id);
      return {
        ...state,
        // modules: no update require
        // [before dependent, moved prereq module, dependent, other before old prereq, after prereq]
        timeline: state.timeline.slice(0, action.payload.targetPosition)
          .concat([state.timeline[currentPosition]])
          .concat(state.timeline.slice(action.payload.targetPosition, currentPosition))
          .concat(state.timeline.slice(currentPosition + 1)),
      };
    }
  },
};

const DEFAULT_MODULE_STATE: ModuleState = {
  allModules: [],
  modules: [],
  timeline: [],
  currentModuleID: null,
  newCohortName: null,
  newCohortStartDate: null
}

const moduleReducer = (state: ModuleState = DEFAULT_MODULE_STATE, action: Action) => {
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
