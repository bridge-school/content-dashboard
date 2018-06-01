import * as React from 'react';
import { History } from 'history';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router';

import { CohortRoot, Home } from '@scenes';
import { NavigationBar } from '@components';
import { ModuleScene } from './scenes/content-module/module';

interface Props {
  history: History;
}

export const Routes: React.SFC<Props> = ({ history }: Props) => (
  <ConnectedRouter history={history}>
    <div className="flex flex-column h-inherit">
      <NavigationBar />
      <div className="flex flex-auto">
        <Route exact={true} path="/" component={Home} />
        <Route path="/cohorts/" component={CohortRoot} />
        <Route path="/module/:id" component={ModuleScene} />
      </div>
    </div>
  </ConnectedRouter>
);
