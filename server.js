// server.js
// where your node app starts

// init project
const express = require('express')
const app = express()
const port = process.env.PORT || 5000

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors')
app.use(cors({ optionSuccessStatus: 200 }))  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html')
})


// your first API endpoint... 
app.get('/api/hello', function (req, res) {
    res.json({ greeting: 'hello API' })
})

app.get('/api/timestamp', (req, res) => {
    let date = new Date()
    res.send({
        unix: date.getTime(),
        utc: date.toUTCString()
    })

})

app.get('/api/timestamp/:date', (req, res) => {
    let date = new Date(req.params.date)
    if (isNaN(date.getTime())) {
        res.json({ "error" : "Invalid Date" })
    } else {
        res.send({
            unix: date.getTime(),
            utc: date.toUTCString()
        })
    }
})

// listen for requests :)
const listener = app.listen(port, function () {
    console.log(`Your app is listening on port ${port}.`)
})