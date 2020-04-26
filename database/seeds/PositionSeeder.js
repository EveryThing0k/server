"use strict";

const Position = use("App/Models/Position");
const Database = use("Database");

class PositionSeeder {
  async run() {
    const trx = await Database.beginTransaction();
    const position = await Position.create(
      {
        name: "Without Charge",
        description: "Position for users that don't have charges",
      },
      trx
    );
    await trx.commit();
    return position;
  }
}

module.exports = PositionSeeder;
