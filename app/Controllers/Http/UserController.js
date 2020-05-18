'use strict'
const User = use("App/Models/User");
const Employee = use("App/Models/Employee");
const Database = use("Database");
class UserController {
    async update({auth,request, response}){
        const user_id =  auth.user.id;
        const {name, email, password} = request.only([
            "name","email", "password"]);
        const trx = await Database.beginTransaction();

        if(name != undefined){
            const user = await User.findByOrFail("id", user_id);      
            user.name = name;
            const save = await user.save(trx);  
            await trx.commit();
            return save;

        }else if(email != undefined){
            const user = await User.findByOrFail("id", user_id);      
            user.email = email;
            const save = await user.save(trx);  
            await trx.commit();
            return save;

        }else if(password != undefined){
            const user = await User.findByOrFail("id", user_id);         
            user.password = password;
            const save = await user.save(trx);           
            await trx.commit()
            return save;
        }
        return response
        .status(401)
        .send({ error: "Error" });
    } 
    async show({auth}){
        const user = auth.user;
        
        let userFormatted = {
            "name" : user.name,
            "email" : user.email,
            "user_id" : user.id
        };
        try{
            const employee =  await Employee.findByOrFail("id",user.id);
            userFormatted["type"] = "employee";
            userFormatted["exp"] = employee.exp;
            const level = Math.sqrt(employee.exp).toFixed();
            const next_level = Math.round(Math.sqrt(employee.exp))+1;
            //exp necessary to next level
            const exp_necessary=  next_level**2;
            //percent to next level
            const percent = (employee.exp*100)/exp_necessary;
            userFormatted["level"] = level;
            userFormatted["percent"] = percent;


            return  userFormatted;
        }catch(err){
            userFormatted["type"] = "company";
            return  userFormatted;
        }
        

    }
}

module.exports = UserController
