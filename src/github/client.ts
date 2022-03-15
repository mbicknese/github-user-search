import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { SearchResultItemEdge } from './schema';

const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers }) => ({
    headers: {
        ...headers,
        authorization: `bearer ${import.meta.env.VITE_OAUTH_TOKEN}`,
    },
}));

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    search: {
                        keyArgs: ['type', 'query'],
                        merge(existing, incoming, { args }) {
                            if (!existing) {
                                return incoming;
                            }

                            return {
                                ...existing,
                                edges: [
                                    ...existing.edges.slice(
                                        0,
                                        findCursorIndex(args, existing.edges)
                                    ),
                                    ...incoming.edges,
                                ],
                            };
                        },

                        read(existing, { args }) {
                            if (!existing || !args) {
                                return existing;
                            }

                            const offset = findCursorIndex(args, existing.edges);
                            return {
                                ...existing,
                                edges: existing.edges.slice(offset, offset + args.first),
                            };
                        },
                    },
                },
            },
        },
    }),
});

/**
 * Helper function to discover where to cut in the edges
 */
const findCursorIndex = (
    args: Record<string, any> | null,
    edges: Array<SearchResultItemEdge>
): number => {
    return edges.findIndex((edge: SearchResultItemEdge) => args?.after === edge.cursor) + 1;
};
