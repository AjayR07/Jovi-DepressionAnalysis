const mongoose=require('mongoose')

const scaleSchema = new mongoose.Schema({
    id:{
        type:Number
    },
    name:{
        type:String
    },
    length:{
        type:Number
    },
})

module.exports=mongoose.model('scale',scaleSchema)