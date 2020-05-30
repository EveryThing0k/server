"use strict";
const Database = use("Database");
const Activity = use("App/Models/Activity");
const Project = use("App/Models/Project");
const Status = use("App/Models/Status");
const ProjectCompany = use("App/Models/ProjectCompany");
const CompanyEmployee = use("App/Models/CompanyEmployee");
const ProjectTask = use("App/Models/ProjectTask");
const Task = use("App/Models/Task");

class ProjectController {
  async get_project(company_id) {
    const projects = await ProjectCompany.query()
      .where("company_id", company_id)
      .innerJoin("activities", "project_companies.project_id", "activities.id")
      .select("project_id", "title", "description")
      .fetch();
    return projects;
  }

  async create({ auth, request }) {
    const company_id = auth.user.id;

    const { description, title } = request.only(["description", "title"]);
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
        project_id: project.id,
      },
      trx
    );

    //Create based status from project
    await Status.createMany(
      [
        {
          name: "Created",
          project_id: activity.id,
        },
        {
          name: "Concluded",
          project_id: activity.id,
        },
      ],
      trx
    );

    await trx.commit();
    return project;
  }

  async index({ auth }) {
    const user_id = auth.user.id;

    try {
      const company = await CompanyEmployee.findByOrFail(
        "employee_id",
        user_id
      );
      return await this.get_project(company.id);
    } catch (err) {
      return await this.get_project(user_id);
    }
  }

  async show({ request, response }) {
    const { project_id } = request.only(["project_id"]);

    const project = await Activity.query()
      .where("activities.id", project_id)
      .innerJoin("statuses", "statuses.project_id", "activities.id")
      .select(
        "title",
        "description",
        "activities.created_at as created_at",
        "statuses.name as status_name",
        "statuses.id as status_id"
      )
      .fetch();

    const projectFormatted = JSON.parse(JSON.stringify(project));
    if (projectFormatted.length === 0) {
      return response.status(401).send({ error: "Project not found" });
    }
    let statuses = [];
    projectFormatted.forEach((values) => {
      statuses.push({
        name: values.status_name,
        id: values.status_id,
      });
    });

    return {
      title: projectFormatted[0].title,
      description: projectFormatted[0].description,
      data_entry: projectFormatted[0].data_entry,
      statuses: statuses,
    };
  }
  async delete({ request, response }) {
    const trx = await Database.beginTransaction();

    const { id: project_id } = request.params;

    try {
      const project = await Project.findByOrFail("id", project_id);
      await project.delete(trx);
      await trx.commit();
      return true;
    } catch (err) {
      console.log(err);
      return response.status(401).send({ error: "Project not found" });
    }
  }
}

module.exports = ProjectController;
