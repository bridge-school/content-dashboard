export const ADD_MODULE_TO_NEW_COHORT = 'ADD_MODULE_TO_NEW_COHORT';

export namespace DROP_MODULE {
    export type DropModulePayload = {
        selectedModuleID: string;
        modules: any;
        timeline: any;
    };

    export type DropModuleAction = {
        type: typeof ADD_MODULE_TO_NEW_COHORT,
        payload: DropModulePayload
    };

    export const createAction = (payload: DropModulePayload) => ({
        type: ADD_MODULE_TO_NEW_COHORT,
        payload
    });
}
