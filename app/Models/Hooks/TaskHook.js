"use strict";
const Database = use("Database");
const EmployeeTask = use("App/Models/EmployeeTask");
const Employee = use("App/Models/Employee");

const TaskHook = (exports = module.exports = {});

TaskHook.addXP = async (modelInstance) => {
  const data = modelInstance;
  console.log(data);
  // if (status_id === 2) {
  //     const trx = await Database.beginTransaction();
  // const employees_id = await EmployeeTask
  //     .query()
  //     .where("task_id", task_id)
  //     .pluck("employee_id");
  // await Employee.query().whereIn("id",employees_id).increment("exp",value);
  //     await trx.commit();
  // }
};
