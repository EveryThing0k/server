'use strict'
const Database = use("Database");
const EmployeeTask = use("App/Models/EmployeeTask");
const Employee = use("App/Models/Employee");

const TaskHook = (exports = module.exports = {});

TaskHook.change_level = async (modelInstance) => {
    const {
        id: task_id,
        value: value,
        status_id: status_id
    } = modelInstance;
    
    if (status_id === 2) {
        const trx = await Database.beginTransaction();
        const employees_id = await EmployeeTask
            .query()
            .where("task_id", task_id)            
            .pluck("employee_id");        
        await Employee.query().whereIn("id",employees_id).increment("exp",value);        
        await trx.commit();
    }
    
};
