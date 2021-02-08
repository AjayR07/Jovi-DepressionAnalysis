const question=require('../models/question.js')

async function getQuestion(req,res,next){
    let ques
    try{
        ques=await question.find({"id":req.params.id})
        if(ques==null)
            return res.status(404).json({message: 'Cannot find Question'})
    }catch(err){
        return res.status(500).json({message:err.message})
    }
    res.question=ques
    next()
}
module.exports=getQuestion