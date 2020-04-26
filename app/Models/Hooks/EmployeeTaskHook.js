"use strict";
const EmployeeTask = use("App/Models/EmployeeTask");

const EmployeeTaskHook = (exports = module.exports = {});
EmployeeTaskHook.check = async (modelInstance) => {
  const {
    employee_physical_user_id: user_id,
    task_activity_content_id: content_id,
  } = modelInstance;

  // employee_physical_user_id, task_activity_content_id
  const employeeTask = await EmployeeTask.query()
    .where("employee_physical_user_id", user_id)
    .where("task_activity_content_id", content_id)
    .first();
  if (employeeTask) {
    throw new Error("Employee and Task already created");
  }
};
