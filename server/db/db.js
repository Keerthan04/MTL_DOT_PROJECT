
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
        const delay_required = difference_time != "00:00:00" ? true : false; //if delay then as "0" else a string so 
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
        const delay_required = difference_time != "00:00:00" ? true : false; //if delay then as "0" else a string so 
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
        const delay_required = difference_time != "00:00:00" ? true : false; //if delay then as "0" else a string so 
        console.log(delay_required);
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
        const delay_required = difference_time != "00:00:00" ? true : false; //if delay then as "0" else a string so 
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
            const result = await pool.request().query(`insert into Production (pub_date,ed_name,schedule_time,actual_time,difference_time,reason_for_delay,unit,pub,machine_used,print_order,page_size,print_start_time,print_stop_time,gross_copies,Towers) values('${pub_date}','${ed_name}','${schedule_time}','${actual_time}','${difference_time}','${reason_for_delay}','${unit}','${pub}','${machine_used}',${print_order},'${page_size}','${print_start_time}','${print_stop_time}',${gross_copies},'${Towers}');`);
            console.log(result);
            res.status(200).send({message: "Production entry saved"});
        }
        else{
            const result = await pool.request().query(`insert into Production (pub_date,ed_name,schedule_time,actual_time,difference_time,reason_for_delay,unit,pub,machine_used,print_order,page_size,print_start_time,print_stop_time,gross_copies,Towers) values('${pub_date}','${ed_name}','${schedule_time}','${actual_time}','00:00:00','NA','${unit}','${pub}','${machine_used}',${print_order},'${page_size}','${print_start_time}','${print_stop_time}',${gross_copies},'${Towers}');`);
            console.log(result);
            res.status(200).send({message: "Production entry saved"});
        }
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

 //so the object array it comes
