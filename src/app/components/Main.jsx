import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { ConnectedLogin } from './Login';
import { ConnectedDashboard } from './Dashboard';
import { Router, Route } from 'react-router-dom';
import { history } from '../store/history';
import { ConnectedNavigation } from './Navigation';
import { ConnectedTaskDetail } from './TaskDetail';
import { Redirect } from 'react-router';

const RouteGuard = Component => ({match}) => {
  const state = store.getState();

  if (state.session && !state.session.authenticated) {
    return <Redirect to="/" />
  } else {
    return <Component match={match} />
  }
};

export const Main = () => (
  <Router history={history}>
    <Provider store={store}>
      <ConnectedNavigation />
      <Route exact path="/" component={ConnectedLogin} />
      <Route exact path="/dashboard" render={RouteGuard(ConnectedDashboard)} />
      <Route exact path="/task/:id" render={RouteGuard(ConnectedTaskDetail)} />
    </Provider>
  </Router>
);
