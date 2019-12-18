import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = e => {
    e.preventDefault();
  };

  return (
    <Grid textAlign="center" className="page-login" verticalAlign="middle">
      <Grid.Column className="column-login" onSubmit={onSubmit}>
        <Header as="h2" color="blue" textAlign="center">
          Sign up a new account
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Name"
            />
            <Form.Input
              fluid
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="E-mail address"
            />
            <Form.Input
              fluid
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
            />
            <Button primary fluid size="large">
              Sign up
            </Button>
            <Link to="/login" className="signup-link">
              Go back to log in
            </Link>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
}
export default SignUp;
