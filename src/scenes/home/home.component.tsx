import * as React from 'react';

import { SceneContainer } from '@components';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContextProvider } from 'react-dnd';

import { ModuleList } from './module-list/module-list.component';
import { Timeline } from './timeline/timeline.component';
import { LessonPlanNameInputField } from './lesson-plan-name/lesson-plan-name.component';
// import { LessonPlanList } from '@scenes';
import { connect } from 'react-redux';
import { getIDsFromList } from '../../state/selectors';
import { createCohort, setCohortName } from '../../state/actions/cohortActions';
import { StringActionCreator } from '../../state/actions';
import { RootReducerState } from '../../state/reducers';

interface Props {
  createdTimelineIDs: any;
  newCohortName: string;
  setCohortName: StringActionCreator;
  createCohort: any;
}

const HomeApp: React.SFC<Props> = props => (
  <DragDropContextProvider backend={HTML5Backend}>
    <SceneContainer className="flex-row">
      <ModuleList/>
      <div className="flex-auto pv3 ph4 h-inherit">
        <h2 className="f1 lh-title mt0 dark-gray">Create a Lesson</h2>
        <LessonPlanNameInputField/>
        <Timeline />
        {
          props.createdTimelineIDs.length ?
          <input
            type="text"
            onChange={event => props.setCohortName(event.target.value)}
            placeholder="Create a new cohort name..."
          /> : ''
        }
        {
          props.createdTimelineIDs.length && props.newCohortName ?
        <button
          className="f6 link dim ba ph3 pv2 mb2 dib near-black"
          onClick={() => props.createCohort(props.newCohortName, props.createdTimelineIDs)}
        >
          Save Cohort
        </button> : ''
        }
      </div>
    </SceneContainer>
  </DragDropContextProvider>
);

export const Home = connect(
  (state: RootReducerState) => ({
    createdTimelineIDs: getIDsFromList(state),
    newCohortName: state.module.newCohortName
  }),
  { setCohortName, createCohort }
  )(HomeApp);