import { gql } from 'apollo-boost';
export const UsersQuery = gql`
  {
    users {
      id
      name
      email
      role
    }
  }
`;
export const CurrentUser = gql`
  query getUser($token: String) {
    getCurrentUser(token: $token)
  }
`;

export const UserQuery = gql`
  query getUser($id: String!) {
    user(id: $id) {
      name
      email
      id
      role
    }
  }
`;
