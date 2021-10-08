import redisClient from './redisClient'

import Blog from 'models/blog'

import { isArrayEmpty } from 'lib/utils/array'

const writeSingleBlogOnRedis = async blog => {
  // will add the new blog to redis
  const data = JSON.parse((await redisClient.get('blogs')))
  data[blog._id] = blog
  redisClient.set('blogs', JSON.stringify(data))
}

const getBlogsFromRedis = async () => {

  try {
    let response = JSON.parse((await redisClient.get('blogs')))

    console.log('response', response)
  
    if (response) return Object.entries(response).map(([key, value]) => value)
  
    return cachAllBlogsAndReturnThem()
  } catch (error) {
    throw error
  }

}

const getSingleBlogFromRedis = async _id => {

  let blogs = JSON.parse((await redisClient.get('blogs')))

  console.log(blogs)

  if (blogs[_id]) return blogs[_id]

  const thisBlog = await Blog.findById(_id)

  if (!thisBlog) throw new Error('bad request')

  writeSingleBlogOnRedis(thisBlog)

  return thisBlog
  
}

const cachAllBlogsAndReturnThem = async () => {
  const allblogs = await Blog.find({})

  if (isArrayEmpty(allblogs)) throw new Error('no data to catch')
  
  const data = {}

  allblogs.forEach(item => data[item._id] = item)

  return allblogs

}

export default {
  writeSingleBlogOnRedis,
  getBlogsFromRedis,
  getSingleBlogFromRedis
}