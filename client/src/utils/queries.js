import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
        id
        username
        stories {
            _id
            title
            prompt
            storyText
            createdAt
            username
            comments {
                _id
                commentText
                createdAt
                username
                }
            }
        }
    }
`;

//query prompts
export const QUERY_PROMPTS = gql`
    query prompts {
        prompts {
            _id
            promptText
        }
    }
`;

export const QUERY_STORY = gql`
    query story($id: ID!) {
        story(_id: $id) {
            _id
            title
            prompt
            storyText
            createdAt
            username
            comments {
                _id
                commentText
                createdAt
                username
            }
        }
    }
`;

export const QUERY_STORIES = gql`
    query stories {
        stories {
            _id
            title
            prompt
            storyText
            createdAt
            username
            comments {
                _id
                commentText
                createdAt
                username
            }
        }
    }
`;

