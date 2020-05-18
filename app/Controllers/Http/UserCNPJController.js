"use strict";
const User = use("App/Models/User");
const Legal = use("App/Models/Legal");
const Database = use("Database");
const Address = use("App/Models/Address");
const Company = use("App/Models/Company");

class UserCNPJController {
  async create({ request, response }) {
    const {
      fantasy_name,
      name,
      email,
      password,
      cnpj,
      address,
    } = request.only([
      "fantasy_name",
      "name",
      "email",
      "password",
      "cnpj",
      "address",
    ]);
    const trx = await Database.beginTransaction();

    // Check if the email already exists

    const userExists = await User.findBy("email", email);

    if (userExists) {
      return response.status(401).send({ error: "E-mail already exists" });
    }

    const user = await User.create({ name, email, password }, trx);

    // Create Legal
    await Legal.create({ cnpj, id: user.id }, trx);

    // Create Address
    const { neighborhood, number, street, city, state, cep } = address;
    const companyAddress = await Address.create(
      {
        neighborhood,
        number,
        street,
        city,
        state,
        cep,
      },
      trx
    );

    // Create Company
    const company = await Company.create(
      {
        fantasy_name,
        id: user.id,
        address_id: companyAddress.id,
      },
      trx
    );

    await trx.commit();
    return company;
  }
}

module.exports = UserCNPJController;
