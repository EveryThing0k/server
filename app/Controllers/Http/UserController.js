'use strict'
const User = use("App/Models/User");
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
}

module.exports = UserController
