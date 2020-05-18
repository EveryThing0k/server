"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", ({ response }) => {
  return response.send({ status: true });
});

/**Routes Storage**/
//Create a user emplyee
Route.post("/users/cpf", "UserCPFController.create");
//Crete a user company
Route.post("/users/cnpj", "UserCNPJController.create");
//Creata an session
Route.post("/sessions", "SessionController.create");


// With auth
Route.group(() => {
  //Create Project
  Route.post("/projects", "ProjectController.create").middleware(["company"]);
  //Create task
  Route.post("/tasks", "TaskController.create").middleware(["company"]);
  //Create brid of Company and Employee
  Route.post("/companyEmployees", "CompanyEmployeeController.create").middleware(["company"]);
  //return list of project
  Route.get("/projects", "ProjectController.index");
  //return list of taks from project
  Route.get("/project", "ProjectController.show");
  //return information of task
  Route.get("/tasks", "TaskController.show")

}).middleware(["auth"]);
