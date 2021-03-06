
import Blog from 'models/blog'
import redisBlog from 'lib/redis/blog'


export default {
  Query: {
    getBlogs: async () => redisBlog.getBlogsFromRedis(),
    getSingleBlog: async (_, { _id }) => redisBlog.getSingleBlogFromRedis(_id),
  },
  Mutation: {
    createBlog: async (_, { data }) => {
      
      try {
        const thisBlog = await Blog.create(data)

        redisBlog.writeSingleBlogOnRedis(thisBlog)
  
        return {
          msg: 'successfully created this blog',
          status: 200
        }
      } catch (error) {
        throw error
      }

    },
    editBlog: async (_, { _id, data }) => {
      
      try {

        let thisBlog = await Blog.findById(_id)

        if (!thisBlog) throw new Error('no such blog exists')

        thisBlog = await Blog.findByIdAndUpdate(_id, data, { new: true })
        
        redisBlog.writeSingleBlogOnRedis(thisBlog)

        return {
          msg: 'successfully edited this blog',
          status: 200
        }
        
      } catch (error) {
        throw error
      }
    },
  }
}