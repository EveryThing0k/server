'use strict'
const Legal = use("App/Models/Legal");
const Database = use("Database");
const Address = use("App/Models/Address");
const Company = use("App/Models/Company");

class CampanyController {
    async create({ auth, response, request }) {
        const {
            fantasy_name,
            cnpj,
            address,
        } = request.only([
            "fantasy_name",
            "cnpj",
            "address",
        ]);
        const user = auth.user;
        const trx = await Database.beginTransaction();
        // Check if the email already exists    
        const legalExists = await Legal.findBy("id", user.id);
        if (legalExists)
            return response.status(401).send({ error: "User already a legal person" });

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

module.exports = CampanyController
