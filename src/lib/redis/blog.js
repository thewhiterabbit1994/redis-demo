import redisClient from './redisClient'

import Blog from 'models/blog'

import { isArrayEmpty } from 'lib/utils/array'

const writeSingleBlogOnRedis = blog => {
  // will add the new blog to redis
  redisClient.hset('blogs', blog._id, JSON.stringify(blog), (err, value) => {})
}

const getBlogsFromRedis = async () => {
  let response = JSON.parse((await redisClient.get('blogs')))

  if (response) return Object.entries(response).map(([key, value]) => value)

  const theseBlogs = await Blog.find({})

  if (isArrayEmpty(theseBlogs)) return []

  theseBlogs.forEach(blog => writeSingleBlogOnRedis(blog))

  return theseBlogs

}

const getSingleBlogFromRedis = async _id => {
  const blogs = JSON.parse((await redisClient.get('blog')))

  if (blogs[_id]) return blogs[_id]

  const thisBlog = await Blog.findById(_id)

  if (!thisBlog) throw new Error('bad request')

  writeSingleBlogOnRedis(thisBlog)

  return thisBlog
  
}

export default {
  writeSingleBlogOnRedis,
  getBlogsFromRedis,
  getSingleBlogFromRedis
}