import * as React from 'react';

import { SceneContainer } from '@components';
import { LessonPlanListItem } from './lesson-plan-list-item.component';
import { connect } from 'react-redux';
import { RootReducerState } from '../../state/reducers';
import * as moment from 'moment';
import { CohortScene } from '../cohort/cohort';
import { Route, RouteComponentProps, Switch } from 'react-router';

interface Props extends RouteComponentProps<any> {
  cohorts: any[];
}

const LessonPlans: React.SFC<Props> = ({cohorts}) => (
    <SceneContainer className="">
      <div className="flex justify-center">
        <div className="w-50 pt5">
          {cohorts.map(cohort => <LessonPlanListItem key={cohort.name} plan={cohort} />)}
        </div>
      </div>
    </SceneContainer>
  );

const LessonPlanList = connect(
  (state: RootReducerState) => ({
      cohorts: Object.keys(state.cohort.allCohorts).map(key => ({
        ...state.cohort.allCohorts[key],
        startDate: moment(state.cohort.allCohorts[key].startDate),
        endDate: moment(state.cohort.allCohorts[key].endDate)
      }))
    })
)(LessonPlans);

export const CohortRoot = ({match}) => (
  <Switch>
    <Route exact={true} path={`${match.path}`} component={LessonPlanList} />
    <Route path={`${match.path}:name`} component={CohortScene} />
  </Switch>
);
