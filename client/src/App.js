import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import AuthModule from './modules/auth';
import AppModule from './modules/app';
import styled from 'styled-components';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

function App() {
  const token = localStorage.getItem('token');
  const renderApp = () => (token ? <AppModule /> : <AuthModule />);

  return (
    <AppWrapper>
      <BrowserRouter>
        <Switch>
          <Route path="/" render={renderApp} />
        </Switch>
      </BrowserRouter>
    </AppWrapper>
  );
}

export default App;
