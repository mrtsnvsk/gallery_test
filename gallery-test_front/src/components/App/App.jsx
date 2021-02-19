import React, { useEffect } from 'react';
import AuthPage from '../AuthPage';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { checkAuthUser, logoutUser } from '../../redux/actions/authActions';
import Header from '../Header';
import Gallery from '../Gallery';
import Comments from '../Comments';
import './App.css';

const App = ({ isAuth, logoutUser, checkAuthUser }) => {
  useEffect(() => {
    localStorage.getItem('token') ? checkAuthUser() : logoutUser();
  }, [checkAuthUser, logoutUser]);
  return (
    <>
      {!isAuth && <Redirect to='login' />}
      {!isAuth && <Route to='/login' component={AuthPage} />}
      {isAuth && <Redirect from='/' to='gallery' />}
      {isAuth && (
        <div>
          <Header />
          <Switch>
            <Route path='/gallery' component={Gallery} />
            <Route path='/image/:id' component={Comments} />
          </Switch>
        </div>
      )}
    </>
  );
};

const mapStateToProps = ({ isAuth }) => {
  return {
    isAuth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
    checkAuthUser: () => dispatch(checkAuthUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
