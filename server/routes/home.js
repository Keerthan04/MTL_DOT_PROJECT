const express = require('express');
const entryrouter = require('./entry');
const reportrouter = require('./report');
const homerouter = express.Router();
const db = require('../db/db');
//main are the reports and the entry things 
homerouter.use('/entry',entryrouter);
homerouter.use('/report',reportrouter);

homerouter.post('/dot',db.dot)
//when at /home send user_id just 
homerouter.get('/',(req,res)=>{
    res.status(200).send({user_id : req.user_id});
})

module.exports = homerouter;
