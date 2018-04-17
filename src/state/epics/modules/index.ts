import { modulesFirebase$ } from '../../../firebaseconfig';
import { map } from 'rxjs/internal/operators';
import { GET_MODULES, GET_MODULES_TOKEN } from '../../actions/getModules';
import GetModuleAction = GET_MODULES.GetModuleAction;

export const getModulesEpic = () =>
  modulesFirebase$.pipe(
    map((payload): GetModuleAction => ({
      type: GET_MODULES_TOKEN,
      payload,
    }))
  );
