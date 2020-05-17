"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProjectTaskSchema extends Schema {
  up() {
    this.create("project_tasks", (table) => {
      table
        .integer("project_id")
        .references("id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .notNullable();
      table
        .integer("task_id")
        .references("id")
        .inTable("tasks")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .notNullable()
        .unique();
        table.primary(["project_id", "task_id"]);
      table.timestamps();
    });
  }

  down() {
    this.drop("project_tasks");
  }
}

module.exports = ProjectTaskSchema;
