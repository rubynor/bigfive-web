const bodyParser = require('body-parser')
const app = require('express')()
const saveRoute = require('./save')
const pingRoute = require('./ping')
const resultRoute = require('./result')
const compareRoute = require('./compare')

app.use(bodyParser.json())
app.post('/save', saveRoute)
app.get('/ping', pingRoute)
app.all(['/result/:id', '/result/:id/:lang'], resultRoute)
app.get('/compare/:id', compareRoute)

module.exports = app