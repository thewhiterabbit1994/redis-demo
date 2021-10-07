
import BlogResolver from './blog-resolver'

export default {
  Query: {
    hello: () => 'world',
    ...BlogResolver.Query
  },
  Mutation: {
    ...BlogResolver.Mutation
  }
}