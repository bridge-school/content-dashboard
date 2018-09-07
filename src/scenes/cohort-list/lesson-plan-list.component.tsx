import * as React from 'react';

import { connect } from 'react-redux';
import { RootReducerState } from '../../state/reducers';
import { CohortScene } from '../cohort/cohort';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { Link } from 'react-router-dom';

interface Props extends RouteComponentProps<any> {
  cohorts: any[];
}

const LessonPlans: React.SFC<Props> = ({cohorts}) => (
  <section>
    {cohorts.map(cohort => (
      <section className="ph3 ph5-ns pv4" key={cohort.id}>
        <article className="mw8 center br2 ba b--dark-blue bg-white">
          <div className="dt-ns dt--fixed-ns w-100">
            <div className="pa3 pa4-ns dtc-ns v-top">
              <h2 className="fw4 dark-blue mt0 mb3">{ cohort.cohortName }</h2>
              <p className="black-70 measure lh-copy mv0">
                This is going to be some detail info - coming soon!
              </p>
            </div>
            <div className="pa3 pa4-ns dtc-ns v-top">
              <h2 className="fw4 dark-blue mt0 mb3">Dates</h2>
              <p>{ cohort.startDate } - { cohort.endDate }</p>
            </div>
            <div className="pa3 pa4-ns dtc-ns v-mid">
              <Link to={`cohorts/${cohort.id}`} 
                className="no-underline f8 tc db w-100 pv3 ba bg-animate fw6 bg-white dark-blue hover-bg-dark-blue hover-white br2"
              >
                Edit
              </Link>
            </div>
          </div>
        </article>
      </section>
    ))}
  </section>
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
