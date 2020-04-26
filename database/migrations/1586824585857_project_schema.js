"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProjectSchema extends Schema {
  up() {
    this.create("projects", (table) => {
      table.increments();
      table
        .integer("activity_content_id")
        .unsigned()
        .notNullable()
        .references("content_id")
        .inTable("activities")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .unique();
      table.timestamps();
    });
  }

  down() {
    this.drop("projects");
  }
}

module.exports = ProjectSchema;
