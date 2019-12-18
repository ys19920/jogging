import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { UsersQuery, UserQuery } from '../graphql/query';
import { REMOVE_USER } from '../graphql/mutation';
import { Link } from 'react-router-dom';
import { Table, Header, Container, Button, Confirm } from 'semantic-ui-react';

function UserList() {
  const { loading, error, data } = useQuery(UsersQuery);
  const [deleteID, setId] = useState('');
  const [showDeleteConfirm, setShowConfirm] = useState(false);
  const [deleteUser, { loading: removeLoading, data: mutationData }] = useMutation(REMOVE_USER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const remove = id => {
    setId(id);
    setShowConfirm(true);
  };
  const handleConfirm = () => {
    deleteUser({
      variables: { id: deleteID },
      refetchQueries: [{ query: UsersQuery }]
    });
    setShowConfirm(false);
  };
  const handleCancel = () => {
    setShowConfirm(false);
  };
  const renderUsers = () => {
    if (!data.users.length)
      return (
        <Table.Row>
          <Table.Cell colSpan="4">No Users</Table.Cell>
        </Table.Row>
      );
    return data.users.map((user, index) => (
      <Table.Row key={user.id}>
        <Table.Cell>{index + 1}</Table.Cell>
        <Table.Cell>
          <Link to={`/users/edit/${user.id}`}>{user.name}</Link>
        </Table.Cell>
        <Table.Cell>{user.email}</Table.Cell>
        <Table.Cell>{user.role}</Table.Cell>
        <Table.Cell>
          <Button
            color="teal"
            size="mini"
            as={Link}
            to={`/users/edit/${user.id}`}
            content="View"
            icon="edit"
            labelPosition="left"
          />
          &nbsp;
          <Button
            color="orange"
            onClick={() => remove(user.id)}
            size="mini"
            content="Remove"
            icon="minus"
            labelPosition="left"
          />
        </Table.Cell>
      </Table.Row>
    ));
  };
  return (
    <Container className="main-app-container">
      <Confirm
        open={showDeleteConfirm}
        content="Are you sure to delete this user?"
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
      <Header as="h2" content="Users" textAlign="center" />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>No</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{renderUsers()}</Table.Body>

        {/* <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="5">
              <Pagination />
              <PageSize size={5} />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer> */}
      </Table>
    </Container>
  );
}
export default UserList;
