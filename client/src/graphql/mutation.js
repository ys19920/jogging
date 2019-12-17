import { gql } from 'apollo-boost';
export const ADD_USER = gql`
  mutation($name: String!, $email: String!, $password: String, $role: String) {
    addUser(name: $name, email: $email, password: $password, role: $role) {
      id
      name
      email
      role
    }
  }
`;
export const UPDATE_USER = gql`
  mutation($id: String!, $name: String!, $email: String!, $password: String, $role: String) {
    updateUser(id: $id, name: $name, email: $email, password: $password, role: $role) {
      id
      name
      email
      role
    }
  }
`;
export const REMOVE_USER = gql`
  mutation($id: String!) {
    removeUser(id: $id) {
      id
      name
    }
  }
`;
export const GET_TOKEN = gql`
  mutation($id: String!) {
    removeUser(id: $id) {
      id
      name
    }
  }
`;
