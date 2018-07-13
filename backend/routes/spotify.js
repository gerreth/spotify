import express from 'express';
import request from 'request';

import client from '../redis';
import spotifyApiMe from '../services/spotifyApiMe';
import spotifyTopBands from '../services/spotifyTopBands';

const router = express.Router();

function convert(result) {
  return result.map(band => {
    return new spotifyTopBands(band).convert()
  }).filter(_ => _ !== undefined)
}

router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

/*
 * Get related bands
 */
router.get('/similar-bands', (req, res, next) => {
  const ids = req.query.ids.split('-')
  const token = req.query.token

  // Check for all ids, if the request is cached, then return promise witch cached or api request
  const promises = ids.map(id => {
    const url = `https://api.spotify.com/v1/artists/${id}/related-artists`

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
        return new spotifyApiMe({ token, url }).request().then((body) => {
          client.set(url, JSON.stringify(body))
          client.expire(url, 7*24*60*60);

          return body
        }).catch(error => {
          console.log(error)
        })
      }
    })
  })

  // Resolve all promises (Could hit API limit...)
  Promise.all(promises).then(results => {
    const artists = results
      .reduce((carry, result) => [...carry, ...result.artists], [])
      .reduce((carry, artist) => {
        const exists = carry.filter(_ => _.id === artist.id)
        // Increment similarCount if artist found in array
        artist.similarCount = (exists.length > 0) ? exists[0].similarCount + 1 : 1

        return [...carry.filter(_ => _.id !== artist.id), artist]
      }, [])

    return res.send(convert(artists));
  }).catch(error => {
    console.log(error)
  })
})

/*
 * Get top bands for user
 */
router.get('/top-bands', (req, res, next) => {
  const url = req.query.url
  const token = req.query.token

  new Promise(resolve => {
    client.get(url, (error, result) => {
      resolve(result)
    })
  }).then(result => {
    if (result) {
      result = JSON.parse(result).items
      return res.send(convert(result));
    } else {
      new spotifyApiMe({ token, url }).request().then((body) => {
        client.set(url, JSON.stringify(body))
        client.expire(url, 24*60*60);

        result = JSON.parse(body).items
        return res.send(convert(result));
      }).catch(error => {
        console.log(error)
      })
    }
  }).catch(error => {
    console.log(error)
  })
});

module.exports = router;
