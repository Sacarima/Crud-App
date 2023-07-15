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
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(express.static('public'))
    app.use(bodyParser.json())
    
    app.get('/', (req, res) => {
        quotesCollection.find().toArray()
            .then(results => {
                console.log(results)
                res.render('index.ejs', {quotes: results})
            })
            .catch(error => console.error(error))
    })
    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
        .then(result => {
            console.log(result)
            res.redirect('/')
        })
        
        .catch(error => console.error(error))
    })
    app.put('quotes', (req, res) => {
        console.log(req.body)
    })
    app.listen(3000, function() {
        console.log('listening....')
    })
})
.catch(error => console.error(error))

//Yoda: Do or do not, there is no try.




 