async function scheduling_report(req, res) {
    try {
        const pool = await sql.connect(config);
        const user_id = req.user_id; // Got directly from the req object
        const { unit, publication, edition, Publish_from_date, Publish_to_date } = req.body;

        if (!unit || !publication || !edition || !Publish_from_date || !Publish_to_date) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // Parameterized query to prevent SQL injection
        const query = `
            SELECT 
                CONVERT(varchar, pub_date, 23) AS pub_date,
                ed_name,
                CONVERT(varchar, schedule_time, 8) AS schedule_time,
                CONVERT(varchar, actual_time, 8) AS actual_time,
                CONVERT(varchar, difference_time, 8) AS difference_time,
                no_of_pages,
                reason_for_delay,
                unit,
                pub
            FROM Scheduling
            WHERE unit = @unit
                AND pub = @publication
                AND ed_name = @edition
                AND pub_date BETWEEN @Publish_from_date AND @Publish_to_date
        `;

        const request = pool.request();
        request.input('unit', sql.VarChar, unit);
        request.input('publication', sql.VarChar, publication);
        request.input('edition', sql.VarChar, edition);
        request.input('Publish_from_date', sql.Date, Publish_from_date);
        request.input('Publish_to_date', sql.Date, Publish_to_date);

        const result = await request.query(query);
        console.log(result.recordset);

        if (result.recordset.length > 0) {
            res.status(200).send({ message: "Scheduling report fetched", records: result.recordset });
        } else {
            res.status(200).send({ message: "No records found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

async function editorial_report(req, res) {
    try {
        const pool = await sql.connect(config);
        const user_id = req.user_id; // Got directly from the req object
        const { unit, publication, edition, Publish_from_date, Publish_to_date } = req.body;

        if (!unit || !publication || !edition || !Publish_from_date || !Publish_to_date) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // Parameterized query to prevent SQL injection
        const query = `
            SELECT 
                CONVERT(varchar, pub_date, 23) AS pub_date,
                ed_name,
                CONVERT(varchar, schedule_time, 8) AS schedule_time,
                CONVERT(varchar, actual_time, 8) AS actual_time,
                CONVERT(varchar, difference_time, 8) AS difference_time,
                reason_for_delay,
                unit,
                pub
            FROM Editorial
            WHERE unit = @unit
                AND pub = @publication
                AND ed_name = @edition
                AND pub_date BETWEEN @Publish_from_date AND @Publish_to_date
        `;

        const request = pool.request();
        request.input('unit', sql.VarChar, unit);
        request.input('publication', sql.VarChar, publication);
        request.input('edition', sql.VarChar, edition);
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
        const { unit, publication, edition, Publish_from_date, Publish_to_date } = req.body;

        if (!unit || !publication || !edition || !Publish_from_date || !Publish_to_date) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // Parameterized query to prevent SQL injection
        const query = `
            SELECT 
                CONVERT(varchar, pub_date, 23) AS pub_date,
                ed_name,
                CONVERT(varchar, schedule_time, 8) AS schedule_time,
                CONVERT(varchar, actual_time, 8) AS actual_time,
                CONVERT(varchar, difference_time, 8) AS difference_time,
                reason_for_delay,
                unit,
                pub,
                total_no_of_pages,
                black_and_white_pages,
                color_pages,
                no_of_plates
            FROM ctp
            WHERE unit = @unit
                AND pub = @publication
                AND ed_name = @edition
                AND pub_date BETWEEN @Publish_from_date AND @Publish_to_date
        `;

        const request = pool.request();
        request.input('unit', sql.VarChar, unit);
        request.input('publication', sql.VarChar, publication);
        request.input('edition', sql.VarChar, edition);
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
        const { unit, publication, edition, Publish_from_date, Publish_to_date } = req.body;

        if (!unit || !publication || !edition || !Publish_from_date || !Publish_to_date) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // Parameterized query to prevent SQL injection
        const query = `
            SELECT 
                CONVERT(varchar, pub_date, 23) AS pub_date,
                ed_name,
                CONVERT(varchar, schedule_time, 8) AS schedule_time,
                CONVERT(varchar, actual_time, 8) AS actual_time,
                CONVERT(varchar, difference_time, 8) AS difference_time,
                reason_for_delay,
                unit,
                pub
            FROM Prepress
            WHERE unit = @unit
                AND pub = @publication
                AND ed_name = @edition
                AND pub_date BETWEEN @Publish_from_date AND @Publish_to_date
        `;

        const request = pool.request();
        request.input('unit', sql.VarChar, unit);
        request.input('publication', sql.VarChar, publication);
        request.input('edition', sql.VarChar, edition);
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
        const { unit, publication, edition, Publish_from_date, Publish_to_date } = req.body;

        if (!unit || !publication || !edition || !Publish_from_date || !Publish_to_date) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // Parameterized query to prevent SQL injection
        const query = `
            SELECT 
                CONVERT(varchar, pub_date, 23) AS pub_date,
                ed_name,
                unit,
                pub,
                reason_for_stoppage,
                CONVERT(varchar, stop_from_time, 8) AS stop_from_time,
                CONVERT(varchar, stop_end_time, 8) AS stop_end_time
            FROM machine_stops
            WHERE unit = @unit
                AND pub = @publication
                AND ed_name = @edition
                AND pub_date BETWEEN @Publish_from_date AND @Publish_to_date
        `;

        const request = pool.request();
        request.input('unit', sql.VarChar, unit);
        request.input('publication', sql.VarChar, publication);
        request.input('edition', sql.VarChar, edition);
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
        const { unit, publication, edition, Publish_from_date, Publish_to_date } = req.body;

        if (!unit || !publication || !edition || !Publish_from_date || !Publish_to_date) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // Parameterized query to prevent SQL injection
        const query = `
            SELECT 
                CONVERT(varchar, pub_date, 23) AS pub_date,
                ed_name,
                unit,
                pub,
                CONVERT(varchar, schedule_time, 8) AS schedule_time,
                CONVERT(varchar, actual_time, 8) AS actual_time,
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
                AND pub = @publication
                AND ed_name = @edition
                AND pub_date BETWEEN @Publish_from_date AND @Publish_to_date
        `;

        const request = pool.request();
        request.input('unit', sql.VarChar, unit);
        request.input('publication', sql.VarChar, publication);
        request.input('edition', sql.VarChar, edition);
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
module.exports = {check_userid,check_password,scheduling_entry,editorial_entry,prepress_entry,machinestops_entry,ctp_entry,production_entry,scheduling_report,editorial_report,ctp_report,prepress_report,machine_stop_report,production_report};