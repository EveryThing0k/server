"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class LegalSchema extends Schema {
  up() {
    this.create("legals", (table) => {
      table.increments();
      table.string("cnpj").notNullable().unique();
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
    this.drop("legals");
  }
}

module.exports = LegalSchema;
