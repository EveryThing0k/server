"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class StatusSchema extends Schema {
  up() {
    this.create("statuses", (table) => {
      table.increments();
      table.string("name").notNullable();
      table
      .integer("project_id")
      .unsigned()
      .references("id")
      .inTable("projects")
      .onUpdate("CASCADE")
      .onDelete("CASCADE")
      .notNullable()
      
      table.timestamps();
    });
  }

  down() {
    this.drop("statuses");
  }
}

module.exports = StatusSchema;
