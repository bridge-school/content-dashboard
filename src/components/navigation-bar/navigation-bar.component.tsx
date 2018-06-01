import * as React from 'react';
import { uiConfig } from '../../firebaseconfig';
import * as firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Link } from 'react-router-dom';

// todo: resolve this issue, require currently breaking production
// const logo = require('../../assets/logo-white.svg');

export const NavigationBar = () => (
  <div className="flex h3 pa2 white background-gradient_blue items-center justify-between" style={{flexShrink: 0}}>
    <span>
      <Link to="/">Bridge</Link>
      <Link to="/cohorts">Cohort List</Link>
    </span>
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
  </div>
);
