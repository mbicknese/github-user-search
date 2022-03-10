import { gql } from '@apollo/client';
import { client } from './apollo';
import { SearchResultItemConnection, SearchType } from './schema';

const search =
    (type: SearchType) =>
    async (query: string): Promise<SearchResultItemConnection> => {
        const result = await client.watchQuery({
            query: gql`
                query ($after: String, $first: Int, $query: String!, $type: SearchType!) {
                    search(after: $after, first: $first, query: $query, type: $type) {
                        edges {
                            cursor
                            node {
                                ... on User {
                                    login
                                    bio
                                }
                            }
                        }
                        userCount
                    }
                }
            `,
            variables: {
                query,
                type,
                first: 5,
                after: 'Y3Vyc29yOjU=',
            },
        });
        if (result.getCurrentResult().error) {
            throw new Error('We need to figure out some proper UX here.');
        }

        return result.getCurrentResult().data.search;
    };

export const searchUser = search(SearchType.User);
