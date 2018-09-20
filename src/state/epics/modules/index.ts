import { modulesFirebase$, updateModuleFirebase } from '../../../firebaseconfig';
import { filter, map, mergeMap } from 'rxjs/internal/operators';
import { GET_MODULES, GET_MODULES_TOKEN } from '../../actions/getModules';
import GetModuleAction = GET_MODULES.GetModuleAction;
import { TypeKeys } from '../../actions';
import { UpdateModuleAction } from '../../actions/editModule';

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
      filter((action: any) => action.payload.location.pathname.includes('/module/')),
      map((action: any) => ({ type: TypeKeys.SET_CURRENT_MODULE, payload: action.payload.location.pathname.split('/')[2] })),
    );

export const editModuleEpic = ($action) =>
  $action.ofType(TypeKeys.UPDATE_MODULE)
    .pipe(
      mergeMap((action: UpdateModuleAction) => updateModuleFirebase(action.payload.moduleIndex, action.payload.module)),
      map(() => ({type: 'UPDATE_MODULE_SUCCESS'}))
    );