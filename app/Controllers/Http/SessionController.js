const User = use("App/Models/User");

class SessionController {
  async store({ request, response, auth }) {
    const { email, password } = request.only(["email", "password"]);

    const token = await auth.attempt(email, password);

    const user = await User.query()
      .where("email", email)
      .select(["id", "name", "email"])
      .first();

    return response.send({
      token: token.token,
      user,
    });
  }
}

module.exports = SessionController;
