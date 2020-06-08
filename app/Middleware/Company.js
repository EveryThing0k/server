"use strict";
const CompanyModel = use("App/Models/Company");
const CompanyEmployee = use("App/Models/CompanyEmployee");

class Company {
  async handle({ auth, response }, next) {
    try {
      const response = await CompanyModel.findBy("id", auth.user.id);
      if (!(response && response.$attributes)) {
        await CompanyEmployee.findByOrFail("employee_id", auth.user.id);
      }

      await next();
    } catch (err) {
      console.log(err);
      return response.status(401).send({
        error: "User must be a company owner or employee",
      });
    }
  }
}

module.exports = Company;
