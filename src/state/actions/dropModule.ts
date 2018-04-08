export const DROP_MODULE_TOKEN = 'DROP_MODULE';

export namespace DROP_MODULE {
    export type DropModulePayload = {
        id: string;
    };

    export type DropModuleAction = {
        type: typeof DROP_MODULE_TOKEN,
        payload: DropModulePayload
    };

    export const createAction = (payload: DropModulePayload) => ({
        type: DROP_MODULE_TOKEN,
        payload
    });
}
