const express = require('express')
require('dotenv').config()
const app = express()
const port = 3000
const cors = require('cors')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;

const uri = process.env.DB_PATH
let client = new MongoClient(uri, { useNewUrlParser: true });

app.use(cors())
app.use(bodyParser.json())

const names = ["Babu", "Nibir", "Biplob", "Hasan"]

app.get('/product' , (req,res) => {
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("commerce").collection("products");
          collection.find({name:'Phone'}).limit(5).toArray((err, documents) => {
             if(err){
                 console.log(err);
                 res.status(500).send({message:err})
                 
             }
             else{
                 res.send(documents)
             }
          })
          
        client.close();
      });
})





app.get('/user/:id', (req, res) => {
    const id = req.params.id
    res.send({id , name:names[id]})
})

app.post('/addProduct', (req,res) => {
    const product = req.body

    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("commerce").collection("products");
          collection.insertOne(product,(err, result) => {
             if(err){
                 console.log(err);
                 res.status(500).send({message:err})
                 
             }
             else{
                 res.send(result.ops[0])
             }
          })
          
        client.close();
      });
    
})

app.listen(port, () => {console.log(`App listening ${port}`)})