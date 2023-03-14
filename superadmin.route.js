//import express module
const exp=require("express");

//creating express mini router
const SuperadminApp=exp.Router();

//import super admin middleware
const verifyToken=require("../middleware/superadmin.middleware");

//import superadmin controller
const{assignRole,UserData,UserDataRoleNull}=require("../controllers/superadmin.controller")

//bodyparser
SuperadminApp.use(exp.json());

//route for assigning role to users by super admin
SuperadminApp.put("/user/role",verifyToken,assignRole);

//route for getting all users data by super admin
SuperadminApp.get("/users",UserData);

//route for getting users data whose role assigned to null by super admin
SuperadminApp.get("/users/role",UserDataRoleNull)


//default export for superadminapp
module.exports=SuperadminApp
