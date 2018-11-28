import * as React from 'react';
import { Redirect, Route } from 'react-router';


export const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
);
