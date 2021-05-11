const express = require('express')
const path = require('path')
const app = express()
const dotenv = require('dotenv')
dotenv.config({
    path: __dirname + '/.env'
})

const port = process.env.PORT || 3070
const movieRouter = require('./movies/movies.router')

app.use(movieRouter)

app.listen(port, () => {
    console.log('Server listening on port ' + port)
})
