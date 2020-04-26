"use strict";
const Database = use("Database");
const Content = use("App/Models/Content");
const Activity = use("App/Models/Activity");
const Project = use("App/Models/Project");

class ProjectController {
  async create({ request, response }) {
    const { description, title, data_end } = request.only([
      "description",
      "title",
      "data_end",
    ]);
    const trx = await Database.beginTransaction();

    // Create Content
    const content = await Content.create(
      {
        description,
      },
      trx
    );

    // Create Activity
    const activity = await Activity.create(
      {
        title,
        data_end,
        status_id: 1,
        content_id: content.id,
      },
      trx
    );

    // Create Project
    const project = await Project.create(
      {
        activity_content_id: content.id,
      },
      trx
    );

    await trx.commit();
    return project;
  }
}

module.exports = ProjectController;
