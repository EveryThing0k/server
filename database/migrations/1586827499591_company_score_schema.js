"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CompanyScoreSchema extends Schema {
  up() {
    this.create("company_scores", (table) => {
      table
        .integer("company_legal_user_id")
        .unsigned()
        .references("legal_user_id")
        .inTable("companies")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT")
        .notNullable();
      table
        .integer("score_content_id")
        .unsigned()
        .references("content_id")
        .inTable("scores")
        .onUpdate("CASCADE")
        .onDelete("SET NULL")
        .notNullable();
      table.primary(["company_legal_user_id", "score_content_id"]);
      table.timestamps();
    });
  }

  down() {
    this.drop("company_scores");
  }
}

module.exports = CompanyScoreSchema;
