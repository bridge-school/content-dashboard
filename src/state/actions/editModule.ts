import { TypeKeys } from './index';
import { ContentModule } from '../../constants';

export type UpdateModuleAction = {
  type: TypeKeys.UPDATE_MODULE,
  payload: ContentModule
};