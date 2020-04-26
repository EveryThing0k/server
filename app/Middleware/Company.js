"use strict";
const CompanyModel = use("App/Models/Company");

class Company {
  async handle({ auth, response }, next) {
    try {
      await CompanyModel.findByOrFail("legal_user_id", auth.user.id);
      await next();
    } catch (err) {
      console.log(err);
      return response
        .status(401)
        .send({ error: "User must be legal and authenticated" });
    }
  }
}

module.exports = Company;
