import { gql } from '@apollo/client/core';
import { client } from './client';
import { SearchType, User as GitHubUser } from './schema';
import { CursorList, User } from '../models';

const search =
    (type: SearchType) =>
    async (
        query: string,
        amount: number,
        lookAround: number = 5 * amount,
        after?: string | null
    ) => {
        const result = await client.query({
            query: gql`
                query SearchToBrowse(
                    $after: String
                    $first: Int
                    $query: String!
                    $type: SearchType!
                    $lookAround: Int
                ) {
                    results: search(after: $after, first: $first, query: $query, type: $type) {
                        edges {
                            cursor
                            node {
                                ... on User {
                                    name
                                    login
                                    bio
                                    avatarUrl
                                    repositories {
                                        totalCount
                                    }
                                    starredRepositories {
                                        totalCount
                                    }
                                    commitComments(first: 1) {
                                        nodes {
                                            body
                                        }
                                    }
                                }
                                ... on Organization {
                                    name
                                    login
                                    avatarUrl
                                    repositories {
                                        totalCount
                                    }
                                }
                            }
                        }
                        userCount
                    }
                    lookAhead: search(
                        after: $after
                        first: $lookAround
                        query: $query
                        type: $type
                    ) {
                        edges {
                            cursor
                        }
                    }
                }
            `,
            variables: {
                query,
                type,
                first: amount,
                after,
                lookAround,
            },
        });

        if (result.error) {
            throw new Error('We need to figure out some proper UX here.');
        }

        const cursors = CursorList.fromEdges(result.data.lookAhead.edges, amount);
        return {
            users: result.data.results.edges.map(
                ({ node }: { node: GitHubUser }) =>
                    new User(
                        node.name || node.login,
                        node.login,
                        node.bio,
                        node.avatarUrl,
                        node.repositories?.totalCount,
                        node.starredRepositories?.totalCount,
                        node.commitComments?.nodes?.at(0)?.body
                    )
            ),
            userCount: result.data.results.userCount,
            cursors,
        };
    };

export const searchUsers = search(SearchType.User);
