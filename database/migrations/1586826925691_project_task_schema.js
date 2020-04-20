"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProjectTaskSchema extends Schema {
  up() {
    this.create("project_tasks", (table) => {
      table
        .integer("project_activity_content_id")
        .unsigned()
        .references("activity_content_id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT")
        .notNullable();
      table
        .integer("task_activity_content_id")
        .unsigned()
        .references("activity_content_id")
        .inTable("tasks")
        .onUpdate("CASCADE")
        .onDelete("SET NULL")
        .notNullable();
      table.primary([
        "project_activity_content_id",
        "task_activity_content_id",
      ]);
      table.timestamps();
    });
  }

  down() {
    this.drop("project_tasks");
  }
}

module.exports = ProjectTaskSchema;
