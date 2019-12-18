/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import AddUser from './Users/AddUser';
import EditUser from './Users/EditUser';
import UserList from './Users/UserList';
import TopBar from '../../components/TopBar';
class App extends Component {
  render() {
    return (
      <div className="auth-app">
        <TopBar />
        <Switch>
          <Route exact path="/users" component={UserList} />
          <Route exact path="/users/edit/:id" component={EditUser} />
          <Route exact path="/users/new" component={AddUser} />
          <Route render={() => <Redirect to="/users" />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
