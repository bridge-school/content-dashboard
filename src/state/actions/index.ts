import { DRAG_MODULE } from './dragModule';
import { DROP_MODULE } from './dropModule';
import { GET_MODULES } from './getModules';

export enum TypeKeys {
    DRAG_MODULE = 'DRAG_MODULE',
    DROP_MODULE = 'DROP_MODULE',
    GET_MODULES = 'GET_MODULES',
}

type ActionTypes = {
    type: TypeKeys
};

export type Payload = {
    payload: DRAG_MODULE.DragModulePayload
        | DROP_MODULE.DropModulePayload
        | GET_MODULES.GetModulePayload
};

export type Action = ActionTypes & Payload;
