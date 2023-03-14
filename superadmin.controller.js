//import express async handler
const expressAsyncHandler=require("express-async-handler");
//importing sequelize from db.config
const sequelize=require("../db/db.config");

//import usermodel
let {UserModel}=require("../db/models/users.model");


//assigning role to users
exports.assignRole=expressAsyncHandler(async(req,res)=>{
    //check if the user exists
    let user=await UserModel.findOne({where:{email:req.body.email}})
    if(user==null){
        res.status(404).send({message:"user do not exist"})
    }
    else{
        //check if user already has role
        if(user.role!=undefined){
            res.status(409).send({message:"User is already assigned with a role"})
        }
        else{
            //assign role to employee with that mail
            await UserModel.update({role:req.body.role},{where:{email:req.body.email}})
            res.status(200).send({message:"Role is assigned for user"})

        }
        
    }
})
//super admin get all the users data
exports.UserData=expressAsyncHandler(async(req,res)=>{
    let Data=await UserModel.findAll();
    res.status(200).send({message:"user data",payload:Data});
})

//super admin get the users whose role is null
exports.UserDataRoleNull=expressAsyncHandler(async(req,res)=>{
    let DataWithNoRole=await UserModel.findOne({where:{role:null}});
    res.status(200).send({message:"users with no role assigned",payload:DataWithNoRole});
})
