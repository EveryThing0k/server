"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PositionSchema extends Schema {
  up() {
    this.create("positions", (table) => {
      table.increments();
      table.string("name").notNullable();
      table.integer("access_level").notNullable();
      table.string("description").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("positions");
  }
}

module.exports = PositionSchema;
