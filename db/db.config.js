const {Sequelize}=require("sequelize")
//it is a constructor we can use it by instantiating it
require("dotenv").config();
//create instance
const sequelize=new Sequelize(
    process.env.DB_NAME,
    //"new","wal","WESTAGILELABS2023",
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host:'localhost',
        dialect:"mysql"
    }
);
//create tables for all models
sequelize.sync();
//export
module.exports=sequelize;