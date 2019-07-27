const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const appList = require('./appList.js')

const app = express()
app.use(morgan('combined'))
app.use(cors())

app.get('/apps', (req, res) => {
    const { sort, genre } = req.query
    let results = appList
    if(sort){
        if(!['Rating', 'App'].includes(sort)){
            res.status(400).send('Sort must be one of app or rating')
        }
        results.sort((a,b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0
        })
    }
    if(genre){
        if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genre)){
            res.status(400).send('Genre must be selected from list')
        }
        results = appList.filter(appItem => appItem['Genres'] === genre)
    }
    res.json(results)
})

module.exports = app