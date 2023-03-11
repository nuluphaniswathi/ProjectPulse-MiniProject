//import express async handler
const expressAsyncHandler=require("express-async-handler");
//importing sequelize from db.config
const sequelize=require("../db/db.config");
//import bcryptjs
const bcryptjs=require("bcryptjs");
//importing jwt
const jwt=require("jsonwebtoken")
//importing users model
//namedexport
let {UserModel}=require("../db/models/users.model");

//register a user
exports.register=expressAsyncHandler(async(req,res)=>{
    //check if user already existed
    let user=await UserModel.findOne({where:{email:req.body.email}})
    console.log(user);
    if(user!=null){
        res.send({message:"user already registered or existed"})
    }
    else{
        let {password}=req.body
        let newPassword=await bcryptjs.hash(password,5)
        console.log("password:",newPassword);
        req.body.password=newPassword
        await UserModel.create(req.body)
        res.send({message:"User registered"})
    }
})

//user login
exports.login=expressAsyncHandler(async(req,res)=>{
    //check if email exist
    let {email,password}=req.body;
    let user=await UserModel.findOne({where:{email:email}})
    console.log(user);
    if(user==null){
        res.send({message:"Invalid email"})
    }
    else{
    //verify password
    console.log(password);
   console.log(user.password);
    let result=await bcryptjs.compare(password,user.password)
    if(result==false){
        res.send({message:"Invalid password"})
    }
    else{
        //if role not assigned
        if(user.role==null){
            res.send({message:"Unauthorized access..Please contact your super admin for role assignment"})

        }
        //if role is assigned
        else{
            //create jwt token and send to client
            let signedToken=jwt.sign({role:user.role},process.env.SECRET_KEY||"",{expiresIn:"5h"})
            //remove password
            delete user.password
            //send jwt response
            res.status(200).send({message:"Login success",token:signedToken,user:user})
        }
    }
    }

})

//assigning role to users
exports.assignRole=expressAsyncHandler(async(req,res)=>{
    //check if the user exists
    let user=await UserModel.findOne({where:{email:req.body.email}})
    if(user==null){
        res.send({message:"user do not exist"})
    }
    else{
        await UserModel.update({role:req.body.role},{where:{email:req.body.email}})
        res.send({message:"Role is assigned for user"})
    }
})