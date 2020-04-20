"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ScoreSchema extends Schema {
  up() {
    this.create("scores", (table) => {
      table.integer("value");
      table
        .integer("content_id")
        .unsigned()
        .references("id")
        .inTable("contents")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .notNullable()
        .primary();
      table.timestamps();
    });
  }

  down() {
    this.drop("scores");
  }
}

module.exports = ScoreSchema;
