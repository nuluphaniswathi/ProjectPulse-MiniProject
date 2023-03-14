//import express async handler
const expressAsyncHandler=require("express-async-handler");
//importing sequelize from db.config
const sequelize=require("../db/db.config");
//import bcryptjs
const bcryptjs=require("bcryptjs");
//importing jwt
const jwt=require("jsonwebtoken");

//import project model
const {ProjectModel}=require("../db/models/project.model")

//import  project updates model
const {project_updatesModel}=require("../db/models/project_updates.model");

//import projectconcerns model
const {project_concernsModel}=require("../db/models/project_concerns.model");


//import op and date from sequelize
const {Op,DATE}=require("sequelize");

//creating association between projectmodel and project updates model
ProjectModel.project_updatesModel=ProjectModel.hasMany(project_updatesModel,
    {
        foreignKey:"project_id",
        onDelete: 'CASCADE',
        onUpdate:'CASCADE'
    })


//creating association between project model and project concerns model
ProjectModel.project_concernsModel=ProjectModel.hasMany(project_concernsModel,{
    foreignKey:"project_id",
    onDelete: 'CASCADE',
    onUpdate:'CASCADE'

})

//configure dotenv
require("dotenv").config();

//import nodemailer
const nodemailer = require('nodemailer');
//create connection to smtp
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE_PROVIDER,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD // app password
  }
})



//update project by project manager
exports.projectUpdate=expressAsyncHandler(async(req,res)=>{
    //insert data into projects updates model
    await project_updatesModel.create(req.body);
    res.status(200).send({message:"project update created"})

})

//raise project concern
exports.raiseprojectconcern=expressAsyncHandler(async(req,res)=>{
    
    let project=await ProjectModel.findOne({where:{project_id:req.params.projectId}});
    console.log(project);
    let gdoheademail=project.dataValues.GdoHeadEmail;
    //let gdoheademail=await ProjectModel.findOne({where:{project_id:req.params.projectId}})
    if(project==undefined){
        res.status(204).send({message:"no project to raise the project concern"})
    }
    else{
    //draft mail
    let mailOptions = {
        from: "miniprojectpulsebackend@gmail.com",
        to: [gdoheademail,"sashi@westagilelabs.com","pramod@westagilelabs.com","varun@westagilelabs.com"],
        subject: `Project concern is raised for project ${req.body.project_id} by ${req.body.raised_by}`,
        text: `Hello Admin,
         A project concern is raised for the above project and the concern description is: ${req.body.concern_desc}
         severity of project concern:${req.body.severity} `,
      };
      //send email
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
   
    
    //insert data into project concerns model
    await project_concernsModel.create(req.body);
    //send response
    res.status(200).send({message:"project concern raised"});
    }
})

//get all projects under projectmanager
exports.getProject=expressAsyncHandler(async(req,res)=>{
    let ProjectManagerEmail=req.params.ProjectManagerEmail;
    let projectRecord=await ProjectModel.findOne({where:{project_Manager_Email:ProjectManagerEmail}},
        {
            include:[
                {
                    association:ProjectModel.project_updatesModel
                },
                {
                    association:ProjectModel.project_concernsModel
                },
                {
                    association:ProjectModel.team_CompositionModel
                }
        ]
        })
    res.status(200).send({message:"project details under specific project manager ",payload:projectRecord});
})

//project manager can update the projectupdate details
exports.updateProjectUpdate=expressAsyncHandler(async(req,res)=>{
    //query to check whether the project under projectmanager exists or not
    let checkproject=await ProjectModel.findOne({where:{project_id:req.body.project_id ,
        project_Manager_Email:req.params.ProjectManagerEmail}});
    if(checkproject==undefined){
        res.status(204).send({message:"project is not existed to update by projectmanager"})
    }
    else{
        await project_updatesModel.update(req.body,{where:{project_id:req.body.project_id}})
        res.status(200).send({message:"projectupdates updated by projectmanager"})
    }
})


//project manager can delete project update details
exports.deleteProjectUpdates=expressAsyncHandler(async(req,res)=>{
    //query to check project with the given id has project updates or not
    let checkproject=await project_updatesModel.findOne({where:{project_id:req.params.projectId}});
    if(checkproject==undefined){
        res.status(204).send({message:"projectupdate not existed to delete "})
    }
    else{
        await project_updatesModel.destroy({where:{project_id:req.params.projectId}})
        res.status(200).send({message:"project updates deleted by project manager"})
    }

})

//last two weeks updates
exports.lastTwoWeeksUpdates=expressAsyncHandler(async(req,res)=>{
    //today date
    let todayDate=new Date();
    //create object to store the date of the day before two weeks
    let dateBeforeTwoWeeks=new Date();
    //assign date of the date of the day before two weeks
    dateBeforeTwoWeeks.setDate(todayDate.getDate()-14);
    //get projectupdates
    let projectupdates=await project_updatesModel.findAll({where:{
      project_id:req.params.projectId,
      Date:{
        [Op.between]:[dateBeforeTwoWeeks,todayDate]
      }
    }})
    res.status(200).send({message:"last two weeks updates details",payload:projectupdates})
  })

