"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProjectTaskTypeSchema extends Schema {
  up() {
    this.create("project_task_types", (table) => {
      table
        .integer("project_activity_content_id")
        .unsigned()
        .references("activity_content_id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT")
        .notNullable();
      table
        .integer("type_id")
        .unsigned()
        .references("id")
        .inTable("types")
        .onUpdate("CASCADE")
        .onDelete("SET NULL")
        .notNullable();
      table.primary(["project_activity_content_id", "type_id"]);
      table.timestamps();
    });
  }

  down() {
    this.drop("project_task_types");
  }
}

module.exports = ProjectTaskTypeSchema;
