"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CompanyEmployeeSchema extends Schema {
  up() {
    this.create("company_employees", (table) => {
      table
        .integer("company_id")
        .unsigned()
        .references("id")
        .inTable("companies")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .notNullable();
      table
        .integer("employee_id")
        .unsigned()
        .references("id")
        .inTable("employees")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .notNullable();
      table.primary(["company_id", "employee_id"]);
      table.timestamps();
    });
  }

  down() {
    this.drop("company_employees");
  }
}

module.exports = CompanyEmployeeSchema;
