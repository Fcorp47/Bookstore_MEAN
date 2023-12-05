const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static(__dirname))
const mongoose = require('mongoose')



mongoose.connect('mongodb://localhost:27017/admin')
const db = mongoose.connection
//const db = mongoose.connections
db.on('connected', () => {
    console.log('MongoDb Connected')
})


const userSchema = new mongoose.Schema({
    bookID: String,
    bookName: String,
    authorName: String,
    bookPrice: Number,
    image: String,
    description:String,
    noofpages:Number,
})

const user = mongoose.model('user', userSchema, "users")

app.get('/api/getUserData', (req, res) => {
    user.find().then((data) => {
        res.json(data)
    })
})
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/api/addUser', (req, res) => {
    user.create({
        bookID: req.body.bookID,
        bookName: req.body.bookName,
        authorName: req.body.authorName,
        bookPrice: req.body.bookPrice,
        description: req.body.description,
        noofpages: req.body.noofpages,    
    }).then((newData) => {
        res.json(newData)
    })
})

app.delete('/api/delete/:id', (req, res) => {
    let id = req.params.id
    user.deleteOne({ bookID: id }).then((data) => {
        res.json(data)
    })
})

app.put('/api/update/:id', (req, res) => {
    let id = req.params.id
    let updateItemData = req.body
    user.updateOne({ bookID: id }, updateItemData).then((data) => {
        res.json(data)
    })
})

app.listen(565, () => {
    console.log('Server Started on port 565')
    console.log('http://localhost:565/api/getUserData')
    console.log('http://localhost:565')

})


