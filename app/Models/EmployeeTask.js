"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class EmployeeTask extends Model {
  static boot() {
    super.boot();

    this.addHook("beforeCreate", "EmployeeTaskHook.check");
  }
}

module.exports = EmployeeTask;
