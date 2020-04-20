"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CompanyPositionSchema extends Schema {
  up() {
    this.create("company_positions", (table) => {
      table
        .integer("company_legal_user_id")
        .unsigned()
        .references("legal_user_id")
        .inTable("companies")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT")
        .notNullable();
      table
        .integer("positions_id")
        .unsigned()
        .references("id")
        .inTable("positions")
        .onUpdate("CASCADE")
        .onDelete("SET NULL")
        .notNullable();
      table.primary(["company_legal_user_id", "positions_id"]);
      table.timestamps();
    });
  }

  down() {
    this.drop("company_positions");
  }
}

module.exports = CompanyPositionSchema;
