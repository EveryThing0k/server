const User = use("App/Models/User");
const Legal = use("App/Models/Legal");
const Employee = use("App/Models/Employee");

class SessionController {
  async create({ request, response, auth }) {
    const { email, password } = request.only(["email", "password"]);

    const token = await auth.attempt(email, password);

    const user = await User.query()
      .where("email", email)
      .select(["id", "name", "email"])
      .first();

    let type = "registered";

    const legalExists = await Legal.findBy("id", user.id);

    if (legalExists) {
      type = "company";
    }

    const employeeExists = await Employee.findBy("id", user.id);

    if (employeeExists) {
      type = "employee";
    }

    return response.send({
      token: token.token,
      user: { ...user.$attributes, type },
    });
  }
}

module.exports = SessionController;
