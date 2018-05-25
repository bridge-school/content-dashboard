import * as React from 'react';
// import { Dispatch } from 'redux';
import { connect as reduxConnect } from 'react-redux';

import { RootReducerState } from '../../../state/reducers';
import { TypeKeys } from '../../../state/actions';

interface Props {
  textValue: string;
  updateText?: any;
}

// a dump component: text field
const TextField: React.SFC<Props> = ({ textValue, updateText }) => (
  <input 
    type="text"
    value={textValue}
    onChange={updateText}
  />
);

const LessonPlanNameField = ({ lessonPlanName, handleOnChange }) => {
  return (
    <TextField
      textValue={lessonPlanName}
      updateText={handleOnChange}
    />
  );
};

const ConnectedLessonPlanNameField = reduxConnect(
  (state: RootReducerState) => ({
    lessonPlanName: state.module.lessonPlanName
  }), 
  (dispatch) => ({
    handleOnChange: (e) => dispatch({type: TypeKeys.UPDATE_LESSON_PLAN_NAME, payload: e.target.value}),
  })
)(LessonPlanNameField);

export {
  ConnectedLessonPlanNameField as LessonPlanNameField
};