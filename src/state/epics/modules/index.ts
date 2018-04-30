import { modulesFirebase$ } from '../../../firebaseconfig';
import { filter, map } from 'rxjs/internal/operators';
import { GET_MODULES, GET_MODULES_TOKEN } from '../../actions/getModules';
import GetModuleAction = GET_MODULES.GetModuleAction;
import { TypeKeys } from '../../actions';

export const getModulesEpic = () =>
  modulesFirebase$.pipe(
    map((payload): GetModuleAction => ({
      type: GET_MODULES_TOKEN,
      payload,
    }))
  );

export const setSelectedModuleFromRoute = ($action) =>
  $action.ofType('@@router/LOCATION_CHANGE')
    .pipe(
      filter((action: any) => action.payload.pathname.includes('/module/')),
      map((action: any) => ({ type: TypeKeys.SET_CURRENT_MODULE, payload: action.payload.pathname.split('/')[2] })),
    );
