"use strict";
const User = use("App/Models/User");
const Physical = use("App/Models/Physical");
const Employee = use("App/Models/Employee");
const Position = use("App/Models/Position");
const Database = use("Database");

class UserCPFController {
  async create({ request, response }) {
    const { name, email, password, cpf } = request.only([
      "name",
      "email",
      "password",
      "cpf",
    ]);
    const trx = await Database.beginTransaction();

    // Check if the email already exists

    const userExists = await User.findBy("email", email);

    if (userExists) {
      return response.status(401).send({ error: "E-mail already exists" });
    }

    const user = await User.create({ name, email, password }, trx);

    // Check if the position default already created
    const positionExists = await Position.first();
    if (positionExists.access_level != 0) {
      return response
        .status(500)
        .send({ error: "Position default not created" });
    }

    // Create Physical
    await Physical.create({ cpf, user_id: user.id }, trx);

    /// Create Employee
    await Employee.create(
      {
        physical_user_id: user.id,
      },
      trx
    );

    await trx.commit();
    return user;
  }
}

module.exports = UserCPFController;
