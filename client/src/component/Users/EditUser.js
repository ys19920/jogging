import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { UserQuery } from '../../graphql/query';
import { UPDATE_USER } from '../../graphql/mutation';
import { useParams } from 'react-router';

import { Link } from 'react-router-dom';
import {
  Header,
  Segment,
  Container,
  Form,
  Button,
  Dimmer,
  Loader,
  Dropdown
} from 'semantic-ui-react';

function EditUser() {
  const { id } = useParams();
  const [updateUser] = useMutation(UPDATE_USER);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const { loading, data } = useQuery(UserQuery, {
    variables: { id: id }
  });
  useEffect(() => {
    if (data) {
      setName(data.user.name);
      setEmail(data.user.email);
      setRole(data.user.role);
    }
  }, [data]);
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
      updateUser({
        variables: {
          id: id,
          name: name,
          email: email,
          password: password,
          role: role
        },
        refetchQueries: ['UserQuery']
      });
  };

  return (
    <Container className="main-app-container">
      <Header as="h2" content={'Edit User'} textAlign="center" />{' '}
      <Dimmer active={loading}>
        <Loader />
      </Dimmer>
      <Form onSubmit={onSubmit}>
        <Segment>
          <Header as="h4" content="Basic Info" dividing />
          <Form.Input label="Name" required value={name} onChange={e => setName(e.target.value)} />
          <Form.Input
            label="Email"
            type="email"
            required
            value={email}
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
        <Link to="/">Cancel</Link>
      </Form>
    </Container>
  );
}
export default EditUser;
