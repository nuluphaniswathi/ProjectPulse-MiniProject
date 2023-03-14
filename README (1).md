
# Project Pulse

This product will serve as tracking tool for projects and portfolio for each GDO and overall organisation.


## Installation

Install my-project with npm

```bash
  git clone https://github.com/nuluphaniswathi/ProjectPulse-MiniProject.git
```
    
If you download manually extract the zip file.

then run the following command to install all the modules that are used in this project

```bash
    npm install
```
then start the server using below command

```bash
    npm start
```




## Configurations

  create .env file 

  ```bash
PORT=YOUR_PORT NUMBER

DB_NAME=YOUR_DB_NAME

DB_USER=YOUR_DB_USER

DB_HOST=YOUR_DB_HOST

DB_PASSWORD=YOUR_DB_PASSWORD

SECRET_KEY=kalgjadfaderefadcfdafde

EMAIL=YOUR_EMAIL

EMAIL_PASSWORD=YOUR_EMAIL_PASSWORD

EMAIL_SERVICE_PROVIDER=gmail
  ```
create database with name project_pulse and 
create models using sequelize in vs code
The models created are:
1)project
2)team_Composition
3)project_updates
4)project_concerns
5)Employee
6)resourcing_requests



## Overview

This project contains the following roles

```bash
a.GDO Head
b.Project Manager
c.HR Manager
d.Admin Users (Varun, Pramod, Sashi)
e.Super Admin
```
## The Roles tasks in this project


## Super Admin

```bash
1)Assign roles 
2)Get users details
3)Get users data whose role is not assigned

```

## Admin

```bash

1)Get all the projects in an organization
2)Get specific project details (Detailed overview,project concerns, project updates team Composition)
3)Create a project
4)Update the existing project
5)Delete existing project

```

## GDO Head
```bash
1)Get projects under him
2)add team member to a project
3)raise a resource request for a project
4)get specific project details
5)update team member details
6)delete team member details 
```
## Project Manager 

```bash
1)Raise concerns
2)get projects under him
3)create project_update details
4)update project_update details
5)Delete project_update details

```