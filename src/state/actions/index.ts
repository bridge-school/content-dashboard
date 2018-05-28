import { DRAG_MODULE } from './dragModule';
import { DROP_MODULE } from './dropModule';
import { GET_MODULES } from './getModules';
import { INSERT_MODULE_IN_TIMELINE } from './insertModuleInTimeline';

export enum TypeKeys {
    DRAG_MODULE = 'DRAG_MODULE',
    DROP_MODULE = 'DROP_MODULE',
    GET_MODULES = 'GET_MODULES',
    ROUTE_TO = 'ROUTE_TO',
    SET_CURRENT_MODULE = 'SET_CURRENT_MODULE',
    SET_LESSON_PLAN_NAME = 'SET_LESSON_PLAN_NAME',
    INSERT_MODULE_IN_TIMELINE = 'INSERT_MODULE_IN_TIMELINE',
    SET_COHORT_NAME = 'SET_COHORT_NAME',
    CREATE_COHORT = 'CREATE_COHORT',
    SET_SELECTED_COHORT = 'SET_SELECTED_COHORT',
    SET_ALL_COHORTS = 'SET_ALL_COHORTS'
}

export type StringAction = { type: string, payload: string };
export type StringActionCreator = (...args: any[]) => StringAction;

type ActionTypes = {
    type: TypeKeys
};

export type Payload = {
    payload: DRAG_MODULE.DragModulePayload
        | DROP_MODULE.DropModulePayload
        | GET_MODULES.GetModulePayload
        | INSERT_MODULE_IN_TIMELINE.InsertModuleInTimelinePayload
};

export type Action = ActionTypes & Payload;
