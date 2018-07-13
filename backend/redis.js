import redis from 'redis'

const host = 'spotify_redis';
const port = 6379;

class Database {
  constructor() {
    const client = redis.createClient(port, host)

    client.on('connect', () => {
      console.log(':: Redis client connected')
    })

    client.on('error', (err) => {
        console.log(':: Something went wrong ' + err)
    })

    return client
  }
}

module.exports = new Database()
