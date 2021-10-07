
import BlogResolver from './blog-resolver'

export default {
  Query: {
    ...BlogResolver.Query
  },
  Mutation: {
    ...BlogResolver.Mutation
  }
}