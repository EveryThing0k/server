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
  async delete({ request, response }) {
    try {
      const { id } = request.params;
      const status = await Status.findByOrFail("id", id);
      await status.delete();
      return response.status(200).send();
    } catch (err) {
      return response.status(404).send({ error: "Project don't exists" });
    }
  }
}

module.exports = StatusController;
