import { connect } from 'react-redux';
import { RootReducerState } from '../../state/reducers';
import { TeacherList } from '../../components/teacher-list/teacher-list.component';
import { UpdateTeacherInEdit } from '../../state/actions/teacherActions';


export const TeacherScene = connect(
  (state: RootReducerState) => {
    return ({
    user: state.auth.loggedInUser,
    teachers: state.teachers.teachers,
    teacherInEdit: state.teachers.teacherInEdit
  })},
  {
    onTeacherEdit: UpdateTeacherInEdit,
  }
)(TeacherList);
