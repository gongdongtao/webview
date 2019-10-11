import React, { Component, Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom'; // Redirect, withRouter, matchPath

import Main from './pages/Main';
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Detail = lazy(() => import('./pages/Detail'));

// const AppRoutes = () => {
class AppRoutes extends Component {
  render() {
    return (
      <Main>
        <Suspense fallback={<div />}>
            <Switch>
              <Route exact path='/' render={props => <Home {...props} />} />
              <Route path='/login' render={props => <Login {...props} />} />
              <Route path='/detail' render={props => <Detail {...props} />} />
            </Switch>
        </Suspense>
      </Main>
    )
  }
}

export default AppRoutes
