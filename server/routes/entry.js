const express = require('express');
const db = require('../db/db')
const entryrouter = express.Router({mergeParams: true});

//entry router is for all the entries to be managed and save them

//route is /home/entry/scheduling and all are post to store it in the
entryrouter.route('/scheduling').post(db.scheduling_entry);
entryrouter.route('/editorial').post(db.editorial_entry);
entryrouter.route('/prepress').post(db.prepress_entry);
entryrouter.route('/machinestops').post(db.machinestops_entry);
entryrouter.route('/ctp').post(db.ctp_entry);
entryrouter.route('/production').post(db.production_entry);

module.exports = entryrouter;