export const GET_MODULES_TOKEN = 'GET_MODULES';

export namespace GET_MODULES {
  export type GetModulePayload = any; // todo: add interface for expected formatted moduleData

  export type GetModuleAction = {
    type: typeof GET_MODULES_TOKEN,
    payload: GetModulePayload
  };
  export const createAction = (payload: GetModulePayload) => ({
    type: GET_MODULES_TOKEN,
    payload
  });
}
