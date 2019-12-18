import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import './style.scss';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_MUTATION } from '../graphql/mutation';
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted(data) {
      console.log(data);
    }
  });
  const onSubmit = e => {
    e.preventDefault();
    login({
      variables: {
        email: email,
        password: password
      }
    });
  };

  return (
    <Grid textAlign="center" className="page-login" verticalAlign="middle">
      <Grid.Column className="column-login">
        <Header as="h2" color="blue" textAlign="center">
          Log-in to your account
        </Header>
        <Form size="large" onSubmit={onSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              value={email}
              icon="user"
              iconPosition="left"
              onChange={e => setEmail(e.target.value)}
              placeholder="E-mail address"
            />
            <Form.Input
              fluid
              value={password}
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
            <Button
              primary
              fluid
              size="large"
              content="Login"
              icon="sign in alternate"
              labelPosition="right"
            />
            <Link to="/signup" className="signup-link">
              Click here to sign up
            </Link>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
}

export default LoginPage;
