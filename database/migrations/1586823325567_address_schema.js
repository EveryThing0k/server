"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddressSchema extends Schema {
  up() {
    this.create("addresses", (table) => {
      table.increments();
      table.string("number").notNullable();
      table.string("street").notNullable();
      table.string("neighborhood").notNullable();
      table.string("city").notNullable();
      table.string("state").notNullable();
      table.string("cep").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("addresses");
  }
}

module.exports = AddressSchema;
