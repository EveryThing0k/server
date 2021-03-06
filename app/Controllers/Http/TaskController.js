"use strict";
const Database = use("Database");
const Activity = use("App/Models/Activity");
const Task = use("App/Models/Task");
const ProjectTask = use("App/Models/ProjectTask");
const EmployeeTask = use("App/Models/EmployeeTask");
const Status = use("App/Models/Status");
const ProjectTaks = use("App/Models/ProjectTask");
const User = use("App/Models/User");
const Employee = use("App/Models/Employee");

class TaskController {
  async create({ request, response }) {
    const {
      description,
      title,
      data_end,
      project_id,
      employees,
      value,
    } = request.only([
      "description",
      "title",
      "data_end",
      "project_id",
      "employees",
      "value",
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
    //get first status ID from project
    let status = null;
    try {
      status = await Status.findByOrFail("project_id", project_id);
    } catch (err) {
      console.log(err);
      return response.status(401).send({ error: "Project not Found" });
    }

    // Create Task
    const task = await Task.create(
      {
        id: activity.id,
        status_id: status.id,
        value,
        data_end,
      },
      trx
    );

    // Create Project Task
    await ProjectTask.create(
      {
        project_id: project_id,
        task_id: task.id,
      },
      trx
    );

    // Formatted  Employees
    const employeesFormatted = employees.map((employee) => ({
      employee_id: employee,
      task_id: task.id,
    }));
    try {
      //Created Employees
      await EmployeeTask.createMany(employeesFormatted, trx);
    } catch (err) {
      console.log(err);
      return response.status(401).send({ error: "Employee not Found" });
    }
    await trx.commit();
    return task;
  }
  async show({ request, response }) {
    const { task_id } = request.only(["task_id"]);

    const task = await Task.query()
      .where("tasks.id", task_id)
      .innerJoin("employee_tasks", "employee_tasks.task_id", "tasks.id")
      .innerJoin("statuses", "statuses.id", "status_id")
      .innerJoin("users", "users.id", "employee_tasks.employee_id")
      .select(
        "users.name as employee_name",
        "users.id as employee_id",
        "value",
        "data_end",
        "tasks.created_at",
        "statuses.name as status",
        "tasks.id as task_id"
      )
      .fetch();

    const taskFormatted = JSON.parse(JSON.stringify(task));
    if (taskFormatted.length === 0) {
      return response.status(401).send({ error: "Task not found" });
    }
    let employees = [];
    taskFormatted.forEach((values) => {
      employees.push({
        name: values.employee_name,
        id: values.employee_id,
      });
    });
    return {
      id: taskFormatted[0].task_id,
      value: taskFormatted[0].value,
      data_end: taskFormatted[0].data_end,
      data_entry: taskFormatted[0].created_at,
      status: taskFormatted[0].status,
      employees: employees,
    };
  }
  async update({ request }) {
    const { task_id, status_id } = request.only(["task_id", "status_id"]);
    const trx = await Database.beginTransaction();
    const task = await Task.findByOrFail("id", task_id);
    task.status_id = status_id;
    const save = await task.save(trx);
    await trx.commit();
    return save;
  }

  async index({ request }) {
    const { id } = request.params;
    const tasks = await ProjectTaks.query()
      .where("project_tasks.project_id", id)
      .innerJoin("tasks", "project_tasks.task_id", "tasks.id")
      .innerJoin("statuses", "statuses.id", "tasks.status_id")
      .innerJoin("activities", "tasks.id", "activities.id")
      .select(
        "task_id as id",
        "title",
        "description as content",
        "value",
        "statuses.name as status"
      )
      .fetch();

    const statuses = await Status.query()
      .where("project_id", id)
      .select("id", "name")
      .fetch();

    const data = statuses.rows.map((status) => ({
      id: status.$attributes.id,
      title: status.$attributes.name,
      cards: tasks.rows.filter(
        (task) => status.$attributes.name === task.$attributes.status
      ),
    }));

    return data;
  }

  async delete({ request, response }) {
    try {
      const trx = await Database.beginTransaction();
      const { id } = request.params;
      const emails = request.input("emails");

      const task = await Task.findByOrFail("id", id);
      await task.delete(trx);

      const employees_id = await User.query()
        .whereIn("email", emails)
        .pluck("id");

      await Employee.query().whereIn("id", employees_id).increment("exp", 0.5);

      await trx.commit();
      return response.status(200).send();
    } catch (err) {
      console.log(err);
      return response.status(401).send({ error: "Task not found" });
    }
  }
}

module.exports = TaskController;
