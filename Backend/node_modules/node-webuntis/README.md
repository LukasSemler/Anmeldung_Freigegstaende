# WebUntis
The purpose of this node.js module is to make the communication with the Webuntis API easier. 
**Please note that some of the requests require special rights that you may not possess.** 

## Contents
* [installation](#Installation)
* [Overall](#Overall)
* [Methods](#Methods)
    * [getSession](#getSession)
    * [getTimetable](#getTimetable)
    * [getCurrentWeekTimetable](#getCurrentWeekTimetable)
    * [getTeachers](#getTeachers)
    * [getStudents](#getStudents)
    * [getClasses](#getClasses)
    * [getSubjects](#getSubjects)
    * [getRooms](#getRooms)
    * [getDepartments](#getDepartments)
    * [getHolidays](#getHolidays)
    * [getTimeGrid](#getTimeGrid)
    * [getCurrentSchoolYear](#getCurrentSchoolYear)
    * [getSchoolYears](#getSchoolYears)
    * [getSubstitutions](#getSubstitutions)
    * [getTimetableWithAbsences](#getTimetableWithAbsences)
    * [Logout](#Logout)


### Installation
````
npm install node-webuntis 
````

### Overall
<table>
<tr><th>personTypes </th>
<tr><td>
    
id| type
---|-----
1|class
2|teacher
3|subject
4|room
5|student
 </table>

# Methods
All methods are working with **promises**. In case you do not know how promises work, go and make yourself familiar with them (they very handy). 

## getSession
#### Parameters
* schoolname
* username 
* password
#### Usage
````js
let session = await getSession(schoolname, username, password)
````
#### Returns
a Object containing the sessionId, personType, personId and klassId of the user which logged in.
````
{ 
  sessionId: '39DA6ABB504V1ERA682S5C3FC3CCE4DF5',
  personType: 5,
  personId: 244,
  klasseId: 19 
}
````

## getTimetable
#### Parameters
* sessionId
* personType
* personId
* startDate (optional)
* endDate (optional)
#### Usage
````js
let timetable = await getTimetable(sessionId, personType, personId)
let timetable = await getTimetable(sessionId, personType, personId, startDate, endDate) //yyyymmdd
````
#### Returns
a array of lessons which should looks like this:
````
[ { id: 89,
    date: 20160509,
    startTime: 1210,
    endTime: 1300,
    kl:
     [ { id: 23,
         name: '4A',
         longname: 'Abt. Informationstechnologie' } ],
    te: [ { id: 18, name: 'Bob' } ],
    su: [ { id: 27, name: 'D', longname: 'DEUTSCH' } ],
    ro: [ { id: 9, name: '367', longname: 'Klasse' } ],
    activityType: 'Unterricht' },
    .
    .
    .
    ]
````

## getCurrentWeekTimetable
#### Parameters
* sessionId
* personType
* personId
#### Usage
````js
let currentWeekTimetable = await getCurrentWeekTimetable(sessionId, personType, personId)
````
#### Returns
a array of lessons which should looks like this:
````
[ { id: 89,
    date: 20160509,
    startTime: 1210,
    endTime: 1300,
    kl:
     [ { id: 23,
         name: '4A',
         longname: 'Abt. Informationstechnologie' } ],
    te: [ { id: 18, name: 'Bob' } ],
    su: [ { id: 27, name: 'D', longname: 'DEUTSCH' } ],
    ro: [ { id: 9, name: '367', longname: 'Klasse' } ],
    activityType: 'Unterricht' },
    .
    .
    .
    ]
````


## getTeachers
#### Parameters
* sessionId
#### Usage
````js
let teachers = await webuntis.getLatestImportTime(sessionId)
````
#### Returns
a array of teachers which should looks like this:
````
[{ id: 12,
    name: 'SMT',
    foreName: 'Alex',
    longName: 'Smith',
    title: '',
    active: true,
    dids: [ [Object], [Object] ] },
    .
    .
    .
    ]
````

## getStudents
#### Parameters
* sessionId
#### Usage
````js
let students = await webuntis.getStudents(sessionId)
````
#### Returns
a array of students which should looks like this:
````
[{ id: 13,
    key: '1164725150374',
    name: 'smith.b01',
    foreName: 'Bob',
    longName: 'Smith',
    gender: 'male' },
    .
    .
    .
    ]
````

## getClasses
#### Parameters
* sessionId
* schoolyearId
#### Usage
````js
let classes = await Untis.getClasses(session.sessionId, schoolyearId)
````
#### Returns
a array of students which should looks like this:
````
[{ id: 85,
    name: '3ABM',
    longName: 'BM-Aufbaulehrgang (7S)',
    active: true,
    did: 1,
    teacher1: 3 },
    .
    .
    .
    ]
````


## getSubjects
#### Parameters
* sessionId
#### Usage
````js
let subjects = await webuntis.getSubjects(sessionId)
````
#### Returns
a array of subjects which should looks like this:
````
[{ id: 251,
    name: 'GGP',
    longName: 'GEOGRAFIE, GESCHICHTE U. POL. BILD.',
    alternateName: '',
    active: true },
    .
    .
    .
    ]
````

## getRooms
#### Parameters
* sessionId
#### Usage
````js
let rooms = await webuntis.getRooms(sessionId)
````
#### Returns
a array of rooms which should looks like this:
````
[{ id: 66,
    name: '364',
    longName: 'Klasse',
    active: true,
    did: 8,
    building: '' },
    .
    .
    .
    ]
````

## getDepartments
#### Parameters
* sessionId
#### Usage
````js
let departments = await webuntis.getDepartments(sessionId)
````
#### Returns
a array of departments which should looks like this:
````
[{ id: 5, name: 'E', longName: 'ELEKTROTECHNIK' },
  { id: 2, name: 'IT', longName: 'INFORMATIONSTECHNOLOGIE' },
    .
    .
    .
    ]
````

## getHolidays
#### Parameters
* sessionId
#### Usage
````js
let holidays = await webuntis.getHolidays(sessionId)
````
#### Returns
a array of holidays which should looks like this:
````
[{ id: 7,
    name: '26.10.',
    longName: 'Nationalfeiertag',
    startDate: 20181026,
    endDate: 20181026 },
    .
    .
    .
    ]
````

## getTimeGrid
#### Parameters
* sessionId
#### Usage
````js
let timeGrid = await webuntis.getTimeGrid(sessionId)
````
#### Returns
a array of days with their timegrid which should looks like this:
````
[{ day: 2,
  timeUnits:
   [ { name: '1', startTime: 700, endTime: 750 },
     { name: '2', startTime: 750, endTime: 840 },
     { name: '3', startTime: 840, endTime: 930 },
     { name: '4', startTime: 930, endTime: 1020 },
     { name: '5', startTime: 1030, endTime: 1120 },
     { name: '6', startTime: 1120, endTime: 1210 },
    .
    .
    .
    ]
````

## getCurrentSchoolYear
#### Parameters
* sessionId
#### Usage
````js
let schoolyear = await webuntis.getCurrentSchoolYear(sessionId)
````
#### Returns
a json object which should looks like this:
````
{ id: 1,
  name: '2018/2019',
  startDate: 20180903,
  endDate: 20190630 }
````

## getSchoolYears
#### Parameters
* sessionId
#### Usage
````js
let schoolyear = await webuntis.getSchoolYears(sessionId)
````
#### Returns
a array of schoolyears which should looks like this:
````
[{ id: 1,
  name: '2018/2019',
  startDate: 20180903,
  endDate: 20190630 },
  .
  .
  .
  ]
````

## getSubstitutions
#### Parameters
* sessionId
* startDate
* endDate
* departmentId (0 for all departments)
#### Usage
````js
let schoolyear = await webuntis.getSubstitutions(sessionId, startDate, endDate, departmentId)
````
#### Returns
a array of substitutions which should looks like this:
````
[{ type: 'subst',
    lsid: 598,
    date: 20190911,
    startTime: 1120,
    endTime: 1210,
    kl: [ [Object], [Object] ],
    te: [ [Object], [Object], [Object] ],
    su: [ [Object] ],
    ro: [ [Object], [Object], [Object], [Object] ] },
  .
  .
  .
  ]
````

## getTimetableWithAbsences
#### Parameters
* sessionId
* startDate
* endDate
#### Usage
````js
let schoolyear = await webuntis.getTimetableWithAbsences(sessionId, startDate, endDate) //yyyymmdd
````
#### Returns
a array of absences which should looks like this:
````
periodsWithAbsences:
   [{ date: 20190905,
      startTime: 750,
      endTime: 840,
      studentId: '91644720140681',
      subjectId: '',
      teacherIds: [ '' ],
      studentGroup: 'AM_5BHITM',
      user: '',
      checked: true }
      .
      .
      .
      ]
````

## Logout
#### Parameters
* sessionId
#### Usage
````js
webuntis.Logout(sessionId)
````
#### Returns
a string which says if the logout was successful or not

## Notice

I am not affiliated with Untis GmbH. Use this at your own risk.
