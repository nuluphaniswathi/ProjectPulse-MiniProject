//importing sequelize from db
const sequelize=require("../db.config");
//importing datatypes from sequelize
const {DataTypes}=require("sequelize");
//creating project model
exports.ProjectModel=sequelize.define("projects",{
    project_id:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    project_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    client:{
        type:DataTypes.STRING,
        allowNull:false
    },
    client_account_manager:{
        type:DataTypes.STRING,
        allowNull:false
    },
    status_of_project:{
        type:DataTypes.STRING,
        allowNull:false
    },
    project_start_date:{
        type:DataTypes.DATE,
        allowNull:false
    },
    project_end_date:{
        type:DataTypes.DATE,
        allowNull:false
    },
    overall_project_fitness_indicator:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Domain:{
        type:DataTypes.STRING,
        allowNull:false
    },
    type_of_project:{
        type:DataTypes.STRING,
        allowNull:false
    },
    team_size:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    GdoHeadEmail:{
        type:DataTypes.STRING,
        allowNull:false 
    },
    project_Manager_Email:{
        type:DataTypes.STRING,
        allowNull:false 

    }


},{
    timestamps:false,
    freezeTableName:true
})
