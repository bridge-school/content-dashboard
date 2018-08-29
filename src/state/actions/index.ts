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
    INSERT_MODULE_IN_TIMELINE = 'INSERT_MODULE_IN_TIMELINE',
    SET_COHORT_NAME = 'SET_COHORT_NAME',
    SET_COHORT_START_DATE = 'SET_COHORT_START_DATE',
    CREATE_COHORT = 'CREATE_COHORT',
    SET_SELECTED_COHORT = 'SET_SELECTED_COHORT',
    SET_ALL_COHORTS = 'SET_ALL_COHORTS',
    UPDATE_MODULE = 'UPDATE_MODULE',
    TOGGLE_COHORT_CLASSROOM_DIALOG = 'TOGGLE_COHORT_CLASSROOM_DIALOG'
}

export type StringAction = { type: string, payload: string };
export type BooleanAction = { type: string, payload: boolean };
export type StringActionCreator = (...args: any[]) => StringAction;

export type ActionWithPayload<T> = {type: TypeKeys, payload: T};

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
