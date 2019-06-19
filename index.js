const { Parcel } = require('cryptovoxels')
const fetch = require('node-fetch')

const p = new Parcel(52)

const API_URL = 'https://api.coindesk.com/v1/bpi/currentprice.json'

p.fetch()
  .then(() => {
    setInterval(() => {
      fetch(API_URL)
        .then(r => r.json())
        .then(r => {
          let price = r.bpi.USD.rate.replace(/\..+/, '')
          let sign = p.getFeatureById('bitcoin-price')

          sign.set({
            text: `$${price}`,
            fontSize: 50
          })
        })
    }, 5000)

    let port = p.listen()
    console.log(`Listening on port ${port}`)
  })
