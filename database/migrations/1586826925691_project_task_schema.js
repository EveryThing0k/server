"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProjectTaskSchema extends Schema {
  up() {
    this.create("project_tasks", (table) => {
      table.increments();
      table
        .integer("project_activity_content_id")
        .references("activity_content_id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .notNullable();
      table
        .integer("task_activity_content_id")
        .references("activity_content_id")
        .inTable("tasks")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .notNullable()
        .unique();

      table.timestamps();
    });
  }

  down() {
    this.drop("project_tasks");
  }
}

module.exports = ProjectTaskSchema;
