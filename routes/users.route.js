//import express module
const exp=require("express");
//creating express mini router
const userApp=exp.Router();
//importing verify token
let verifyToken=require('../middleware/verifyToken');
//bodyparser
userApp.use(exp.json())
//importing controllers
const {register,login,assignRole}=require("../controllers/user.controller")
//create routes using get,post,put
//testApp.get("/test",);


//register the user
userApp.post("/register",register);
//login user
userApp.post("/login",login);
//asign role
userApp.put("/user/role",verifyToken,assignRole)
//export testapp
module.exports=userApp