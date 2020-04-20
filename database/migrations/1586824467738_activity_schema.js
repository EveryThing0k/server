"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ActivitySchema extends Schema {
  up() {
    this.create("activities", (table) => {
      table.string("title");
      table.datetime("data_entry");
      table.datetime("data_end");
      table
        .integer("content_id")
        .unsigned()
        .references("id")
        .inTable("contents")
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
        .notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("activities");
  }
}

module.exports = ActivitySchema;
