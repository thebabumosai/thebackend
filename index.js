const express = require('express')
const app = express()
const port = 3000
require('dotenv').config()
const ms = require('ms')


let pujoList = require("./pujos.json")
function refetchPujoList(){
  let url = `${process.env.NICO_URL}?offset=0&limit=1000&where=&viewId=vw092rsggz6pkjsy&fields=name,lat,lon,address,city,zone,id,created_at,updated_at`;

    let options = {
      method: 'GET',
      headers: {
        'xc-token': process.env.NICO_TOKEN 
      }
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => pujoList = { 
        result: json.list, 
        "message": "Pujo list successfully fetched", 
        "status": "success",
        "lastRefresh": Date.now()
      })
    .catch (err => console.error('error:' + err));
    return 1
}

setInterval(()=>refetchPujoList(), ms('2hr'))

app.get('/pujo/list', async (req, res) => {
  res.json(pujoList)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
