"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TaskSchema extends Schema {
  up() {
    this.create("tasks", (table) => {
      table.increments();
      table
        .integer("activity_content_id")
        .unsigned()
        .references("content_id")
        .inTable("activities")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .notNullable()
        .unique();
      table
        .integer("status_id")
        .unsigned()
        .references("id")
        .inTable("status")
        .onUpdate("CASCADE")
        .onUpdate("CASCADE")
        .notNullable();
      table
        .integer("type_id")
        .unsigned()
        .references("id")
        .inTable("types")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .notNullable();
      table
        .integer("score_content_id")
        .unsigned()
        .references("content_id")
        .inTable("scores")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("tasks");
  }
}

module.exports = TaskSchema;
