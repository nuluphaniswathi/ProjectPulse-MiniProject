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

//establlishing db connection using sequelize
sequelize.authenticate()
.then(()=>console.log("DB conection is suceess"))
.catch(err=>console.log("err in DB connection",err))



//importing userapi,superadminapp,adminapp,gdoheadapp.projectmanagerapp
const userApp=require("./routes/users.route")
const SuperadminApp=require("./routes/superadmin.route")
const adminApp=require("./routes/admin.route")
const GdoHeadApp=require("./routes/gdohead.route")
const ProjectManagerApp=require("./routes/projectmanager.route")


//middlewares for route
app.use("/user-api",userApp);
app.use("/admin-api",adminApp);
app.use("/gdoHead-api",GdoHeadApp);
app.use("/project-manager-api",ProjectManagerApp)
app.use("/superadmin-api",SuperadminApp)




//invalid path middleware
app.use("*",(req,res,next)=>{
    res.send({message:"invalid path"})
})

//default errror handling middleware
app.use((err,req,res,next)=>{

    res.send({"errMsg":err.message});
})

