//import exp module
const exp=require("express");

//create express mini router app
const ProjectManagerApp=exp.Router();

//import middleware for projectmanager
const verifyToken=require("../middleware/projectmanager.middleware");

//import projectmanager controllers
const {projectUpdate,raiseprojectconcern,getProject,updateProjectUpdate,deleteProjectUpdates,lastTwoWeeksUpdates}=require("../controllers/projectmanager.controller");


//body parser
ProjectManagerApp.use(exp.json());

//create routes


//route for creating projectupdates by project manager
ProjectManagerApp.post("/projectId/:projectId/project-update",verifyToken,projectUpdate)

//route for raising project concern by project manager
ProjectManagerApp.post("/projectId/:projectId/project-concern-raise",verifyToken,raiseprojectconcern)

//route for getting project details under specific project manager
ProjectManagerApp.get("/projects/portfolio-dashboard/projectManagerEmail/:ProjectManagerEmail",verifyToken,getProject)

//route for getting last two weeks updates by project manager
ProjectManagerApp.get("/projectupdate/lasttwoweeks/projectId/:projectId",lastTwoWeeksUpdates);

//route for updating projectupdate details by project manager
ProjectManagerApp.put("/projects/update-projectupdate/projectManagerEmail/:ProjectManagerEmail",verifyToken,updateProjectUpdate)

//route for deleting projectupdates details by project manager
ProjectManagerApp.delete("/projects/delete-projectupdates/projectId/:projectId",verifyToken,deleteProjectUpdates)


//default export of projectmanagerapp
module.exports=ProjectManagerApp
