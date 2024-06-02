const express = require('express');
const reportrouter = express.Router({mergeParams: true});
const db = require('../db/db');
//route is /home/report/
reportrouter.route('/scheduling').post(db.scheduling_report);
reportrouter.route('/editorial').post(db.editorial_report);
reportrouter.route('/prepress').post(db.prepress_report);
reportrouter.route('/machinestops').post(db.machine_stop_report);
reportrouter.route('/ctp').post(db.ctp_report);
reportrouter.route('/production').post(db.production_report);

module.exports = reportrouter;