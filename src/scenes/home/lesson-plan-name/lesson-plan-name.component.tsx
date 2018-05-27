import * as React from 'react';
import { Dispatch } from 'redux';
import { Action } from '../../../state/actions';

import { connect as reduxConnect } from 'react-redux';

import { RootReducerState } from '../../../state/reducers';
import { TypeKeys } from '../../../state/actions';

import { TextField } from '../../../components/text-field/text-field.component';

const LessonPlanNameInput = ({ lessonPlanName, updateText }) => (
  <TextField
    name="lesson-plan-name"
    placeholder="Lesson plan name"
    value={lessonPlanName}
    handleOnChange={updateText}
  />
);

const ConnectedLessonPlanNameInput = reduxConnect(
  (state: RootReducerState) => ({
    lessonPlanName: state.module.lessonPlanName
  }), 
  (dispatch: Dispatch<Action>) => ({
    updateText: (e) => dispatch({type: TypeKeys.UPDATE_LESSON_PLAN_NAME, payload: e.target.value}),
  })
)(LessonPlanNameInput);

export {
  ConnectedLessonPlanNameInput as LessonPlanNameInputField
};