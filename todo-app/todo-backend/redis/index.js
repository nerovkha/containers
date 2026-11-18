const redis = require('redis')
const { REDIS_URL } = require('../util/config')

let set
let get

if (!REDIS_URL) {
  const redisIsDisabled = () => {
    console.log('No REDIS_URL set, Redis is disabled')
    return null
  }
  set = redisIsDisabled
  get = redisIsDisabled
  getAsync = async () => '0'
  setAsync = redisIsDisabled
} else {
  let client = redis.createClient({
    url: REDIS_URL
  })

  client.on('error', (err) => console.log('Redis Client Error', err))
  
  client.connect().then(() => {
    console.log('Connected to Redis')
  })
    
  get = (...args) => client.get(...args)
  set = (...args) => client.set(...args)

  getAsync = async (...args) => {
    const value = await client.get(...args)
    return value === null ? '0' : value
  }
  setAsync = async (...args) => {
    await client.set(...args)
  }
}

module.exports = {
  get,
  set,
  getAsync,
  setAsync,
}
