import { DRAG_MODULE } from './dragModule';
import { DROP_MODULE } from './dropModule';
import { GET_MODULES } from './getModules';
import { INSERT_MODULE_IN_TIMELINE } from './insertModuleInTimeline';

export enum TypeKeys {
    DRAG_MODULE = 'DRAG_MODULE',
    DROP_MODULE = 'DROP_MODULE',
    GET_MODULES = 'GET_MODULES',
    SET_CURRENT_MODULE = 'SET_CURRENT_MODULE',
    INSERT_MODULE_IN_TIMELINE = 'INSERT_MODULE_IN_TIMELINE',
}

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
