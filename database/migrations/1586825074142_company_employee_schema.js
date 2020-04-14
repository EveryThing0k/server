"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CompanyEmployeeSchema extends Schema {
  up() {
    this.create("company_employees", (table) => {
      table
        .integer("company_legal_user_id")
        .unsigned()
        .references("legal_user_id")
        .inTable("companies")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT")
        .notNullable();
      table
        .integer("employee_physical_user_id")
        .unsigned()
        .references("physical_user_id")
        .inTable("employees")
        .onUpdate("CASCADE")
        .onDelete("SET NULL")
        .notNullable();
      table.primary(["company_legal_user_id", "employee_physical_user_id"]);
      table.timestamps();
    });
  }

  down() {
    this.drop("company_employees");
  }
}

module.exports = CompanyEmployeeSchema;
