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
  Route.post("/project", "ProjectController.create").middleware(["company"]);
  //Create task
  Route.post("/task", "TaskController.create").middleware(["company"]);
  //Create brid of Company and Employee
  Route.post("/companyEmployees", "CompanyEmployeeController.create").middleware(["company"]);
  //Create status
  Route.post("/status","StatusController.create").middleware(["company"]);
  //Get index status
  Route.get("/status","StatusController.index").middleware(["company"]);
  //Return list of project
  Route.get("/projects", "ProjectController.index");
  //Return list of taks from project
  Route.get("/project", "ProjectController.show");
  //Return list of taks from project
  Route.get("/tasks", "TaskController.index");
  //Return information of task
  Route.get("/task", "TaskController.show");
  //Update task
  Route.patch("/task", "TaskController.update");
  //Update users
  Route.patch("/users","UserController.update");
  //Show user
  Route.get("/users","UserController.show");
  //Delete Task
  Route.delete("/task","TaskController.delete").middleware(["company"]);
  //Delete Project 
  Route.delete("/project","ProjectController.delete").middleware(["company"]);


}).middleware(["auth"]);
