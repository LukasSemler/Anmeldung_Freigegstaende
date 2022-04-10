
///////////////////////////////////////////////////////////////////////////
//////////////////////////// Dependencies /////////////////////////////////
///////////////////////////////////////////////////////////////////////////

const fetch = require('node-fetch'); 
const colors = require('colors/safe') 
const dateFormat = require('dateformat')

var exports = module.exports = {}; // to make thing easier to export


///////////////////////////////////////////////////////////////////////////
///////////////////////////////// Code ////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

//get the sessionId, personId and personType from Webuntis
exports.getSession = async(schoolName, userName, password) => {

    let res = await fetch(`https://melpomene.webuntis.com/WebUntis/jsonrpc.do?school=${schoolName}`, {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        "id": "1",
        "method": "authenticate",
        "params": 
            {"user": userName, "password": password, "client": "jsclient"}, 
        "jsonrpc": "2.0"
        })
    })

    let json = await res.json();

    if(json.error == undefined){ 
        return json.result
    }else{
        throw new Error(colors.red(json.error.message)) 
    }
}

//get timetable of current day 
exports.getTimetable = async (sessionId, personType, personId, startDate, endDate) => {
    let res = await fetch(`https://melpomene.webuntis.com/WebUntis/jsonrpc.do;jsessionid=${sessionId}?school=htl-ottakring`, { //post request to the WebUntis API
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        "id":"ID",
        "method":"getTimetable", 
        "params": 
            {
            "options": 
                { 
                    "element": {"id": personId, "type": personType, "keyType": "id"},  
                    "klasseFields": ["id", "name", "longname"],
                    "roomFields": ["id", "name", "longname"],
                    "subjectFields": ["id", "name", "longname"],
                    "teacherFields": ["id", "name"],
                    "startDate": startDate == undefined ? "" : startDate ,  // Format: yyyymmdd
                    "endDate": endDate == undefined ? "" : endDate  // Format: yyyymmdd
                }
            },
        "jsonrpc":"2.0",
        })
    })
    
    let json = await res.json();

    if(json.error == undefined){ 
        if (json.result[0] !=  undefined) {
            return await sortTimetable(json.result)
        }
    }else{
        throw new Error(colors.red(json.error.message)) 
    }
}

//get the timetable for the current week
exports.getCurrentWeekTimetable = async (sessionId, personType, personId) => {
    let monday = getMonday()
    let res = await fetch(`https://melpomene.webuntis.com/WebUntis/jsonrpc.do;jsessionid=${sessionId}?school=htl-ottakring`, { //post request to the WebUntis API
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        "id":"ID",
        "method":"getTimetable", 
        "params": 
            {
            "options": 
                { 
                    "element": {"id": personId, "type": personType, "keyType": "id"},  
                    "klasseFields": ["id", "name", "longname"],
                    "roomFields": ["id", "name", "longname"],
                    "subjectFields": ["id", "name", "longname"],
                    "teacherFields": ["id", "name"],
                    "startDate": dateFormat(new Date(monday), 'yyyymmdd'),
                    "endDate": dateFormat(new Date(monday + 432000000), 'yyyymmdd')
                }
            },
        "jsonrpc":"2.0",
        })
    })
    
    let json = await res.json();

    if(json.error == undefined){ 
        if (json.result[0] !=  undefined) {
            return await sortTimetable(json.result)
        }
    }else{
        throw new Error(colors.red(json.error.message)) 
    }
}

//get all teachers 
exports.getTeachers = async (sessionId) => {
    let res = await fetch(`https://melpomene.webuntis.com/WebUntis/jsonrpc.do;jsessionid=${sessionId}?school=htl-ottakring`, { //post request to the WebUntis API
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        "id":"ID",
        "method":"getTeachers", 
        "params": {},
        "jsonrpc":"2.0",
        })
    })
    
    let json = await res.json();

    if(json.error == undefined){ 
        return json.result
    }else{
        throw new Error(colors.red(json.error.message)) 
    }
}

//get all students 
exports.getStudents = async (sessionId) => {
    let res = await fetch(`https://melpomene.webuntis.com/WebUntis/jsonrpc.do;jsessionid=${sessionId}?school=htl-ottakring`, { //post request to the WebUntis API
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        "id":"ID",
        "method":"getStudents", 
        "params": {},
        "jsonrpc":"2.0",
        })
    })
    
    let json = await res.json();

    if(json.error == undefined){ 
        return json.result
    }else{
        throw new Error(colors.red(json.error.message)) 
    }
}

