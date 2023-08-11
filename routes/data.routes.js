const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticator } = require('../middlewares/authenticator');
const { DataModel } = require('../models/DataModel');

const dataRouter = express.Router();
dataRouter.use(authenticator);
dataRouter.get('/', async (req, res) => {
   let token = req.headers.authorization
   jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
         if(err) return res.send({message: "Token not valid please login" + err, status: 0})
         if(decode) {
              let data = await DataModel.find({user: decode.userId})
              res.send({
                message: "Data fetched successfully",
                data: data,
                status: 1,
              })
         }else{
              res.send({
                message: "Invalid token",
                status: 2,
              })
         }
   })
})
dataRouter.post('/create', async (req, res) => {
    try {
        let data = new DataModel(req.body)
        await data.save()
        res.send({
            message: "Data created successfully",
            status: 1,
        })
    } catch (error) {
        res.send({
            message: error.message,
            status: 0
        })
    }  
})
dataRouter.patch("/",async(req,res)=>{
    let {id} = req.headers
    try{
        await DataModel.findByIdAndUpdate({_id:id},req.body);
        res.send({
            message:"Data updated successfully",
            status:1
        })
    }catch(error){
        res.send({
            message:error.message,
            status:0
        })
    }
})
dataRouter.delete("/",async(req,res)=>{
    let {id} = req.headers
    try{
        await DataModel.findByIdAndDelete({_id:id})
        res.send({
            message:"Data deleted successfully",
            status:1
        })
    }catch(error){
        res.send({
            message:error.message,
            status:0
        })
    }
})
module.exports = {
    dataRouter,
}