"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PhysicalSchema extends Schema {
  up() {
    this.create("physicals", (table) => {
      table.increments();
      table.string("cpf");
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .notNullable()
        .unique();
      table.timestamps();
    });
  }

  down() {
    this.drop("physicals");
  }
}

module.exports = PhysicalSchema;