//get all (base) classes 
exports.getClasses = async (sessionId, schoolYearId) => {
    let res = await fetch(`https://melpomene.webuntis.com/WebUntis/jsonrpc.do;jsessionid=${sessionId}?school=htl-ottakring`, { //post request to the WebUntis API
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        "id":"ID",
        "method":"getKlassen", 
        "params": {"schoolyearId": schoolYearId},
        "jsonrpc":"2.0",
        })
    })
    
    let json = await res.json();

    if(json.error == undefined){ 
        return json.result
    }else{
        throw new Error(colors.red(json.error.message)) 
    }
}

//get all subjects 
exports.getSubjects = async (sessionId) => {
    let res = await fetch(`https://melpomene.webuntis.com/WebUntis/jsonrpc.do;jsessionid=${sessionId}?school=htl-ottakring`, { //post request to the WebUntis API
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        "id":"ID",
        "method":"getSubjects", 
        "params": {},
        "jsonrpc":"2.0",
        })
    })
    
    let json = await res.json();

    if(json.error == undefined){ 
        return json.result
    }else{
        throw new Error(colors.red(json.error.message)) 
    }
}

//get all rooms 
exports.getRooms = async (sessionId) => {
    let res = await fetch(`https://melpomene.webuntis.com/WebUntis/jsonrpc.do;jsessionid=${sessionId}?school=htl-ottakring`, { //post request to the WebUntis API
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        "id":"ID",
        "method":"getRooms", 
        "params": {},
        "jsonrpc":"2.0",
        })
    })
    
    let json = await res.json();

    if(json.error == undefined){ 
        return json.result
    }else{
        throw new Error(colors.red(json.error.message)) 
    }
}

//get all departments 
exports.getDepartments = async (sessionId) => {
    let res = await fetch(`https://melpomene.webuntis.com/WebUntis/jsonrpc.do;jsessionid=${sessionId}?school=htl-ottakring`, { //post request to the WebUntis API
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        "id":"ID",
        "method":"getDepartments", 
        "params": {},
        "jsonrpc":"2.0",
        })
    })
    
    let json = await res.json();

    if(json.error == undefined){ 
        return json.result
    }else{
        throw new Error(colors.red(json.error.message)) 
    }
}

//get holidays 
exports.getHolidays = async (sessionId) => {
    let res = await fetch(`https://melpomene.webuntis.com/WebUntis/jsonrpc.do;jsessionid=${sessionId}?school=htl-ottakring`, { //post request to the WebUntis API
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        "id":"ID",
        "method":"getHolidays", 
        "params": {},
        "jsonrpc":"2.0",
        })
    })
    
    let json = await res.json();

    if(json.error == undefined){ 
        return json.result
    }else{
        throw new Error(colors.red(json.error.message)) 
    }
}

//get timeGrid 
exports.getTimeGrid = async (sessionId) => {
    let res = await fetch(`https://melpomene.webuntis.com/WebUntis/jsonrpc.do;jsessionid=${sessionId}?school=htl-ottakring`, { //post request to the WebUntis API
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        "id":"ID",
        "method":"getTimegridUnits", 
        "params": {},
        "jsonrpc":"2.0",
        })
    })
    
    let json = await res.json();

    if(json.error == undefined){ 
        return json.result
    }else{
        throw new Error(colors.red(json.error.message)) 
    }
}

//get statusData 
exports.getStatusData = async (sessionId) => {
    let res = await fetch(`https://melpomene.webuntis.com/WebUntis/jsonrpc.do;jsessionid=${sessionId}?school=htl-ottakring`, { //post request to the WebUntis API
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        "id":"ID",
        "method":"getStatusData", 
        "params": {},
        "jsonrpc":"2.0",
        })
    })
    
    let json = await res.json();

    if(json.error == undefined){ 
        return json.result
    }else{
        throw new Error(colors.red(json.error.message)) 
    }
}

//get currentSchoolYear 
exports.getCurrentSchoolYear = async (sessionId) => {
    let res = await fetch(`https://melpomene.webuntis.com/WebUntis/jsonrpc.do;jsessionid=${sessionId}?school=htl-ottakring`, { //post request to the WebUntis API
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        "id":"ID",
        "method":"getCurrentSchoolyear", 
        "params": {},
        "jsonrpc":"2.0",
        })
    })
    
    let json = await res.json();

    if(json.error == undefined){ 
        return json.result
    }else{
        throw new Error(colors.red(json.error.message)) 
    }
}

