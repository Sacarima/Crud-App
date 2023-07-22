console.log("this is a test!")

const express = require('express')
const bodyParser = require('body-parser')
//const { default: mongoose } = require('mongoose')
const MongoClient = require('mongodb').MongoClient
const app = express()
const connectionString = 'mongodb+srv://joaosacarima:GjzhdFRj31UK24MV@cluster0.lczev2f.mongodb.net/Node-API?retryWrites=true&w=majority'


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

    /* UPDATING DATA */

    app.put('/quotes', (req, res) => {
        quotesCollection.findOneAndUpdate(
            { name: 'Joao' },
            {
                $set: {
                name: req.body.name,
                quote: req.body.quote
            }
        },
        {
            upsert: true
        }
        )
        .then(result => {
            console.log(result)
            res.json('Success')
        })
        .catch(error => console.error(error))

    })
    app.delete('/quotes', (req, res) => {
        quotesCollection.deleteOne(
         {name: req.body.name }
        )
        .then(result => {
            if (result.deletedCount === 0) {
                return res.json('No quote to delete')
              }
            res.json("Deleted Darth Vader's quote")
        })
        .catch(error => console.error(error))
    })
    app.listen(4000, function() {
        console.log('listening....')
    })
})
.catch(error => console.error(error))






 




