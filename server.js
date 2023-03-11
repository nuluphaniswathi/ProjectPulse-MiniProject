//importing express module
const exp=require("express");

//creating express application
const app=exp();

//import dotenv and configure
require("dotenv").config();

//creating to port number
const port=process.env.PORT||4000;
app.listen(port,()=>console.log("port is running on 4000"));

//bodyparser
app.use(exp.json());

//importing studentApp
//const StudentApp=require("./Routes/student.route")
//app.use("/student-api",StudentApp)

//importing sequelize from db.config.js
const sequelize=require("./db/db.config.js");
//const StudentApp = require("./Routes/student.route.js");

//establlishing db connection using sequelize
sequelize.authenticate()
.then(()=>console.log("DB conection is suceess"))
.catch(err=>console.log("err in DB connection",err))
//body parse
app.use(exp.json());



//importing userapi
const userApp=require("./routes/users.route")
//middleware for route
app.use("/user-api",userApp);
//importing superadmin api
const adminApp=require("./routes/super-admin.route")
//middleware for route
app.use("/admin-api",adminApp)




//invalid path middleware
app.use("*",(req,res,next)=>{
    res.send({message:"invalid path"})
})

//default errror handling middleware
app.use((err,req,res,next)=>{

    res.send({"errMsg":err.message});
})

