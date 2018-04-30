import { TypeKeys } from './index';

export type SetCurrentModuleAction = {
  type: TypeKeys.SET_CURRENT_MODULE,
  payload: string
};
