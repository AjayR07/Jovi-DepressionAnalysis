const mongoose=require('mongoose')

const joviSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    age:{
        type:Number,
        required: true
    },
})

module.exports=mongoose.model('jovi',joviSchema)