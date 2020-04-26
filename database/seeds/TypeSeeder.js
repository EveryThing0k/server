"use strict";
const Database = use("Database");
const Type = use("App/Models/Type");

class TypeSeeder {
  async run() {
    const trx = await Database.beginTransaction();
    const type = await Type.create({
      name: "Non Type",
    });
    await trx.commit();
    return type;
  }
}

module.exports = TypeSeeder;
