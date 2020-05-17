"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProjectCompanySchema extends Schema {
  up() {
    this.create("project_companies", (table) => {
      table.increments("id");
      table
        .integer("company_id")
        .unsigned()
        .references("id")
        .inTable("companies")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .notNullable();
      table
        .integer("project_id")
        .unsigned()
        .references("id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .notNullable();
      table.dropPrimary();  
      table.primary(["id","company_id", "project_id"]);
      table.timestamps();
    });
  }

  down() {
    this.drop("project_companies");
  }
}

module.exports = ProjectCompanySchema;
