'use strict'
const Activity = use("App/Models/Activity");
const EmployeeTask = use("App/Models/EmployeeTask");
const Employee = use("App/Models/Employee");
const Score = use("App/Models/Score");

const TaskHook = (exports = module.exports = {});

TaskHook.change_level = async (modelInstance) => {
    const trx = await Database.beginTransaction();

    const {
        task_id: activity_id,
        value: value,
        status_id: status_id
    } = modelInstance;
    
    if (status_id === 2) {
        const list_of_employee = await EmployeeTask
            .query()
            .where("task_activity_content_id", task_content_id)
            .select('employee_physical_user_id');
       
        const { id, level } = Employee.query().whereIn('physical_user_id',id_employee).select('id', 'level');
        const result = await Employee.query(trx).whereIn('id', id).update({level: level + value });
        await trx.commit();
        
    }
};
