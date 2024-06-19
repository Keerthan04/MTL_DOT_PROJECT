const db = require('../db/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function login(req,res){
    try{
        const{user_id,password}=req.body;
        //if no username,password,role
        console.log(user_id,password);
        if(!user_id || !password){
            res.status(400).send({message:"All fields are required"});
            return;
        }
        const user = await db.check_userid(user_id);//check if user exist
        console.log("user is",user);
        if(user ===  null){
            res.status(400).send({message: "Wrong user_id or user_id doesnt exist"});
        }
        else{
            const pass = await db.check_password(user_id);
            if(pass != password){
                res.status(401).send({message: "Wrong password"});
            }
            else{
                const active = await db.getActive(user_id);
                if(!active || (active === "inactive")){
                    res.status(401).send({message: "User is not activated to access the site"});
                }
                const login = 'true';
                res.status(200).send({message:"Login Successful",token:create_jwt(user_id,password,login)});
            }
        }
        
        //seeing for role of each user
        // if(role==='doctor'){
        //     const user = await db.docusers(email);
        //     console.log(user);
        //     if(!user){
        //         res.status(401).send({message:"Invalid Email Address(User doesnt Exist)"});
        //         return;
        //     }
        //     //checking password
        //     const pass = await db.docpassword(email);
        //     console.log(pass);
        //     //check if same password
        //     if(pass === password){
        //         const doctor_id = await db.doctor_id(email);
        //         res.status(200).send({message:"Login Successful",token:create_jwt(doctor_id,role)});
        //         return ;
        //     }
        //     else{
        //         res.status(401).send({message:"Invalid Password"});
        //     }
        // }
        
        // else if(role === "patient"){
        //     const user = await db.patusers(email);
        //     console.log(user);
        //     if(!user){
        //         res.status(401).send({message:"Invalid Email Address(User doesnt Exist)"});
        //         return;
        //     }
        //     const pass = await db.patpassword(email);
        //     console.log(pass);
        //     if(pass === password){
                
        //         const patient_id = await db.patient_id(email);

        //         res.status(200).send({message:"Login Successful",token:create_jwt(patient_id,role)});
        //         return ;
        //     }
        //     else{
        //         res.status(401).send({message:"Invalid Password"});
        //     }
        // }
    }catch(err){
        console.error("Internal Server Error", err);
        return res.status(500).send({ message: "Internal Server Error" });
    }
}

function create_jwt(user_id,password,login){
    return jwt.sign({user_id,password,login},process.env.JWT_SECRET_KEY);
}


module.exports = {login};