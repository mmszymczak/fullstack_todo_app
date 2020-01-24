import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import * as mutations from '../store/mutations';

export const Login = ({authenticateUser, authenticated}) => (
  <Fragment>
    <div>
      <h2>Please login</h2>
    </div>
    <form onSubmit={authenticateUser}>
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />

      {authenticated === mutations.NOT_AUTHENTICATED ? <p>Login incorrect</p> : null}

      <button type="submit">Submit</button>
    </form>
  </Fragment>
);

const mapStateToProps = ({session}) => ({
  authenticated: session.authenticated
});

const mapDispatchToProps = (dispatch) => ({
  authenticateUser(e) {
    e.preventDefault();

    let username = e.target['username'].value;
    let password = e.target['password'].value;
    dispatch(mutations.requestAuthenticateUser(username, password));
  }
});

export const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);
