'use strict'
const Database = use("Database");
const CompanyEmployee = use("App/Models/CompanyEmployee");

class CompanyEmployeeController {
    async create({ auth, request }) {
        const trx = await Database.beginTransaction();

        const company_id = auth.user.id;
        const { employees } = request.only([
            "employees"
          ]);
        // Formatted  Employees 
        const employeesFormatted = employees.map((employee) => ({
            employee_id: employee,
            company_id: company_id,
        }));

        try{
            //Created Employees
            const company_employee = await CompanyEmployee.createMany(employeesFormatted, trx);
            await trx.commit();
            return company_employee;
        }catch(err){
            console.log(err);
            return response
            .status(401)
            .send({ error: "Employee not Found" });
        }
    }
}

module.exports = CompanyEmployeeController
