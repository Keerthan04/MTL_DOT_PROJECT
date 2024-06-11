
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

async function getActive(user_id){
    try{
        const pool = await sql.connect(config);
        const result = await pool.request().query(`select isActive from Login where user_id = '${user_id}'`);
        if(result.recordsets.length === 0){
            return null;
        }
        else{
            return result.recordsets[0][0].isActive;
        }
    }
    catch(error){
        console.log(error);
        throw error;
    }
}
async function send_unit_pub_edition(req,res){
    try{
        //shd get unit then shd get publication and then for each pair get edition name if not there send empty array  for edition else send editions finally shd send unit and array then publication then array and edition and then its
        const pool = await sql.connect(config);
        const units = await pool.request().query(`select Unit from Unit`);
        const unit_names = units.recordset.map((unit)=>unit.Unit);
        console.log(unit_names);
        const Publications= await pool.request().query(`select Publication from Publication`);
        const Publication_names = Publications.recordset.map((pub)=>pub.Publication);
        console.log(Publication_names);
        let editions = [];
        for(let i =0;i< unit_names.length ;i++){
            const currentUnit = unit_names[i];
            for(let i = 0 ;i <Publication_names.length;i++){
                const currentPublication = Publication_names[i];
                const Editions = await pool.request().query(`select Ed_name from Edition where Unit = '${currentUnit}' and Publication = '${currentPublication}'`);
                const Edition_names = Editions.recordset.map((edition)=>edition.Ed_name);
                if(Edition_names.length === 0){
                    editions.push({unit:currentUnit , publication : currentPublication ,edition : ["No edition available"]})
                }
                else{
                    editions.push({unit:currentUnit , publication : currentPublication ,edition : Edition_names})
                    
                }
            }
        }
        console.log({unit:unit_names,publication:Publication_names,edition:editions});
        res.status(200).json({unit:unit_names,publication:Publication_names,edition:editions});
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
        const delay_required = difference_time != "00:00:00" ? true : false; //if delay then as "0" else a string so 
        //if there is a delay then
        //diff_time is "0" in req obj and reason is " " VVIP
        if(delay_required){
            const result = await pool.request().query(`insert into scheduling (pub_date,ed_name,schedule_time,actual_time,difference_time,no_of_pages,reason_for_delay,unit,publication) values('${pub_date}','${ed_name}','${schedule_time}','${actual_time}','${difference_time}',${no_of_pages},'${reason_for_delay}','${unit}','${pub}');`);
            console.log(result);
            res.status(200).send({message: "Scheduling entry saved"});
        }
        else{
            const result = await pool.request().query(`insert into scheduling (pub_date,ed_name,schedule_time,actual_time,difference_time,no_of_pages,reason_for_delay,unit,publication) values('${pub_date}','${ed_name}','${schedule_time}','${actual_time}','00:00:00',${no_of_pages},null,'${unit}','${pub}');`);
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
        const delay_required = difference_time != "00:00:00" ? true : false; //if delay then as "0" else a string so 
        //if there is a delay then
        //diff_time is "0" in req obj and reason is " " VVIP
        if(delay_required){
            const result = await pool.request().query(`insert into editorial (pub_date,ed_name,schedule_time,actual_time,difference_time,reason_for_delay,unit,publication) values('${pub_date}','${ed_name}','${schedule_time}','${actual_time}','${difference_time}','${reason_for_delay}','${unit}','${pub}');`);
            console.log(result);
            res.status(200).send({message: "Editorial entry saved"});
        }
        else{
            const result = await pool.request().query(`insert into editorial (pub_date,ed_name,schedule_time,actual_time,difference_time,reason_for_delay,unit,publication) values('${pub_date}','${ed_name}','${schedule_time}','${actual_time}','00:00:00','NA','${unit}','${pub}');`);
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
        const delay_required = difference_time != "00:00:00" ? true : false; //if delay then as "0" else a string so 
        console.log(delay_required);
        //if there is a delay then
        //diff_time is "0" in req obj and reason is " " VVIP
        if(delay_required){
            const result = await pool.request().query(`insert into prepress (pub_date,ed_name,schedule_time,actual_time,difference_time,reason_for_delay,unit,publication) values('${pub_date}','${ed_name}','${schedule_time}','${actual_time}','${difference_time}','${reason_for_delay}','${unit}','${pub}');`);
            console.log(result);
            res.status(200).send({message: "Prepress entry saved"});
        }
        else{
            const result = await pool.request().query(`insert into prepress (pub_date,ed_name,schedule_time,actual_time,difference_time,reason_for_delay,unit,publication) values('${pub_date}','${ed_name}','${schedule_time}','${actual_time}','00:00:00','NA','${unit}','${pub}');`);
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
        const {pub_date,ed_name,unit,pub,reason_for_stoppage,printer_stop_time,printer_restart_time} = req.body;
        
        if(!pub_date || !ed_name || !unit || !pub || !reason_for_stoppage || !printer_stop_time || !printer_restart_time){
            return res.status(400).json({message:"Please fill all the fields"});
        }
        //this is only when the machine stop so req to backend only when the entry done so that all fields is send
        const result = await pool.request().query(`insert into machine_stops (pub_date,ed_name,unit,publication,reason_for_stoppage,printer_stop_time,printer_restart_time) values('${pub_date}','${ed_name}','${unit}','${pub}','${reason_for_stoppage}','${printer_stop_time}','${printer_restart_time}');`);
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
        const {pub_date,ed_name,schedule_time,actual_time,difference_time,reason_for_delay,unit,pub,total_no_of_pages,black_and_white_pages,color_pages,calculated_no_of_plates,actual_no_of_plates,reason_for_difference} = req.body;
        console.log(difference_time);
        console.log(reason_for_delay);
        if(!pub_date || !ed_name || !schedule_time || !actual_time || !difference_time || !reason_for_delay || !unit || !pub || !total_no_of_pages || !black_and_white_pages || !color_pages || !calculated_no_of_plates || !actual_no_of_plates || !reason_for_difference){
            return res.status(400).json({message:"Please fill all the fields"});
        }
        //sending reason for delay as " "(empty) if no reason for delay(as time diff is "0")
        //if no diff time both the reason as "" and diff time 0 has to be sent and make if delay required of the reason of delay so that not empty it is
        //and the frontend checking for the no of pages entry check is equal to color+black and also no of plates calci
        const delay_required = difference_time != "00:00:00" ? true : false;   //if delay then as "0" else a string so 
        //if there is a delay then
        //diff_time is "0" in req obj and reason is " " VVIP
        //IMP
        //the calculated is only number others are not
        if(delay_required){
            const result = await pool.request().query(`insert into ctp (pub_date,ed_name,schedule_time,actual_time,difference_time,reason_for_delay,unit,publication,total_no_of_pages,black_and_white_pages,color_pages,calculated_no_of_plates,actual_no_of_plates,reason_for_difference) values('${pub_date}','${ed_name}','${schedule_time}','${actual_time}','${difference_time}','${reason_for_delay}','${unit}','${pub}','${total_no_of_pages}','${black_and_white_pages}','${color_pages}',${calculated_no_of_plates},'${actual_no_of_plates}','${reason_for_difference}');`);
            console.log(result);
            res.status(200).send({message: "CTP entry saved"});
        }
        else{
            const result = await pool.request().query(`insert into ctp (pub_date,ed_name,schedule_time,actual_time,difference_time,reason_for_delay,unit,publication,total_no_of_pages,black_and_white_pages,color_pages,calculated_no_of_plates,actual_no_of_plates,reason_for_difference) values('${pub_date}','${ed_name}','${schedule_time}','${actual_time}','00:00:00','NA','${unit}','${pub}','${total_no_of_pages}','${black_and_white_pages}','${color_pages}',${calculated_no_of_plates},'${actual_no_of_plates}','${reason_for_difference}');`);
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
        const {pub_date,ed_name,schedule_time,actual_time,difference_time,reason_for_delay,unit,pub,machine_used,print_order,page_size,print_start_time,print_stop_time,gross_copies,Towers} = req.body;
        console.log(difference_time);
        console.log(reason_for_delay);
        if(!pub_date || !ed_name || !schedule_time || !actual_time || !difference_time || !reason_for_delay || !unit || !pub || !machine_used || !print_order || !page_size || !print_start_time || !print_stop_time || !gross_copies || !Towers){
            return res.status(400).json({message:"Please fill all the fields"});
        }
        //sending reason for delay as " "(empty) if no reason for delay(as time diff is "0")
        //if no diff time both the reason as "" and diff time 0 has to be sent and make if delay required of the reason of delay so that not empty it is
        //and the frontend checking for the no of pages entry check is equal to color+black and also no of plates calci
        const delay_required = difference_time != "00:00:00" ? true : false; //if delay then as "0" else a string so 
        //if there is a delay then
        //diff_time is "00:00:00" in req obj and reason is " " VVIP as diff time is now calculated so
        //the pages and all is number,page size is varchar
        //print order and gross copies is number
        if(delay_required){
            const result = await pool.request().query(`insert into Production (pub_date,ed_name,schedule_time,actual_time,difference_time,reason_for_delay,unit,publication,machine_used,print_order,page_size,print_start_time,print_stop_time,gross_copies,towers) values('${pub_date}','${ed_name}','${schedule_time}','${actual_time}','${difference_time}','${reason_for_delay}','${unit}','${pub}','${machine_used}',${print_order},'${page_size}','${print_start_time}','${print_stop_time}',${gross_copies},'${Towers}');`);
            console.log(result);
            res.status(200).send({message: "Production entry saved"});
        }
        else{
            const result = await pool.request().query(`insert into Production (pub_date,ed_name,schedule_time,actual_time,difference_time,reason_for_delay,unit,publication,machine_used,print_order,page_size,print_start_time,print_stop_time,gross_copies,towers) values('${pub_date}','${ed_name}','${schedule_time}','${actual_time}','00:00:00','NA','${unit}','${pub}','${machine_used}',${print_order},'${page_size}','${print_start_time}','${print_stop_time}',${gross_copies},'${Towers}');`);
            console.log(result);
            res.status(200).send({message: "Production entry saved"});
        }
    }catch(error){
        console.log(error);
        throw error;
    }
}
async function get_machines(req,res){
    try{
        const pool = await sql.connect(config);
        const machines = await pool.request().query(`select name from machine_name`);
        console.log(machines.recordset);
        //is of array of objects with name: ""
        const machine_names = machines.recordset.map((machine)=>machine.name);//gets as array of machine_names
        console.log(machine_names);
        let result = [];
        for(let i=0; i< machine_names.length; i++){
            const towers = await pool.request().query(`select tower from machines where machine_used = '${machine_names[i]}'`);
            //array of objects with tower and name as key and value
            const tower_name = towers.recordset.map((tower)=>tower.tower);
            console.log(tower_name);
            result.push({name:machine_names[i],towers:tower_name});
        }
        console.log(result);
        // console.log(result);
        // res.status(200).send({machines:result.recordset});
        res.status(200).send(result);
        //want result as array of object with each obj being having name and tower as key and name and set of towers inarray and values
    }catch(error){
        console.log(error);
        throw error;
    }
}

//the format of response is 
// {
//     "message": "Production report fetched",
//     "records": [
//       {
//         "pub_date": "2003-06-19T00:00:00.000Z",
//         "ed_name": "Manipal",
//         "schedule_time": "1970-01-01T10:50:00.000Z",
//         "actual_time": "1970-01-01T11:50:00.000Z",
//         "difference_time": "1970-01-01T01:00:00.000Z",
//         "no_of_pages": 12,
//         "reason_for_delay": "Reel Break",
//         "unit": "Manipal",
//         "pub": "Udayavani"
//       }
//      ]
//so the format of the date shd be changed so that only yyyy-mm-dd shd come
 // Make sure to configure your database connection



async function scheduling_report(req, res) {
    try {
        const pool = await sql.connect(config);
        const user_id = req.user_id; // Got directly from the req object
        const { unit, pub, ed_name, Publish_from_date, Publish_to_date } = req.body;

        if (!unit || !pub || !ed_name || !Publish_from_date || !Publish_to_date) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // Parameterized query to prevent SQL injection
        const query = `
            SELECT 
                CONVERT(varchar, pub_date, 23) AS pub_date,
                ed_name,
                CONVERT(varchar, schedule_time, 120) AS schedule_time,
                CONVERT(varchar, actual_time, 120) AS actual_time,
                CONVERT(varchar, difference_time, 8) AS difference_time,
                no_of_pages,
                reason_for_delay,
                unit,
                publication
            FROM Scheduling
            WHERE unit = @unit
                AND publication = @pub
                AND ed_name = @ed_name
                AND pub_date BETWEEN @Publish_from_date AND @Publish_to_date
        `;

        const request = pool.request();
        request.input('unit', sql.VarChar, unit);
        request.input('pub', sql.VarChar, pub);
        request.input('ed_name', sql.VarChar, ed_name);
        request.input('Publish_from_date', sql.Date, Publish_from_date);
        request.input('Publish_to_date', sql.Date, Publish_to_date);

        const result = await request.query(query);
        console.log(result.recordset);

        if (result.recordset.length > 0) {
            return res.status(200).send({ message: "Scheduling report fetched", records: result.recordset });
        } else {
            return res.status(404).send({ message: "No records found" });
        }
    } catch (error) {
        console.error("Error fetching scheduling report:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
}



async function editorial_report(req, res) {
    try {
        const pool = await sql.connect(config);
        const user_id = req.user_id; // Got directly from the req object
        const { unit, pub, ed_name, Publish_from_date, Publish_to_date } = req.body;

        if (!unit || !pub || !ed_name || !Publish_from_date || !Publish_to_date) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // Parameterized query to prevent SQL injection
        const query = `
            SELECT 
                CONVERT(varchar, pub_date, 23) AS pub_date,
                ed_name,
                CONVERT(varchar, schedule_time, 120) AS schedule_time,
                CONVERT(varchar, actual_time, 120) AS actual_time,
                CONVERT(varchar, difference_time, 8) AS difference_time,
                reason_for_delay,
                unit,
                publication
            FROM Editorial
            WHERE unit = @unit
                AND publication = @pub
                AND ed_name = @ed_name
                AND pub_date BETWEEN @Publish_from_date AND @Publish_to_date
        `;

        const request = pool.request();
        request.input('unit', sql.VarChar, unit);
        request.input('pub', sql.VarChar, pub);
        request.input('ed_name', sql.VarChar, ed_name);
        request.input('Publish_from_date', sql.Date, Publish_from_date);
        request.input('Publish_to_date', sql.Date, Publish_to_date);

        const result = await request.query(query);
        console.log(result.recordset);

        if (result.recordset.length > 0) {
            res.status(200).send({ message: "Editorial report fetched", records: result.recordset });
        } else {
            res.status(200).send({ message: "No records found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

async function ctp_report(req, res) {
    try {
        const pool = await sql.connect(config);
        const user_id = req.user_id; // Got directly from the req object
        const { unit, pub, ed_name, Publish_from_date, Publish_to_date } = req.body;

        if (!unit || !pub || !ed_name || !Publish_from_date || !Publish_to_date) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // Parameterized query to prevent SQL injection
        const query = `
            SELECT 
                CONVERT(varchar, pub_date, 23) AS pub_date,
                ed_name,
                CONVERT(varchar, schedule_time, 120) AS schedule_time,
                CONVERT(varchar, actual_time, 120) AS actual_time,
                CONVERT(varchar, difference_time, 8) AS difference_time,
                reason_for_delay,
                unit,
                publication,
                total_no_of_pages,
                black_and_white_pages,
                color_pages,
                calculated_no_of_plates,
                actual_no_of_plates,
                reason_for_difference
            FROM ctp
            WHERE unit = @unit
                AND publication = @pub
                AND ed_name = @ed_name
                AND pub_date BETWEEN @Publish_from_date AND @Publish_to_date
        `;

        const request = pool.request();
        request.input('unit', sql.VarChar, unit);
        request.input('pub', sql.VarChar, pub);
        request.input('ed_name', sql.VarChar, ed_name);
        request.input('Publish_from_date', sql.Date, Publish_from_date);
        request.input('Publish_to_date', sql.Date, Publish_to_date);

        const result = await request.query(query);
        console.log(result.recordset);

        if (result.recordset.length > 0) {
            res.status(200).send({ message: "CTP report fetched", records: result.recordset });
        } else {
            res.status(200).send({ message: "No records found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

async function prepress_report(req, res) {
    try {
        const pool = await sql.connect(config);
        const user_id = req.user_id; // Got directly from the req object
        const { unit, pub, ed_name, Publish_from_date, Publish_to_date } = req.body;

        if (!unit || !pub || !ed_name || !Publish_from_date || !Publish_to_date) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // Parameterized query to prevent SQL injection
        const query = `
            SELECT 
                CONVERT(varchar, pub_date, 23) AS pub_date,
                ed_name,
                CONVERT(varchar, schedule_time, 120) AS schedule_time,
                CONVERT(varchar, actual_time, 120) AS actual_time,
                CONVERT(varchar, difference_time, 8) AS difference_time,
                reason_for_delay,
                unit,
                publication
            FROM Prepress
            WHERE unit = @unit
                AND publication = @pub
                AND ed_name = @ed_name
                AND pub_date BETWEEN @Publish_from_date AND @Publish_to_date
        `;

        const request = pool.request();
        request.input('unit', sql.VarChar, unit);
        request.input('pub', sql.VarChar, pub);
        request.input('ed_name', sql.VarChar, ed_name);
        request.input('Publish_from_date', sql.Date, Publish_from_date);
        request.input('Publish_to_date', sql.Date, Publish_to_date);

        const result = await request.query(query);
        console.log(result.recordset);

        if (result.recordset.length > 0) {
            res.status(200).send({ message: "Prepress report fetched", records: result.recordset });
        } else {
            res.status(200).send({ message: "No records found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

async function machine_stop_report(req, res) {
    try {
        const pool = await sql.connect(config);
        const user_id = req.user_id; // Got directly from the req object
        const { unit, pub, ed_name, Publish_from_date, Publish_to_date } = req.body;

        if (!unit || !pub || !ed_name || !Publish_from_date || !Publish_to_date) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // Parameterized query to prevent SQL injection
        const query = `
            SELECT 
                CONVERT(varchar, pub_date, 23) AS pub_date,
                ed_name,
                unit,
                publication,
                reason_for_stoppage,
                CONVERT(varchar, printer_stop_time, 8) AS printer_stop_time,
                CONVERT(varchar, printer_restart_time, 8) AS printer_restart_time
            FROM machine_stops
            WHERE unit = @unit
                AND publication = @pub
                AND ed_name = @ed_name
                AND pub_date BETWEEN @Publish_from_date AND @Publish_to_date
        `;

        const request = pool.request();
        request.input('unit', sql.VarChar, unit);
        request.input('pub', sql.VarChar, pub);
        request.input('ed_name', sql.VarChar, ed_name);
        request.input('Publish_from_date', sql.Date, Publish_from_date);
        request.input('Publish_to_date', sql.Date, Publish_to_date);

        const result = await request.query(query);
        console.log(result.recordset);

        if (result.recordset.length > 0) {
            res.status(200).send({ message: "machine stops report fetched", records: result.recordset });
        } else {
            res.status(200).send({ message: "No records found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

async function production_report(req, res) {
    try {
        const pool = await sql.connect(config);
        const user_id = req.user_id; // Got directly from the req object
        const { unit, pub, ed_name, Publish_from_date, Publish_to_date } = req.body;

        if (!unit || !pub || !ed_name || !Publish_from_date || !Publish_to_date) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // Parameterized query to prevent SQL injection
        const query = `
            SELECT 
                CONVERT(varchar, pub_date, 23) AS pub_date,
                ed_name,
                unit,
                publication,
                CONVERT(varchar, schedule_time, 120) AS schedule_time,
                CONVERT(varchar, actual_time, 120) AS actual_time,
                CONVERT(varchar, difference_time, 8) AS difference_time,
                reason_for_delay,
                machine_used,
                print_order,
                page_size,
                CONVERT(varchar, print_start_time, 8) AS print_start_time,
                CONVERT(varchar, print_stop_time, 8) AS print_stop_time,
                gross_copies,
                Towers
            FROM Production
            WHERE unit = @unit
                AND publication = @pub
                AND ed_name = @ed_name
                AND pub_date BETWEEN @Publish_from_date AND @Publish_to_date
        `;

        const request = pool.request();
        request.input('unit', sql.VarChar, unit);
        request.input('pub', sql.VarChar, pub);
        request.input('ed_name', sql.VarChar, ed_name);
        request.input('Publish_from_date', sql.Date, Publish_from_date);
        request.input('Publish_to_date', sql.Date, Publish_to_date);

        const result = await request.query(query);
        console.log(result.recordset);

        if (result.recordset.length > 0) {
            res.status(200).send({ message: "Production report fetched", records: result.recordset });
        } else {
            res.status(200).send({ message: "No records found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}
module.exports = {check_userid,getActive,check_password,scheduling_entry,editorial_entry,prepress_entry,machinestops_entry,ctp_entry,production_entry,scheduling_report,editorial_report,ctp_report,prepress_report,machine_stop_report,production_report,get_machines,send_unit_pub_edition};