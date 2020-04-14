"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EmployeeSchema extends Schema {
  up() {
    this.create("employees", (table) => {
      table.integer("level");
      table
        .integer("physical_user_id")
        .unsigned()
        .references("user_id")
        .inTable("physicals")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .notNullable()
        .primary();
      table
        .integer("position_id")
        .unsigned()
        .references("id")
        .inTable("positions")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("employees");
  }
}

module.exports = EmployeeSchema;
