"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PhysicalSchema extends Schema {
  up() {
    this.create("physicals", (table) => {
      table.string("cpf").unique().notNullable();
      table
        .integer("id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .notNullable()
        .primary();
      table.timestamps();
    });
  }

  down() {
    this.drop("physicals");
  }
}

module.exports = PhysicalSchema;
