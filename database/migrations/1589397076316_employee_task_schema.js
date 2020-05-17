'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmployeeTaskSchema extends Schema {
  up () {
    this.create('employee_tasks', (table) => {
      table.increments("id");
      table
        .integer("employee_id")
        .unsigned()
        .references("id")
        .inTable("employees")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .notNullable();
      table
        .integer("task_id")
        .unsigned()
        .references("id")
        .inTable("tasks")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .notNullable();
      table.primary(["id","employee_id", "task_id"]); 
      table.timestamps();
    })
  }

  down () {
    this.drop('employee_tasks')
  }
}

module.exports = EmployeeTaskSchema
