import { TypeKeys } from './index';
import { ContentModule } from '../../constants';

export type UpdateModuleAction = {
  type: TypeKeys.UPDATE_MODULE,
  payload: { module: ContentModule, moduleIndex: number }
};

export const UpdateModule = (module: ContentModule, moduleIndex: number): UpdateModuleAction => ({
  type: TypeKeys.UPDATE_MODULE,
  payload: {
    module,
    moduleIndex
  },
});