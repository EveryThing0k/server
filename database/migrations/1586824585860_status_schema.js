"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class StatusSchema extends Schema {
  up() {
    this.create("statuses", (table) => {
      table.increments();
      table.string("name").notNullable();
      table
      .integer("project_activity_id")
      .unsigned()
      .references("activity_id")
      .inTable("projects")
      .onUpdate("CASCADE")
      .onDelete("CASCADE")
      .notNullable()
      .unique();
      table.timestamps();
    });
  }

  down() {
    this.drop("statuses");
  }
}

module.exports = StatusSchema;
