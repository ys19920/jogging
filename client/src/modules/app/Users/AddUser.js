import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { UsersQuery } from '../graphql/query';
import { ADD_USER } from '../graphql/mutation';
import { Link } from 'react-router-dom';
import { Header, Segment, Container, Form, Button, Dropdown } from 'semantic-ui-react';

function AddUser() {
  const [addUser] = useMutation(ADD_USER);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const roleOptions = [
    {
      key: 'user',
      value: 'user',
      text: 'user'
    },
    {
      key: 'manager',
      value: 'manager',
      text: 'manager'
    },
    {
      key: 'admin',
      value: 'admin',
      text: 'admin'
    }
  ];

  const onSubmit = e => {
    e.preventDefault();
    if (name && email)
      addUser({
        variables: {
          name: name,
          email: email,
          password: password,
          role: role
        },
        refetchQueries: [{ query: UsersQuery }]
      });
  };

  return (
    <Container className="main-app-container">
      <Header as="h2" content={'New User'} textAlign="center" />
      <Form onSubmit={onSubmit}>
        <Segment>
          <Header as="h4" content="Basic Info" dividing />
          <Form.Input
            label="Name"
            required
            value={name || ''}
            onChange={e => setName(e.target.value)}
          />
          <Form.Input
            label="Email"
            type="email"
            required
            value={email || ''}
            onChange={e => setEmail(e.target.value)}
          />
          <Form.Input
            label="Password"
            type="password"
            value={password || '****'}
            onChange={e => setPassword(e.target.value)}
          />

          <Form.Field inline required>
            <label>Role</label>
            <Dropdown
              placeholder="Select Role"
              fluid
              selection
              options={roleOptions}
              value={role}
              onChange={(e, data) => setRole(data.value)}
            />
          </Form.Field>
        </Segment>
        <Button color="blue">Save</Button>&nbsp;&nbsp;
        <Link to="/users">Cancel</Link>
      </Form>
    </Container>
  );
}
export default AddUser;
