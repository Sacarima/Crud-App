console.log("this is a test!")

const express = require('express')
const bodyParser = require('body-parser')
//const { default: mongoose } = require('mongoose')
const MongoClient = require('mongodb').MongoClient
const app = express()
const connectionString = 'mongodb+srv://joaosacarima:GjzhdFRj31UK24MV@cluster0.lczev2f.mongodb.net/Node-API?retryWrites=true&w=majority'

//mongoose.connect(connectionString, {useUnifiedTopology: true} )
MongoClient.connect(connectionString, {useUnifiedTopology: true} )
.then(client => {
    console.log('Connected to MongoDB')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')
    app.use(bodyParser.urlencoded({extended: true}))
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html')
    })
    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
        .then(result => {
            console.log(result)
            res.redirect('/')
        })
        
        .catch(error => console.error(error))
    })
    app.listen(3000, function() {
        console.log('listening....')
    })
      

})






 




