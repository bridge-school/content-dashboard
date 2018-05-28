import * as React from 'react';
import { History } from 'history';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router';

import { Home, LessonPlanList } from '@scenes';
import { NavigationBar } from '@components';
import { ModuleScene } from './scenes/content-module/module';
import { CohortScene } from './scenes/cohort/cohort';

interface Props {
  history: History;
}

export const Routes: React.SFC<Props> = ({ history }: Props) => (
  <ConnectedRouter history={history}>
    <div className="flex flex-column h-inherit">
      <NavigationBar />
      <div className="flex flex-auto">
        <Route exact={true} path="/" component={Home} />
        <Route path="/plans/" component={LessonPlanList} />
        <Route path="/module/:id" component={ModuleScene} />
        <Route path="/cohort/:name" component={CohortScene} />
      </div>
    </div>
  </ConnectedRouter>
);
