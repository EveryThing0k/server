"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CompanySchema extends Schema {
  up() {
    this.create("companies", (table) => {
      table.increments();
      table.string("fantasy_name").notNullable();
      table
        .integer("legal_user_id")
        .unsigned()
        .references("user_id")
        .inTable("legals")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .notNullable()
        .unique();
      table
        .integer("address_id")
        .unsigned()
        .references("id")
        .inTable("addresses")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT")
        .notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("companies");
  }
}

module.exports = CompanySchema;
