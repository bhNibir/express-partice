const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())

const names = ["Babu", "Nibir", "Biplob", "Hasan"]


app.get('/user/:id', (req, res) => {
    const id = req.params.id
    res.send({id , name:names[id]})
})

app.post('/adduser', (req,res) => {
    console.log(req.body);
    res.send(req.body)
    
})
app.listen(port, () => {console.log(`App listening ${port}`)})