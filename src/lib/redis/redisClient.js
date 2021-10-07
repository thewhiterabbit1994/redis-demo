import redis from 'redis'

import { promisify } from "util"

const client = redis.createClient();

client.get = promisify(client.get)

// do not import this outside the redis folder
export default client