import * as React from 'react';
import { History } from 'history';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router';

import { CohortRoot, Home } from '@scenes';
import { NavigationBar } from '@components';
import { ModuleScene } from './scenes/content-module/module';
import { CssBaseline } from '@material-ui/core';

interface Props {
  history: History;
}

export const Routes: React.SFC<Props> = ({ history }: Props) => (
  <ConnectedRouter history={history}>
    <div className="flex flex-column h-inherit">
      <CssBaseline />

      <NavigationBar />
      <div className="flex flex-auto flex-column items-center overflow-y-scroll pa3">
        <Route exact={true} path="/" component={Home} />
        <Route path="/cohorts/" component={CohortRoot} />
        <Route path="/module/:id" component={ModuleScene} />
      </div>
    </div>
  </ConnectedRouter>
);
