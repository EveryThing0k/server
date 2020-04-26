"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EmployeeTaskSchema extends Schema {
  up() {
    this.create("employee_tasks", (table) => {
      table.increments();
      table
        .integer("employee_physical_user_id")
        .unsigned()
        .references("physical_user_id")
        .inTable("employees")
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
      table.timestamps();
    });
  }

  down() {
    this.drop("employee_tasks");
  }
}

module.exports = EmployeeTaskSchema;
