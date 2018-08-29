import * as React from 'react';

import { connect } from 'react-redux';
import { RootReducerState } from '../../state/reducers';
import { CohortScene } from '../cohort/cohort';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@material-ui/core';

interface Props extends RouteComponentProps<any> {
  cohorts: any[];
}

const LessonPlans: React.SFC<Props> = ({cohorts}) => (
  <List>
    {cohorts.map(cohort => (
      <Link to={`cohorts/${cohort.id}`} style={{ textDecoration: 'none' }}>
        <ListItem button={true}>
          <ListItemText primary={cohort.cohortName} />
        </ListItem>
      </Link>
    ))}
  </List>
  );

const LessonPlanList = connect(
  (state: RootReducerState) => ({
      cohorts: Object.keys(state.cohort.allCohorts).map(key => state.cohort.allCohorts[key])
    })
)(LessonPlans);

export const CohortRoot = ({match}) => (
  <Switch>
    <Route exact={true} path={`${match.path}`} component={LessonPlanList} />
    <Route path={`${match.path}:name`} component={CohortScene} />
  </Switch>
);
