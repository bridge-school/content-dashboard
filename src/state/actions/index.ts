import { DRAG_MODULE } from './dragModule';
import { DROP_MODULE } from './dropModule';

export enum TypeKeys {
    DRAG_MODULE = 'DRAG_MODULE',
    DROP_MODULE = 'DROP_MODULE'
}

type ActionTypes = {
    type: TypeKeys
};

export type Payload = {
    payload: DRAG_MODULE.DragModulePayload
        | DROP_MODULE.DropModulePayload
};

export type Action = ActionTypes & Payload;
