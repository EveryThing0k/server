"use strict";

const Status = use("App/Models/Status");
const Database = use("Database");

class StatusSeeder {
  async run() {
    const trx = await Database.beginTransaction();
    const status = await Status.create(
      {
        name: "Created",
      },
      trx
    );
    await trx.commit();
    return status;
  }
}

module.exports = StatusSeeder;
