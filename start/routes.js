const Route = use("Route");

/**Routes Storege**/
//----------------------------------------------------------------------------------------

//Create people legal, pass [name, e-mail, password,cpf] in body
Route.post("/people/legal/:people_id", "create people legal");

//Create people legal, pass [name, e-mail, password,cnpj] in body
Route.post("/people/physical/:people_id", "create people physical");

// Create company, pass [street,number,cep,city,state,neighborhood] in bodt
Route.post("/company/:people_id","creat company");

//Create employee, pass e-mail in body
Route.post("/employee/:company_id/:position_id","creat new employee in company"); 

//Create position, pass name in body
Route.post("/position","create new position");

/**
 *Create project, pass [title, description] in body
 *In this case, set forking status in activity 0 
 * 
 * **/
Route.post("/project","create new position");

/**
 *Create task, pass [title, description] in body 
 *In this case, set forking status in activity 0 
 *In this case, set forking score default equal 0
 * 
 * **/
Route.post("/task/:project_id/:type_id","create new position");

//----------------------------------------------------------------------------------------

/**Routes List**/
//----------------------------------------------------------------------------------------

//List all companys by people_id
Route.get("/companys/:people_id","list all company");

//List all projects by company
Route.get("/projects/:company_id","lista all projects");

//List all positions by company
Route.get("/positions/:company_id", "list all positions")
//----------------------------------------------------------------------------------------



