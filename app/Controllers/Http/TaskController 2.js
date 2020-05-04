"use strict";
const Database = use("Database");
const Content = use("App/Models/Content");
const Activity = use("App/Models/Activity");
const Task = use("App/Models/Task");
const ProjectTask = use("App/Models/ProjectTask");
const EmployeeTask = use("App/Models/EmployeeTask");

class TaskController {
  async create({ request, response }) {
    const {
      description,
      title,
      data_end,
      type_id,
      project_content_id,
      employees,
    } = request.only([
      "description",
      "title",
      "data_end",
      "type_id",
      "project_content_id",
      "employees",
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

    // Create Task
    const task = await Task.create(
      {
        activity_content_id: content.id,
        type_id,
        score_content_id: 1,
      },
      trx
    );

    // Create Project Task
    /*
    await ProjectTask.create(
      {
        project_activity_content_id: project_content_id,
        task_activity_content_id: content.id,
      },
      trx
    );*/

    // Create Employee Tasks

    const employeesFormatted = employees.map((employee) => ({
      employee_physical_user_id: employee,
      task_activity_content_id: content.id,
    }));

    await EmployeeTask.createMany(employeesFormatted, trx);

    await trx.commit();
    return task;

}

module.exports = TaskController;
