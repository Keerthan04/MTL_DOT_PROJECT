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

app.use((err,req,res,next)=>{
    res.status(500).json({error:err.message || "Internal Server Error"});
});
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
//9. the report thing shd be done yet
//10.the error if fk error and all the violated part and all comes shown as well as if error then stops server so that has to be made proper
//11.the thing that once entry done and saved next entry and all when u type everythinf shd go or any other like a button to be click on new entry and do again
//12. the header change a bit and the home page a bit beautification shd be done or the home thing to do
//13. the database part of master tables and machine and all shd be seen
//14. the retrival shd be checked of small letters and
//do the toggling from the dropdown main and report section as dropdown in all 
//15. th download as pdf shd also have the pub date as name if poss so that we can differentiate
//16.the pdf for production and all looks not neat so to come to next line and all how?(splits to chunks ask ok or the pub date also to come)

//main 
//17. the styling of navbar,the heading of entry and report in bold,the logout functionality,the final report and the dropdowns,the type of report showing confirm and do on editorial and scheduling,the error showing and other routes error showing and also if can cookies and code optimization and testing proper features,home screen better and diff idea or better pictures adding,login page making nice

//the time see,the logout ask confirm,the navbar,the black and all in input of some,diff time make proper and time if am and all make proper

//machine stop db and others of reset and time ka shd be checked
//the new tables added and making dropdown for it to be done
//the final report and excel conversion and all ctp ka plates actual and all to be done also and order of dropdown and navbar
//main click to go to home also 

//tom morning see
//plates done 
//the db change and dropdown pending,new nav ka when mob the color and align and some changes in code of all the nav change wala??
//the home page ka navbar shd be made,the home instead of button div ko hi click shd go,the report mai username ka see



//shd do a global error handling and not throwing errors and also dropdown shd be made to be proper for editions and all
//checking the working of all once u do and the final report do once
//add isvalid check in login and make login page properly----------DONE!!
//when refreshed the username and all lost? so how to make it proper or see to that

//before logout and submit or reset ask again 
//if once error then again wont change or go and all
//proper reason for delay and other things to be checked
//when reset the unit and pub ka reset shd be checked why not happening
//the unit and all in the report also do---DONE!!

//some table col name changes shd be done properly in query like pub as publication date mainly in report also and alos sending and all shd check->mainly the machine stop table and some changes also---DONE!!

//relod done so no reset prob-check like machine stop and all
//all ka working of entry and report seeing done

//the dropdown of unit and pub have for each unit the pub only then the edi based on that only like that
//only the submit and logout and all pop up check
//the machines part is done
//the final report wala do and check

//MAIN NOW
//to do
//diff errors to be checked and done for each in backend and status code and a error handler to be done
//logout also a pop up type thing is to be done
//confirm and handling of reports see
//a git branch other one is being used so see that
//logo problem
//login page also if error in popup thingy like
//the error display if scroll cant see that also check
//the home page and login page size issue--done
//the refresh in reset add and check also in scheduling mainly
//the excel file it wont come or name changes and all shd be done see to that
//if difference is of 1day and all working or not?
//the responsive ness shd be added it is not proper now
//the navbar when close ka behave in responsive shd be seen

//responsiveness of navbar and also when tablet view the responsiveness make proper IMP!!!

//new is
//responsivenss for tab and all and nav proper do,the animation for popup,report popup shd be introduced,excel ka and all check once,docker ka image or something like that we can do check,cors ka made proper,controllers introduced
