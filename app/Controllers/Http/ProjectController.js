"use strict";
const Database = use("Database");
const Activity = use("App/Models/Activity");
const Project = use("App/Models/Project");
const Status = use("App/Models/Status");
const ProjectCompany = use("App/Models/ProjectCompany");
const CompanyEmployee = use("App/Models/CompanyEmployee");
const ProjectTaks = use("App/Models/ProjectTask");


class ProjectController {
  async create({ auth, request }) {
    const company_id = auth.user.id;

    const { description, title  } = request.only([
      "description",
      "title",
    ]);
    const trx = await Database.beginTransaction();

    // Create Activity
    const activity = await Activity.create(
      {
        title,
        description,
      },
      trx
    );
    
    // Create Project
    const project = await Project.create(
      {
        id: activity.id,
      },
      trx
    );

    // Create Brid Company of Project
    await ProjectCompany.create(
      {
        company_id,
        project_id : project.id
      },
      trx
    );
   
    //Create based status from project
    await Status.create(
      {
        name: "Created",
        project_id: activity.id
      },
      trx
    );
    await trx.commit();
    return project;
  }

  async index({ auth }){
    const user_id = auth.user.id;
    
    try {
      const company = await CompanyEmployee.findByOrFail("employee_id", user_id);
      //make a function 
      //------------
      const projects = await ProjectCompany
      .query()
      .where("company_id",company.id)
      .innerJoin("activities", "project_companies.project_id", "activities.id")
      .select("project_id","title", "description")      
      .fetch(); 
      //-------------
      return projects;
    } catch (err) {
      //make a function 
      //------------
      const projects = await ProjectCompany
      .query()
      .where("company_id",user_id)
      .innerJoin("activities", "project_companies.project_id", "activities.id")
      .select("project_id","title", "description")      
      .fetch(); 
      //------------
      return projects;
    }
  }
  async show({ request }) {
    const {project_id} = request.only([
      "project_id"
    ]);
    const tasks = await ProjectTaks
    .query()
    .where("project_tasks.project_id", project_id)
    .innerJoin("tasks", "project_tasks.id" , "tasks.id")
    .innerJoin("statuses" , "statuses.id" , "tasks.status_id")  
    .innerJoin("activities", "tasks.id", "activities.id")
    .select("title","description", "value","statuses.name as status")      
    .fetch();
    return tasks;
  }
}

module.exports = ProjectController;
