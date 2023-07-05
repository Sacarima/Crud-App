console.log("this is a test!")

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://joaoaleixo:WWWiMRUtTKX5LhU7@sacarima.sxxpohm.mongodb.net/'


MongoClient.connect(connectionString, (err, client) => {
    if(err) return console.error(err)
        console.log('Connected to DataBase')
})
app.use(bodyParser.urlencoded({extended: true}))

app.listen(3000, function() {
    console.log('listening....')
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/quotes', (req, rep) => {
    console.log(req.body)
})