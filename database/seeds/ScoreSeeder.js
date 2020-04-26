"use strict";
const Database = use("Database");
const Content = use("App/Models/Content");
const Score = use("App/Models/Score");

class ScoreSeeder {
  async run() {
    const trx = await Database.beginTransaction();
    const content = await Content.create(
      {
        description: "Initial Value",
      },
      trx
    );
    const score = await Score.create(
      {
        value: 0,
        content_id: content.id,
      },
      trx
    );
    await trx.commit();
    return score;
  }
}

module.exports = ScoreSeeder;
