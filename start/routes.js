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

Route.post("/users/cpf", "UserCPFController.create");
Route.post("/users/cnpj", "UserCNPJController.create");
Route.post("/sessions", "SessionController.create");

// With auth
Route.group(() => {
  Route.post("/projects", "ProjectController.create").middleware(["company"]);
  Route.post("/tasks", "TaskController.create").middleware(["company"]);
}).middleware(["auth"]);
