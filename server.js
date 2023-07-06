console.log("this is a test!")

const express = require('express')
const bodyParser = require('body-parser')
const { default: mongoose } = require('mongoose')
const app = express()
//const mongoose = require('mongoose')
//const MongoClient = require('mongodb').MongoClient
//const connectionString = 'mongodb+srv://joaosacarima:GjzhdFRj31UK24MV@cluster0.lczev2f.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect('mongodb+srv://joaosacarima:GjzhdFRj31UK24MV@cluster0.lczev2f.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(()=> {
    console.log('connected to MongoDB')
}).catch(() => {
    console.log('error')
})
// MongoClient.connect(connectionString, (err, client) => {
//     if (err) return console.error(err)
//         console.log('Connected to DataBase')
// })
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

