const mongoose=require('mongoose')

const questionSchema = new mongoose.Schema({
    id:{
        type:Number
    },
    name:{
        type:String
    },
    questions:{
        type:Map
    },
    result:{
        type:Map
    },
    total_count:{
        type:Number
    },
})

module.exports=mongoose.model('question',questionSchema)