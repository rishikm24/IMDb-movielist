const express = require('express')
const router = express.Router({ mergeParams: true })
const movieCtrl = require('./movies.ctrl')

router.get('/topMovies', movieCtrl.getMoviesByActor)

module.exports = router