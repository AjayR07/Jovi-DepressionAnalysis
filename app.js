let express = require('express')
let app = express();
const mongoose=require('mongoose')
require('dotenv').config()

// Mongo Connection
mongoose.connect('mongodb+srv://JoviDB:Kongu@2020@jovi.v93ye.mongodb.net/Jovi', {useNewUrlParser:true})
const db=mongoose.connection
db.on('error',(error)=>console.log("Error in Mongo"+error))
db.once('open',()=>console.log('Connected to Mongo'))

app.use(express.json())

const myRouter=require('./routes/index')
app.use('/jovi',myRouter)

// app.get('/', (req, res) => res.send('Hello World with Express'));

// Server Creation
app.listen(3000, () => console.log("Running Node on port " + 3000));


