const gql= String.raw

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    allPosts: [Post]
  }

  type Post {
    _id: ID
    location: String
    description: String
    temperature: Int
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addPost(location: String!, description: String!, temperature: Int!): Post
  }
`;

module.exports = typeDefs;
