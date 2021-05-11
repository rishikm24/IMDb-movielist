const axios = require('axios')
const $ = require('cheerio');
const { IMDB_BASE_URL } = require('../common/constants')

exports.getMovies = async (actor, N, M) => {
    try {
        let data
        try {
            data = await axios.get(`${IMDB_BASE_URL}/chart/top`)
        } catch (err) {
            throw err
        }
        let movieDataArr = []
        for (let i = 0; i < N; i++) {
            let movieUrl = IMDB_BASE_URL + $('td.titleColumn > a', data.data)[i].attribs.href
            let movieData = axios.get(movieUrl)
            movieDataArr.push(movieData)
        }
        let actors = {}
        try {
            movieDataArr = await Promise.all(movieDataArr)
        } catch (err) {
            throw err
        }
        for (let i = 0; i < N; i++) {
            let movieName = $('div.title_wrapper > h1', movieDataArr[i].data)[0].childNodes[0].data.trim()
            let castList = $('table.cast_list > tbody > tr', movieDataArr[i].data)
            for (let j = 1; j < castList.length; j++) {
                let type = j % 2 == 0 ? "even" : "odd"
                let actorName = $(`table.cast_list > tbody > tr`, movieDataArr[i].data)[j].children[3].children[1].children[0].data.trim()
                if (!actors[actorName]) {
                    actors[actorName] = []
                }
                actors[actorName].push(movieName)
            }
        }
        let output = []
        if (actors[actor]) {
            output = actors[actor].slice(0, M)
        }
        return { movies: output }
    } catch (err) {
        console.log(err)
        throw err
    }
}