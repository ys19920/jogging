import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserList from './component/Users/UserList';
import AddUser from './component/Users/AddUser';
import EditUser from './component/Users/EditUser';
import TopBar from './components/TopBar';
import './App.css';

function routes() {
  return (
    <div>
      {' '}
      <Route exact path="/" component={UserList} />
      <Route exact path="/users" component={UserList} />
      <Route exact path="/users/edit/:id" component={EditUser} />
      <Route exact path="/users/new" component={AddUser} />
    </div>
  );
}
function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <TopBar />
          <div style={{ marginTop: '70px' }}>{routes()}</div>
        </div>
      </Router>
    </div>
  );
}

export default App;
