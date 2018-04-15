export const DRAG_MODULE_TOKEN = 'DRAG_MODULE';

export namespace DRAG_MODULE {
    export type DragModulePayload = void;

    export type DragModuleAction = {
        type: typeof DRAG_MODULE_TOKEN,
        payload: DragModulePayload
    };

    export const createAction = (payload: DragModulePayload) => ({
        type: DRAG_MODULE_TOKEN,
        payload
    });
}
