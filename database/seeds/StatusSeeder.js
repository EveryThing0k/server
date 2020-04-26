"use strict";

const Status = use("App/Models/Status");

class StatusSeeder {
  async run() {
    return Status.create({
      name: "Created",
    });
  }
}

module.exports = StatusSeeder;
