"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class LevelProjectSchema extends Schema {
  up() {
    this.create("level_projects", (table) => {
      table.integer("level");
      table
        .integer("project_activity_content_id")
        .unsigned()
        .references("activity_content_id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("SET NULL")
        .notNullable();
      table
        .integer("employee_physical_user_id")
        .unsigned()
        .references("physical_user_id")
        .inTable("employees")
        .onUpdate("CASCADE")
        .onDelete("SET NULL")
        .notNullable();
      table.primary([
        "project_activity_content_id",
        "employee_physical_user_id",
      ]);
      table.timestamps();
    });
  }

  down() {
    this.drop("level_projects");
  }
}

module.exports = LevelProjectSchema;
