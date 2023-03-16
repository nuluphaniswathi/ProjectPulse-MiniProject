//import app
const app=require("./server")
//creating to port number
const port=process.env.PORT||4000;
app.listen(port,()=>console.log("port is running on 4000"));