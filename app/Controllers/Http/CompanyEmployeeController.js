"use strict";
const Database = use("Database");
const CompanyEmployee = use("App/Models/CompanyEmployee");
const User = use("App/Models/User");
const Employee = use("App/Models/Employee");

class CompanyEmployeeController {
  async create({ auth, request }) {
    const trx = await Database.beginTransaction();

    const company_id = auth.user.id;
    const { employees } = request.only(["employees"]);

    const employee_ids = await User.query()
      .select("id")
      .whereIn("email", employees)
      .ids();

    // Formatted  Employees
    const employeesFormatted = employee_ids.map((employee) => ({
      employee_id: employee,
      company_id: company_id,
    }));

    const employeesFormmatedWithd = employee_ids.map((employee) => ({
      id: employee,
    }));

    await Employee.createMany(employeesFormmatedWithd, trx);

    try {
      //Created Employees
      const company_employee = await CompanyEmployee.createMany(
        employeesFormatted,
        trx
      );
      await trx.commit();
      return company_employee;
    } catch (err) {
      console.log(err);
      return response.status(401).send({ error: "Employee not Found" });
    }
  }

  async index({ auth }) {
    const company_id = auth.user.id;
    let employees = await CompanyEmployee.query()
      .where("company_id", company_id)
      .fetch();

    employees = JSON.parse(JSON.stringify(employees));

    const employees_id = employees.map((e) => e.employee_id);

    let employeeEmails = await User.query()
      .whereIn("id", employees_id)
      .select("email")
      .fetch();

    employeeEmails = JSON.parse(JSON.stringify(employeeEmails));

    const emailsFormmated = employeeEmails.map((e) => e.email);
    return emailsFormmated;
  }

  async delete({ request, auth, response }) {
    const company_id = auth.user.id;
    const { email } = request.params;

    const employeeId = await User.query().where("email", email).pluck("id");

    const deleteEmployee = await CompanyEmployee.query()
      .where("company_id", company_id)
      .where("employee_id", Number(employeeId))
      .first();

    if (deleteEmployee) {
      await deleteEmployee.delete();

      const deleteEmployeeAgain = await Employee.query()
        .where("id", Number(employeeId))
        .first();

      if (deleteEmployeeAgain) {
        await deleteEmployeeAgain.delete();
      }
    }

    return response.send({});
  }
}

module.exports = CompanyEmployeeController;
