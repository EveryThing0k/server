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
  Route.post(
    "/company_employees",
    "CompanyEmployeeController.create"
  ).middleware(["company"]);
  Route.get(
    "/company_employees",
    "CompanyEmployeeController.index"
  ).middleware(["company"]);
  Route.delete(
    "/company_employees/:email",
    "CompanyEmployeeController.delete"
  ).middleware(["company"]);
  //Create status
  Route.post("/statuses", "StatusController.create").middleware(["company"]);
  //Get index status
  Route.get("/status", "StatusController.index").middleware(["company"]);
  //Return list of project
  Route.get("/projects", "ProjectController.index");
  //Return list of taks from project
  Route.get("/project", "ProjectController.show");
  //Return list of taks from project
  Route.get("/tasks/:id", "TaskController.index").middleware(["company"]);
  //Return information of task
  Route.get("/task", "TaskController.show");
  //Update task
  Route.put("/tasks/:id", "TaskController.delete");
  //Update users
  Route.put("/users", "UserController.update");
  //Show user
  Route.get("/user", "UserController.show");
  //Delete Task
  Route.delete("/tasks/:id", "TaskController.delete").middleware(["company"]);
  //Delete Project
  Route.delete("/projects/:id", "ProjectController.delete").middleware([
    "company",
  ]);
  Route.delete("/statuses/:id", "StatusController.delete").middleware([
    "company",
  ]);
  //Create company based of user employee
  Route.post("/company", "CompanyController.create");
}).middleware(["auth"]);
