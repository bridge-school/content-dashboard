import { TypeKeys } from './index';
import { Teacher } from '../reducers/teacher';


export const UpdateTeacherInEdit = (teacherInEdit: Teacher) => ({
  type: TypeKeys.UPDATE_TEACHER_IN_EDIT,
  payload: teacherInEdit,
});