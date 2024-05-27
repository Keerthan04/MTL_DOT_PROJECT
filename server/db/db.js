
// const {takeCare} = require('../genai/ai');
// const { Pool } = require('pg');
require('dotenv').config();
const sql = require('mssql');
const config = require('./dbconfig');
// let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

// const pool = new Pool({
//     host: PGHOST,
//     database: PGDATABASE,
//     username: PGUSER,
//     password: PGPASSWORD,
//     port: 5432,
//     ssl: {
//       require: true,
//     },
//   });


// Function to establish a connection and query the database
// async function check(id) {
//     try{
//         const pool = await sql.connect(config);
//         const result = await pool.request().query(`select * from checks where name = '${id}'`);
//         console.log(result);
//         console.log(result.recordsets);
//         return result.recordsets;
//     }
//     catch(error){
//         console.log(error);
//     }

// }
async function check_userid(user_id){
    try{
        const pool = await sql.connect(config);
        const result = await pool.request().query(`select user_id from Login where user_id = '${user_id}'`);
        console.log(result);
        if(result.recordsets[0].length === 0){//result.recordsets[0] will be the main thing
            return null;
        }
        else{
            return result.recordsets[0][0];//record sets is like this [ [ { name: 'keer', pass: '123' } ] ]
        }
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

async function check_password(user_id){
    try{
        const pool = await sql.connect(config);
        const result = await pool.request().query(`select password from Login where user_id = '${user_id}'`);
        if(result.recordsets.length === 0){
            return null;
        }
        else{
            return result.recordsets[0][0].password;
        }
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

//make the time diff calculation at the frontend only as based on that the reason_of_delay has to be poped up so 
async function scheduling_entry(req,res){
    try{
        const pool = await sql.connect(config);
        const user_id = req.user_id;//got directly from the req object
        const {pub_date,ed_name,schedule_time,actual_time,difference_time,no_of_pages,reason_for_delay,unit,pub} = req.body;
        console.log(difference_time);
        console.log(reason_for_delay);
        if(!pub_date || !ed_name || !schedule_time || !actual_time || !difference_time || !no_of_pages || !reason_for_delay || !unit || !pub){
            return res.status(400).json({message:"Please fill all the fields"});
        }
        //sending reason for delay as " "(empty) if no reason for delay(as time diff is "0")
        //if no diff time both the reason as "" and diff time 0 has to be sent and make if delay required of the reason of delay so that not empty it is
        const delay_required = difference_time != "0" ? true : false; //if delay then as "0" else a string so 
        //if there is a delay then
        //diff_time is "0" in req obj and reason is " " VVIP
        if(delay_required){
            const result = await pool.request().query(`insert into scheduling (pub_date,ed_name,schedule_time,actual_time,difference_time,no_of_pages,reason_for_delay,unit,pub) values('${pub_date}','${ed_name}','${schedule_time}','${actual_time}','${difference_time}',${no_of_pages},'${reason_for_delay}','${unit}','${pub}');`);
            console.log(result);
            res.status(200).send({message: "Scheduling entry saved"});
        }
        else{
            const result = await pool.request().query(`insert into scheduling (pub_date,ed_name,schedule_time,actual_time,difference_time,no_of_pages,reason_for_delay,unit,pub) values('${pub_date}','${ed_name}','${schedule_time}','${actual_time}','00:00:00',${no_of_pages},null,'${unit}','${pub}');`);
            console.log(result);
            res.status(200).send({message: "Scheduling entry saved"});
        }
    }catch(error){
        console.log(error);
        throw error;
    }
}

async function editorial_entry(req,res){
    try{
        const pool = await sql.connect(config);
        const user_id = req.user_id;//got directly from the req object
        const {pub_date,ed_name,schedule_time,actual_time,difference_time,reason_for_delay,unit,pub} = req.body;
        console.log(difference_time);
        console.log(reason_for_delay);
        if(!pub_date || !ed_name || !schedule_time || !actual_time || !difference_time || !reason_for_delay || !unit || !pub){
            return res.status(400).json({message:"Please fill all the fields"});
        }
        //sending reason for delay as " "(empty) if no reason for delay(as time diff is "0")
        //if no diff time both the reason as "" and diff time 0 has to be sent and make if delay required of the reason of delay so that not empty it is
        const delay_required = difference_time != "0" ? true : false; //if delay then as "0" else a string so 
        //if there is a delay then
        //diff_time is "0" in req obj and reason is " " VVIP
        if(delay_required){
            const result = await pool.request().query(`insert into editorial (pub_date,ed_name,schedule_time,actual_time,difference_time,reason_for_delay,unit,pub) values('${pub_date}','${ed_name}','${schedule_time}','${actual_time}','${difference_time}','${reason_for_delay}','${unit}','${pub}');`);
            console.log(result);
            res.status(200).send({message: "Editorial entry saved"});
        }
        else{
            const result = await pool.request().query(`insert into editorial (pub_date,ed_name,schedule_time,actual_time,difference_time,reason_for_delay,unit,pub) values('${pub_date}','${ed_name}','${schedule_time}','${actual_time}','00:00:00','NA','${unit}','${pub}');`);
            console.log(result);
            res.status(200).send({message: "Editorial entry saved"});
        }
    }catch(error){
        console.log(error);
        throw error;
    }
}

async function prepress_entry(req,res){
    try{
        const pool = await sql.connect(config);
        const user_id = req.user_id;//got directly from the req object
        const {pub_date,ed_name,schedule_time,actual_time,difference_time,reason_for_delay,unit,pub} = req.body;
        console.log(difference_time);
        console.log(reason_for_delay);
        if(!pub_date || !ed_name || !schedule_time || !actual_time || !difference_time || !reason_for_delay || !unit || !pub){
            return res.status(400).json({message:"Please fill all the fields"});
        }
        //sending reason for delay as " "(empty) if no reason for delay(as time diff is "0")
        //if no diff time both the reason as "" and diff time 0 has to be sent and make if delay required of the reason of delay so that not empty it is
        const delay_required = difference_time != "0" ? true : false; //if delay then as "0" else a string so 
        //if there is a delay then
        //diff_time is "0" in req obj and reason is " " VVIP
        if(delay_required){
            const result = await pool.request().query(`insert into prepress (pub_date,ed_name,schedule_time,actual_time,difference_time,reason_for_delay,unit,pub) values('${pub_date}','${ed_name}','${schedule_time}','${actual_time}','${difference_time}','${reason_for_delay}','${unit}','${pub}');`);
            console.log(result);
            res.status(200).send({message: "Prepress entry saved"});
        }
        else{
            const result = await pool.request().query(`insert into prepress (pub_date,ed_name,schedule_time,actual_time,difference_time,reason_for_delay,unit,pub) values('${pub_date}','${ed_name}','${schedule_time}','${actual_time}','00:00:00','NA','${unit}','${pub}');`);
            console.log(result);
            res.status(200).send({message: "Prepress entry saved"});
        }
    }catch(error){
        console.log(error);
        throw error;
    }
}
async function machinestops_entry(req,res){
    try{
        const pool = await sql.connect(config);
        const user_id = req.user_id;//got directly from the req object
        const {pub_date,ed_name,unit,pub,reason_for_stoppage,stop_from_time,stop_end_time} = req.body;
        
        if(!pub_date || !ed_name || !unit || !pub || !reason_for_stoppage || !stop_from_time || !stop_end_time){
            return res.status(400).json({message:"Please fill all the fields"});
        }
        //this is only when the machine stop so req to backend only when the entry done so that all fields is send
        const result = await pool.request().query(`insert into machine_stops (pub_date,ed_name,unit,pub,reason_for_stoppage,stop_from_time,stop_end_time) values('${pub_date}','${ed_name}','${unit}','${pub}','${reason_for_stoppage}','${stop_from_time}','${stop_end_time}');`);
        console.log(result);
        res.status(200).send({message: "Machine_Stops entry saved"});
       
    }catch(error){
        console.log(error);
        throw error;
    }
}

async function ctp_entry(req,res){
    try{
        const pool = await sql.connect(config);
        const user_id = req.user_id;//got directly from the req object
        const {pub_date,ed_name,schedule_time,actual_time,difference_time,reason_for_delay,unit,pub,total_no_of_pages,black_and_white_pages,color_pages,no_of_plates} = req.body;
        console.log(difference_time);
        console.log(reason_for_delay);
        if(!pub_date || !ed_name || !schedule_time || !actual_time || !difference_time || !reason_for_delay || !unit || !pub || !total_no_of_pages || !black_and_white_pages || !color_pages || !no_of_plates){
            return res.status(400).json({message:"Please fill all the fields"});
        }
        //sending reason for delay as " "(empty) if no reason for delay(as time diff is "0")
        //if no diff time both the reason as "" and diff time 0 has to be sent and make if delay required of the reason of delay so that not empty it is
        //and the frontend checking for the no of pages entry check is equal to color+black and also no of plates calci
        const delay_required = difference_time != "0" ? true : false; //if delay then as "0" else a string so 
        //if there is a delay then
        //diff_time is "0" in req obj and reason is " " VVIP
        //the pages and all is number
        if(delay_required){
            const result = await pool.request().query(`insert into ctp (pub_date,ed_name,schedule_time,actual_time,difference_time,reason_for_delay,unit,pub,total_no_of_pages,black_and_white_pages,color_pages,no_of_plates) values('${pub_date}','${ed_name}','${schedule_time}','${actual_time}','${difference_time}','${reason_for_delay}','${unit}','${pub}',${total_no_of_pages},${black_and_white_pages},${color_pages},${no_of_plates});`);
            console.log(result);
            res.status(200).send({message: "CTP entry saved"});
        }
        else{
            const result = await pool.request().query(`insert into ctp (pub_date,ed_name,schedule_time,actual_time,difference_time,reason_for_delay,unit,pub,total_no_of_pages,black_and_white_pages,color_pages,no_of_plates) values('${pub_date}','${ed_name}','${schedule_time}','${actual_time}','00:00:00','NA','${unit}','${pub}',${total_no_of_pages},${black_and_white_pages},${color_pages},${no_of_plates});`);
            console.log(result);
            res.status(200).send({message: "CTP entry saved"});
        }
    }catch(error){
        console.log(error);
        throw error;
    }
}

async function production_entry(req,res){
    try{
        const pool = await sql.connect(config);
        const user_id = req.user_id;//got directly from the req object
        const {pub_date,ed_name,schedule_time,actual_time,difference_time,reason_for_delay,unit,pub,machine_used,print_order,page_size,print_start_time,print_stop_time,gross_copies} = req.body;
        console.log(difference_time);
        console.log(reason_for_delay);
        if(!pub_date || !ed_name || !schedule_time || !actual_time || !difference_time || !reason_for_delay || !unit || !pub || !machine_used || !print_order || !page_size || !print_start_time || !print_stop_time || !gross_copies){
            return res.status(400).json({message:"Please fill all the fields"});
        }
        //sending reason for delay as " "(empty) if no reason for delay(as time diff is "0")
        //if no diff time both the reason as "" and diff time 0 has to be sent and make if delay required of the reason of delay so that not empty it is
        //and the frontend checking for the no of pages entry check is equal to color+black and also no of plates calci
        const delay_required = difference_time != "0" ? true : false; //if delay then as "0" else a string so 
        //if there is a delay then
        //diff_time is "0" in req obj and reason is " " VVIP
        //the pages and all is number,page size is varchar
        //print order and gross copies is number
        if(delay_required){
            const result = await pool.request().query(`insert into Production (pub_date,ed_name,schedule_time,actual_time,difference_time,reason_for_delay,unit,pub,machine_used,print_order,page_size,print_start_time,print_stop_time,gross_copies) values('${pub_date}','${ed_name}','${schedule_time}','${actual_time}','${difference_time}','${reason_for_delay}','${unit}','${pub}','${machine_used}',${print_order},'${page_size}','${print_start_time}','${print_stop_time}',${gross_copies});`);
            console.log(result);
            res.status(200).send({message: "Production entry saved"});
        }
        else{
            const result = await pool.request().query(`insert into Production (pub_date,ed_name,schedule_time,actual_time,difference_time,reason_for_delay,unit,pub,machine_used,print_order,page_size,print_start_time,print_stop_time,gross_copies) values('${pub_date}','${ed_name}','${schedule_time}','${actual_time}','00:00:00','NA','${unit}','${pub}','${machine_used}',${print_order},'${page_size}','${print_start_time}','${print_stop_time}',${gross_copies});`);
            console.log(result);
            res.status(200).send({message: "Production entry saved"});
        }
    }catch(error){
        console.log(error);
        throw error;
    }
}

module.exports = {check_userid,check_password,scheduling_entry,editorial_entry,prepress_entry,machinestops_entry,ctp_entry,production_entry};