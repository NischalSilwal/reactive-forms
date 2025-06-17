export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000',
  GRAPHQL_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/graphql',
  TIMEOUT: 10000, // 10 seconds
} as const;

// API helper functions
export const createGraphQLRequest = (query: string, variables?: any) => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query,
    variables,
  }),
});

// GraphQL mutations
export const GRAPHQL_MUTATIONS = {
  SIGNUP: `
    mutation Signup($input: SignupInput!) { signup(input: $input) }
  `,
  LOGIN: `
    mutation Login($input: LoginInput!) { login(input: $input) { user { id firstName lastName email isVerified } tokens { accessToken refreshToken } } }
  `,
} as const;

// GraphQL queries
export const GRAPHQL_QUERIES = {
  GET_USER: `
    query GetUser($id: ID!) {
      user(id: $id) {
        id
        firstName
        lastName
        email
        createdAt
        updatedAt
      }
    }
  `,
} as const;