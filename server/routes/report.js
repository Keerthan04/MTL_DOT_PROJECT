const express = require('express');
const reportrouter = express.Router({mergeParams: true});
const db = require('../db/db');
//route is /home/report/
reportrouter.route('/scheduling').post(db.scheduling_report);
// entryrouter.route('/editorial').post(db.editorial_entry);
// entryrouter.route('/prepress').post(db.prepress_entry);
// entryrouter.route('/machinestops').post(db.machinestops_entry);
// entryrouter.route('/ctp').post(db.ctp_entry);
// entryrouter.route('/production').post(db.production_entry);

module.exports = reportrouter;