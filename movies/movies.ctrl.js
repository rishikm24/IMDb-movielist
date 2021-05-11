const { StatusCodes } = require('http-status-codes')
const movieService = require('./movies.service')

exports.getMoviesByActor = async (req, res, next) => {
    try {
        const movieCount = Number(req.query.movieCount)
        const actorName = req.query.actorName
        const totalMovies = Number(req.query.totalMovies)
        if (!movieCount || !actorName || !totalMovies) {
            return res.status(StatusCodes.BAD_REQUEST).send({ success: false, msg: 'Params missing' })
        }
        if (typeof movieCount !== 'number' || typeof totalMovies !== 'number') {
            return res.status(StatusCodes.BAD_REQUEST).send({ success: false, msg: 'Count must be a number' })
        }
        if (totalMovies < movieCount) {
            return res.status(StatusCodes.BAD_REQUEST).send({ success: false, msg: 'Total movies must be greater than movie count' })
        }
        const movies = await movieService.getMovies(actorName, totalMovies, movieCount)
        return res.status(StatusCodes.OK).send({ success: true, data: movies })
    } catch (err) {
        console.log(err)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false, msg: 'Error fetching top movies' })
    }
}