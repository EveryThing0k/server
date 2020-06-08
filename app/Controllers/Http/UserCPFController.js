"use strict";
const User = use("App/Models/User");
const Physical = use("App/Models/Physical");
const Database = use("Database");

class UserCPFController {
  async create({ request, response }) {
    const { name, email, password, cpf } = request.only([
      "name",
      "email",
      "password",
      "cpf",
    ]);

    const alloedUsers = [
      "professor@evok.com",
      "henrique@evok.com",
      "vitor@evok.com",
      "gustavo@evok.com",
      "matheus@evok.com",
      "lucca@evok.com",
      "guilherme@evok.com",
    ];

    const allowed = alloedUsers.find((user) => user === email);

    if (!allowed) {
      return response
        .status(401)
        .send({ error: "Your e-mail address is not registrable" });
    }

    const trx = await Database.beginTransaction();

    // Check if the email already exists

    const userExists = await User.findBy("email", email);

    if (userExists) {
      return response.status(401).send({ error: "E-mail already exists" });
    }

    const user = await User.create({ name, email, password }, trx);

    // Create Physical
    await Physical.create({ cpf, id: user.id }, trx);

    /// Create Employee
    // await Employee.create(
    //   {
    //     id: user.id,
    //   },
    //   trx
    // );

    await trx.commit();
    return user;
  }
}

module.exports = UserCPFController;
