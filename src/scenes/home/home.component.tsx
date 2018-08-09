import * as React from 'react';

import { SceneContainer } from '@components';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContextProvider } from 'react-dnd';

import { ModuleList } from './module-list/module-list.component';
import { Timeline } from './timeline/timeline.component';
import { connect } from 'react-redux';
import { getIDsFromList } from '../../state/selectors';
import { createCohort, setCohortName, setCohortStartDate } from '../../state/actions/cohortActions';
import { StringActionCreator } from '../../state/actions';
import { RootReducerState } from '../../state/reducers';

interface Props {
  createdTimelineIDs: any;
  newCohortName: string;
  newCohortStartDate: string;
  setCohortName: StringActionCreator;
  setCohortStartDate: StringActionCreator;
  createCohort: any;
  user: any;
}

const HomeApp: React.SFC<Props> = props => (
  <DragDropContextProvider backend={HTML5Backend}>
    <SceneContainer className="flex-row">
      <ModuleList />
      {props.user ? <div className="flex-auto pv3 ph4 h-inherit">
        <h2 className="f1 lh-title mt0 dark-gray">Create a Lesson</h2>
        <Timeline />
        {Boolean(props.createdTimelineIDs.length) &&
          <div>
            <input
              type="text"
              onChange={event => props.setCohortName(event.target.value)}
              placeholder="Create a new cohort name..."
            />
            <input
              type="date"
              onChange={event => props.setCohortStartDate(event.target.value)}
              placeholder="Set new cohort start date..."
            />
          </div>
        }
        {Boolean(props.createdTimelineIDs.length && props.newCohortName) &&
          <button
            className="f6 link dim ba ph3 pv2 mb2 dib near-black"
            onClick={() => props.createCohort(props.newCohortName, props.createdTimelineIDs, props.newCohortStartDate)}
          >
            Save Cohort
          </button>
        }
      </div> : <h2>Cannot create cohort until signed in</h2>}
    </SceneContainer>
  </DragDropContextProvider>
);

export const Home = connect(
  (state: RootReducerState) => ({
    createdTimelineIDs: getIDsFromList(state),
    newCohortName: state.module.newCohortName,
    newCohortStartDate: state.module.newCohortStartDate,
    user: state.auth.loggedInUser
  }),
  { setCohortName, setCohortStartDate, createCohort }
)(HomeApp);
