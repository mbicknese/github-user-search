# GitHub Search tool

## Setup

To get started with this project you'll need an authentication token to use GitHub's GraphQL interface. Retrieve a token
as described in
the [Authenticating with GraphQL chapter](https://docs.github.com/en/graphql/guides/forming-calls-with-graphql#the-graphql-endpoint)
in the GitHub docs.

After creating a token expose it to Vite using the environment variable `VITE_OAUTH_TOKEN`, e.g.

```
export VITE_OAUTH_TOKEN=myverysecuretoken
```

now rebuild the project and you're ready to go!
