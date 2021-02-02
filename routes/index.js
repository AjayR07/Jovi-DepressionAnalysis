const express=require('express')
const router=express.Router()
const jovi=require('../models/jovi.js')
const getUser=require('../middleware/getUser')

// Getting all
router.get('/',async (req,res)=>{
    try{
        const allUsers=await jovi.find()
        res.json(allUsers)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }

})
// Getting One
router.get('/:id',getUser,(req,res)=>{
    res.json(res.user)
})
// Creating one
router.post('/',async (req,res)=>{
    const user=new jovi({
        name: req.body.name,
        age: req.body.age
    })
    try{
        const newUser=await user.save()
        res.status(201).json(newUser)
    }
    catch(err){
        res.status(400).json({message:err.message})
    }

})
// Updating One
router.patch('/:id',getUser,async (req,res)=>{
    if(req.body.name!=null){
        res.user.name=req.body.name
    }
    if(req.body.age!=null){
        res.user.age=req.body.age
    }
    try{
        const updatedUser=await res.user.save()
        res.json(updatedUser)
    }catch (e) {
        res.status(400).json({message:e.message})
    }
})
// Deleting one
router.delete('/:id',getUser,async (req,res)=>{
    try{
        await res.user.remove()
        res.status(204).json({message:'User Deleted Successfully'})
    }catch(err){
        res.status(500).json({message:err.message})
    }
})


module.exports = router