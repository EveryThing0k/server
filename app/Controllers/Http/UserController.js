"use strict";
const User = use("App/Models/User");
const Employee = use("App/Models/Employee");
const Database = use("Database");
const Company = use("App/Models/Company");

class UserController {
  async update({ auth, request, response }) {
    const user = auth.user;
    const { name, email, password } = request.only([
      "name",
      "email",
      "password",
    ]);
    const trx = await Database.beginTransaction();

    if (name) {
      user.name = name;
    }
    if (email) {
      if (email !== user.email) {
        const userExists = await User.findBy("email", email);
        if (userExists) {
          return response
            .status(401)
            .send({ error: "E-mail already registred" });
        }
        user.email = email;
      }
    }
    if (password) {
      user.password = password;
    }
    await user.save(trx);
    await trx.commit();
    return user;
  }
  async show({ auth }) {
    const user = auth.user;

    let userFormatted = {
      name: user.name,
      email: user.email,
      user_id: user.id,
    };
    try {
      const employee = await Employee.findByOrFail("id", user.id);
      userFormatted["type"] = "employee";
      userFormatted["exp"] = employee.exp;
      const level = Math.sqrt(employee.exp).toFixed();
      const next_level = Math.round(Math.sqrt(employee.exp)) + 1;
      //exp necessary to next level
      const exp_necessary = next_level ** 2;
      //percent to next level
      const percent = (employee.exp * 100) / exp_necessary;
      userFormatted["level"] = level;
      userFormatted["percent"] = percent;

      return userFormatted;
    } catch (err) {
      const response = await Company.findBy("id", user.id);

      if (response && response.$attributes) {
        userFormatted["type"] = "company";
        return userFormatted;
      }

      userFormatted["type"] = "registered";
      return userFormatted;
    }
  }
}

module.exports = UserController;
