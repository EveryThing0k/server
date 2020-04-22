"use strict";

const Position = use("App/Models/Position");

class PositionSeeder {
  async run() {
    return Position.create({
      name: "Without Charge",
      description: "Position for users that don't have charges",
    });
  }
}

module.exports = PositionSeeder;
