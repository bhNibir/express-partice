const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;

const dbUser = "dbUser"
const dbPass = "8pIFwdHON3Olrb1z"
const uri = "mongodb+srv://dbUser:8pIFwdHON3Olrb1z@cluster0-gyjtn.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

app.use(cors())
app.use(bodyParser.json())

const names = ["Babu", "Nibir", "Biplob", "Hasan"]







app.get('/user/:id', (req, res) => {
    const id = req.params.id
    res.send({id , name:names[id]})
})

app.post('/addProduct', (req,res) => {
    const product = req.body
    console.log(product)
    client.connect(err => {
        const collection = client.db("commerce").collection("products");
          collection.insertOne(product,(err, res) => {
              console.log("add data", res);
          })
          
        client.close();
      });
    
})
app.listen(port, () => {console.log(`App listening ${port}`)})