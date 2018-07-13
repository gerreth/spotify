import express from 'express';
import request from 'request';

import client from '../redis';

const router = express.Router()
// GET home page
router.get('/', (req, res) => {
  res.send('respond with a resource');
})
router.get('/festivals', (req, res) => {
  const min_date = '2018-07-07'
  const max_date = '2018-09-30'
  const type = 'festival'

  const cities = {
    Barcelona: '28714',
    Budapest: '29047',
    Hamburg: '28498',
    Lissabon: '31802',
    London: '24426',
    Madrid: '28755',
    Manchester: '24475',
    Matlock: '24517',
    Paris: '28909',
    SaintMalo: '28922',
  }

  const base_url = 'https://api.songkick.com/api/3.0'
  const api_key = 'VNvgkjz2uCB5y2G6'

  const promises = Object.keys(cities).map(key => {
    let page = 1

    const id = cities[key]
    const url = `${base_url}/events.json?apikey=${api_key}&location=sk:${id}&page=${page}&min_date=${min_date}&max_date=${max_date}&type=${type}`

    return new Promise((resolve, reject) => {
      client.get(url, (error, result) => {
        resolve(JSON.parse(result))
      })
    }).then(result => {
      if (result) {
        console.log('From Cache')
        return result
      } else {
        console.log('From API')
        return new Promise((resolve, reject) => {
          request({ url }, (error, response, body) => {
            body = JSON.parse(body)
            if(error || body.resultsPage.status !== 'ok') {
              reject(response)
            } else {
              client.set(url, JSON.stringify(body))
              client.expire(url, 24*60*60);
            }

            resolve(body)
          })
        })
      }
    })
  })

  Promise.all(promises).then(results => {

    const festivals = results
      .reduce((carry, result) => [...carry, ...result.resultsPage.results.event], [])
      .reduce((carry, festival) => {
        // Account for possible duplicates
        const exists = carry.filter(_ => _.name === festival.displayName)

        let result = {}

        result.name = festival.displayName
        result.date = {
          start: festival.start.date,
          end: festival.end.date,
        }
        result.location = festival.location.city
        // If duplicate found, merge artists
        result.artists = (exists.length > 0) ? [...exists[0].artists, ...festival.performance.map(artist => artist.displayName)] : festival.performance.map(artist => artist.displayName)

        return [...carry.filter(_ => _.name !== festival.displayName), result]
      }, [])

    res.send(festivals)
  }).catch(error => {
    console.log(error)
  })

})

module.exports = router
