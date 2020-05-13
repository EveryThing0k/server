"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EmployeeSchema extends Schema {
  up() {
    this.create("employees", (table) => {
      table.increments();
      table.integer("exp").defaultTo(1);
      table
        .integer("physical_user_id")
        .unsigned()
        .references("user_id")
        .inTable("physicals")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .notNullable()
        .unique();     
      table.timestamps();
    });
  }

  down() {
    this.drop("employees");
  }
}

module.exports = EmployeeSchema;
