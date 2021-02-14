let express = require('express')
let app = express();
const webpush = require('web-push');
const path = require('path');
const mongoose=require('mongoose')
require('dotenv').config()

// Mongo Connection
mongoose.connect('mongodb+srv://JoviDB:Kongu@2020@jovi.v93ye.mongodb.net/Jovi', {useNewUrlParser:true})
const db=mongoose.connection
db.on('error',(error)=>console.log("Error in Mongo"+error))
db.once('open',()=>console.log('Connected to Mongo'))

app.use(express.json())

const publicVapidKey='BCDsTdRO2D_tjjuiVdAu6x5D544mfkiKr0ZAvx-VEPSoxBWxiQyVptgYj0UfZAP1SznJNIVS6wYfyUL7W4osVEI'
const privateVapidKey='YL7cL1x2-dNui6pDEdGVxSp-3lCOexKdbHc7x6vh-BA'

webpush.setVapidDetails('mailto:test@email.com',publicVapidKey,privateVapidKey);


const myRouter=require('./routes/index')
app.use('/jovi',myRouter)

app.post('/subscribe',(req,res)=>{
    console.log("Inside Subscribe");
    // get push subscription object
    const subscription = req.body;

    // Send 201 - resource created
    res.status(201).json({});

    // Create payload
    const payload=JSON.stringify({title:'Push Test'});

    //Pass the object into send notification function
    webpush.sendNotification(subscription,payload).catch(err=>console.log(err));

});
app.get('/', (req, res) => res.send('Hello World with Express'));

// Server Creation
app.listen(3000, () => console.log("Running Node on port " + 3000));


