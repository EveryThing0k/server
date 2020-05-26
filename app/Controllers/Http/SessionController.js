const User = use("App/Models/User");
const Legal = use("App/Models/Legal");

class SessionController {
  async create({ request, response, auth }) {
    const { email, password } = request.only(["email", "password"]);

    const token = await auth.attempt(email, password);

    const user = await User.query()
      .where("email", email)
      .select(["id", "name", "email"])
      .first();

    let type = "employee";

    const legalExists = await Legal.findBy("id", user.id);

    if (legalExists) {
      type = "company";
    }

    return response.send({
      token: token.token,
      user: { ...user.$attributes, type },
    });
  }
}

module.exports = SessionController;