//get schoolYears 
exports.getSchoolYears = async (sessionId) => {
    let res = await fetch(`https://melpomene.webuntis.com/WebUntis/jsonrpc.do;jsessionid=${sessionId}?school=htl-ottakring`, { //post request to the WebUntis API
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        "id":"ID",
        "method":"getSchoolyears", 
        "params": {},
        "jsonrpc":"2.0",
        })
    })
    
    let json = await res.json();

    if(json.error == undefined){ 
        return json.result
    }else{
        throw new Error(colors.red(json.error.message)) 
    }
}

//get latestImportTime 
exports.getLatestImportTime = async (sessionId) => {
    let res = await fetch(`https://melpomene.webuntis.com/WebUntis/jsonrpc.do;jsessionid=${sessionId}?school=htl-ottakring`, { //post request to the WebUntis API
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        "id":"ID",
        "method":"getLatestImportTime", 
        "params": {},
        "jsonrpc":"2.0",
        })
    })
    
    let json = await res.json();

    if(json.error == undefined){ 
        return json.result
    }else{
        throw new Error(colors.red(json.error.message)) 
    }
}

//get substitutions
exports.getSubstitutions = async (sessionId, startDate, endDate, departmentId) => {
    let res = await fetch(`https://melpomene.webuntis.com/WebUntis/jsonrpc.do;jsessionid=${sessionId}?school=htl-ottakring`, { //post request to the WebUntis API
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        "id":"ID",
        "method":"getSubstitutions", 
        "params": {
            "startDate": startDate,
            "endDate": endDate,
            "departmentId": departmentId == undefined ? 0 : departmentId
        },
        "jsonrpc":"2.0",
        })
    })
    
    let json = await res.json();

    if(json.error == undefined){ 
        return json.result
    }else{
        throw new Error(colors.red(json.error.message)) 
    }
}

//get timetableWithAbsences 
exports.getTimetableWithAbsences= async (sessionId, startDate, endDate) => {
    let res = await fetch(`https://melpomene.webuntis.com/WebUntis/jsonrpc.do;jsessionid=${sessionId}?school=htl-ottakring`, { //post request to the WebUntis API
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        "id":"ID",
        "method":"getTimetableWithAbsences", 
        "params": {
            "options": {
                "startDate": startDate, // Format: yyyymmdd
                "endDate": endDate // Format: yyyymmdd
            }
        },
        "jsonrpc":"2.0",
        })
    })
    
    let json = await res.json();

    if(json.error == undefined){ 
        return json.result
    }else{
        throw new Error(colors.red(json.error.message)) 
    }
}

//Loging out 
exports.Logout = async(sessionID) => {
    let res =  await fetch("https://melpomene.webuntis.com/WebUntis/jsonrpc.do;jsessionid=" + sessionID + "?school=htl-ottakring", {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        "id":"ID",
        "method":"logout",
        "params":{},
        "jsonrpc":"2.0"
        })
    })
       
    let json = await res.json();

    if(json.error == undefined){ 
        console.log(colors.green("Successfully logged out"))
    }else{
        throw new Error(colors.red(json.error.message)) 
    }

}

//gets the first day of the week
getMonday = () => {
let time = Date.now();
    let dayOfWeek = dateFormat(new Date(), "N");
    for (let i = 0; i < dayOfWeek-1; i++) {
        time -= 86400000;        
    }

    //console.log(dateFormat(new Date(time), "yyyymmdd"));
    return time;
}

sortTimetable = async (rawTimetable) => {
    
    let timetable = []

    rawTimetable.sort((a, b) => { return a.date - b.date;}); //sorts the WebUntis data after the date
    
    let firstDay =  new Date(`${rawTimetable[0].date.toString().slice(0, 4)}-${rawTimetable[0].date.toString().slice(4, 6)}-${rawTimetable[0].date.toString().slice(6, 8)}`).getTime();
    let lastDay =  new Date(`${rawTimetable[rawTimetable.length - 1].date.toString().slice(0, 4)}-${rawTimetable[rawTimetable.length - 1].date.toString().slice(4, 6)}-${rawTimetable[rawTimetable.length - 1].date.toString().slice(6, 8)}`).getTime();
    
    let daysCount = Math.ceil(Math.abs(lastDay - firstDay) / (1000 * 3600 * 24)) + 1

    for (let i = 0; i < daysCount; i++) {
        let date = dateFormat(new Date(firstDay), 'yyyymmdd')
        let day = rawTimetable.filter(lesson => lesson.date == date)
        
        day.sort((a, b) => { return a.startTime - b.startTime})
        
        timetable[i] = day
        firstDay += 86400000
    }

    return Promise.resolve(timetable);
}