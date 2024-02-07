import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;

export const ALL_POSTS=gql`
query allPosts {
  allPosts {
    _id
    description
    location
    temperature
  }
}
`