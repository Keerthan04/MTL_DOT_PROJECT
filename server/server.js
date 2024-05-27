const express = require('express');
const dotenv = require('dotenv')
//const patientRouter = require('./routes/patients');
//const doctorRouter = require('./routes/doctors');
const authRouter = require('./auth/auth');
const cors = require('cors');
//const {verify_doctor} = require('./middleware/verify_doctor');
//const{verify_patient} = require('./middleware/verify_patients');
//const db = require('./db/db');
const { verify_login } = require('./middleware/verify_login');
const homerouter = require('./routes/home');
dotenv.config();
const PORT = process.env.DB_PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>res.send("Welcome to api"));

app.use('/auth',authRouter);

// app.use('/patients',verify_patient, patientRouter);
// app.use('/doctors',verify_doctor, doctorRouter);
app.use('/home',verify_login,homerouter);

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});

//to do
//1.error to check and same error to be put to frontend
//2.time diff and all in frontend only and also to check all the things and adding to body of the req to be handled
//3. some checks of db like triggers same date no and all in backend and all shd be done and its error showing and all
//frontend ka
//4.home page access only if login then only shd be done that also see
//5. the home page ka is done but cookie or anything else shd be done to be better 
//6. machine stops logic shd be cheked
//7. the backend full checking of each req body ka part remaining
//8. the production the printing part shd be made proper like the trigger and all the time ka functionalities shd be checked
module.exports = app;