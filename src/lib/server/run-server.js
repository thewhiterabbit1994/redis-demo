import { ApolloServer } from 'apollo-server'

import './db'

import dotenv from 'dotenv'

dotenv.config()

export default ({ typeDefs, resolvers }) => {
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // // The `listen` method launches a web server.
  server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => console.log(`🚀  Server ready at ${url}`))
  
}