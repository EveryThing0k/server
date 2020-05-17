"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TaskSchema extends Schema {
  up() {
    this.create("tasks", (table) => {
      table
        .integer("activity_id")
        .unsigned()
        .references("id")
        .inTable("activities")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .notNullable()
        .primary();
      table
        .integer("status_id")
        .unsigned()
        .references("id")
        .inTable("statuses")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .notNullable()
        .unique();
      table.integer("value").defaultTo(0).notNullable();
      table.datetime("data_end").notNullable();
      //Data entry created from command timestamps, named created_at
      table.timestamps();
    });
  }

  down() {
    this.drop("tasks");
  }
}

module.exports = TaskSchema;
