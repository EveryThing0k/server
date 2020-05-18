"use strict";
const Database = use("Database");
const Activity = use("App/Models/Activity");
const Task = use("App/Models/Task");
const ProjectTask = use("App/Models/ProjectTask");
const EmployeeTask = use("App/Models/EmployeeTask");
const Status = use("App/Models/Status");

class TaskController {
  async create({ request,response}) {
    const {
      description,
      title,
      data_end,
      project_id,
      employees,
      value
    } = request.only([
      "description",
      "title",
      "data_end",
      "project_id",
      "employees",
      "value"
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
      status = await Status.findByOrFail("project_id",project_id);
    }catch (err) {
      console.log(err);
      return response
        .status(401)
        .send({ error: "Project not Found" });
    }

    // Create Task
    const task = await Task.create(
      {
        id: activity.id,
        status_id: status.id,
        value,
        data_end
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
    try{
    //Created Employees
    await EmployeeTask.createMany(employeesFormatted, trx);
    }catch(err){
      console.log(err);
      return response
        .status(401)
        .send({ error: "Employee not Found" });
    }
    await trx.commit();
    return task;
  }
  async show({ request }){

    const {task_id} = request.only([
      "task_id"
    ]);
    
    const task = await Task
    .query()
    .where("tasks.id", task_id)
    .innerJoin("employee_tasks", "employee_tasks.task_id" , "tasks.id")
    .innerJoin("statuses", "statuses.id", "status_id")
    .innerJoin("users", "users.id","employee_tasks.employee_id")
    .select("users.name","value","data_end","tasks.created_at","statuses.name as status")    
    .fetch();
    const taskFormatted = JSON.parse(JSON.stringify(task)).reduce(
      (accumulator, currentValue) => 
      (
        {
          value: accumulator.value,
          employees: accumulator.name+" , "+ currentValue.name,
          data_end: accumulator.data_end,
          data_entry: accumulator.created_at,
          status: accumulator.status
          }));
    return taskFormatted;
  }
}

module.exports = TaskController;
