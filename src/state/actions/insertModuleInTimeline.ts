export const INSERT_MODULE_IN_TIMELINE_TOKEN = 'INSERT_MODULE_IN_TIMELINE';

export namespace INSERT_MODULE_IN_TIMELINE {
    export type InsertModuleInTimelinePayload = {
        id: string;
        targetPosition: number,
    };

    export type InsertModuleInTimelineAction = {
        type: typeof INSERT_MODULE_IN_TIMELINE_TOKEN,
        payload: InsertModuleInTimelinePayload
    };

    export const createAction = (payload: InsertModuleInTimelinePayload) => ({
        type: INSERT_MODULE_IN_TIMELINE_TOKEN,
        payload
    });
}
