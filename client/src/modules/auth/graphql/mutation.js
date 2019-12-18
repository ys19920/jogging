import { gql } from 'apollo-boost';

export const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name)
  }
`;

export const LOGIN_MUTATION = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
    }
  }
`;
export const GET_TOKEN = gql`
  mutation($email: String!, $password: String!) {
    getToken(email: $email, password: $password)
  }
`;
