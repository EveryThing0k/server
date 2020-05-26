"use strict";
const Database = use("Database");
const Status = use("App/Models/Status");
class StatusController {
  async create({ request }) {
    const { name, project_id } = request.only(["name", "project_id"]);
    const trx = await Database.beginTransaction();
    const status = await Status.create(
      {
        name: name,
        project_id: project_id,
      },
      trx
    );

    await trx.commit();
    return status;
  }
  async index({ request }) {
    const { project_id } = request.only(["project_id"]);
    const statuses = await Status.query()
      .where("project_id", project_id)
      .select("id", "name")
      .fetch();
    return statuses;
  }
}

module.exports = StatusController;
