import * as React from 'react';
import { uiConfig } from '../../firebaseconfig';
import * as firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { GithubProfileCard } from '../github-profile-card/github-profile.component';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';

// todo: resolve this issue, require currently breaking production
// const logo = require('../../assets/logo-white.svg');

export const NavigationBarComponent = props => (
  <AppBar position="static" color="default">
    <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
      <span style={{display: 'flex', alignItems: 'center'}}>
        <Link to="/">
        <Typography variant="title" color="inherit" noWrap>
          Bridge
        </Typography>
      </Link>

      <Link to="/cohorts">
        <Button>Cohort List</Button>
      </Link>
      </span>
      <span>
        {props.user ?
          <GithubProfileCard user={props.user}/> :
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
        }
      </span>
    </Toolbar>
  </AppBar>
);

export const NavigationBar = connect((state: any) => ({user: state.auth.loggedInUser}))(NavigationBarComponent);
