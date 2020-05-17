"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EmployeeSchema extends Schema {
  up() {
    this.create("employees", (table) => {
      table.decimal("exp").defaultTo(1).notNullable();
      table
        .integer("id")
        .unsigned()
        .references("id")
        .inTable("physicals")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .notNullable()
        .primary();     
      table.timestamps();
    });
  }

  down() {
    this.drop("employees");
  }
}

module.exports = EmployeeSchema;
