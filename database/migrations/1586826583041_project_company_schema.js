"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProjectCompanySchema extends Schema {
  up() {
    this.create("project_companies", (table) => {
      table
        .integer("company_legal_user_id")
        .unsigned()
        .references("legal_user_id")
        .inTable("companies")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT")
        .notNullable();
      table
        .integer("project_activity_content_id")
        .unsigned()
        .references("activity_content_id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("SET NULL")
        .notNullable();
      table.primary(["company_legal_user_id", "project_activity_content_id"]);
      table.timestamps();
    });
  }

  down() {
    this.drop("project_companies");
  }
}

module.exports = ProjectCompanySchema;
