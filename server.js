const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://alinainch:Veggie123@cluster0.olzdjfg.mongodb.net/personalExpressNoAuthi?retryWrites=true&w=majority";
const dbName = "personalExpressNoAuthi";

app.listen(4400, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('chats').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {info: result})
  })
})

app.post('/info', (req, res) => {
  db.collection('chats').insertOne({name: req.body.name, email: req.body.email, profession: req.body.profession, connected: '', date: req.body.date, time: req.body.time}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/info', (req, res) => {
  db.collection('chats')
  .findOneAndUpdate({name: req.body.name, email: req.body.email}, {
    $set: {
      connected: 'You have booked a coffee chat!'
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/info', (req, res) => {
  db.collection('chats').findOneAndDelete({name: req.body.name, email: req.body.email}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Coffee chat deleted!')
  })
})
