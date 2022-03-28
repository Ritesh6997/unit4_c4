const express=require("express");
const router=express.Router();
const Todo=require("../model/todoModel");
const authentication=require("../middleware/authentication");

router.get("",async(req,res)=>{
    try {
        const todo= await Todo.find().lean().exec();
        return res.status(200).send(todo)
    } catch (error) {
        return res.status(500).send({message:message.error});
    }
});

router.post("",authentication, async(req,res)=>{
           req.body.user_id = req.userID;
    try {
        const todo=await Todo.create(req.body);
        return res.status(201).send(todo);
    } catch (error) {
        return res.status(500).send({message:message.error});  
    }
})

router.get("/:id",authentication, async(req,res)=>{
    try {
        const todo= await Todo.findById(req.params.id).lean().exec();
        return res.status(200).send(todo)
    } catch (error) {
        return res.status(500).send({message:message.error});
    }
});

router.post("/:id",authentication, async(req,res)=>{
            req.body.user_id = req.userID;
    try {
        
        const todo=await Todo.findByIdAndUpdate(req.params.id,req.body);
        return res.status(201).send(todo);
    } catch (error) {
        return res.status(500).send({message:message.error});  
    }
});

router.delete("/:id",authentication, async(req,res)=>{
    try {
        const todo= await Todo.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(todo)
    } catch (error) {
        return res.status(500).send({message:message.error});
    }
});

module.exports=router;