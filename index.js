//const employee = ['firstName', 'familyName', 'title', payPerHour]

function createEmployeeRecord(info){
    //return array elements corresponding object properties (keys)
    return {
        firstName: info[0],
        familyName: info[1],
        title: info[2],
        payPerHour: info[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees){
    // call createEmployeeRecord () and pass employees to it to create new set of array with employee details
    return employees.map(employee => {
        return createEmployeeRecord(employee)
    })
}

function createTimeInEvent(employeeRecord, time){
    let newRecord = {
        type: "TimeIn",
        hour: parseInt(time.split(" ")[1], 10),
        date: time.split(" ")[0]
        /*hour key: use "split" to seperate time from date ("YYYY-MM-DD HHMM") and use parseInt to convert time (2nd Index) from string to int*/
        /*date key: use "split" to seperate time from date ("YYYY-MM-DD HHMM")[0] and select date (1st index)*/
    }
    employeeRecord.timeInEvents = [...employeeRecord.timeInEvents, newRecord];
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, time){
    let newRecord = {
        type: "TimeOut",
        hour: parseInt(time.split(" ")[1], 10),
        date: time.split(" ")[0]
        /*hour key: use "split" to seperate time from date ("YYYY-MM-DD HHMM") and use parseInt to convert time (2nd Index) from string to int*/
        /*date key: use "split" to seperate time from date ("YYYY-MM-DD HHMM")[0] and select date (1st index)*/
    }
    employeeRecord.timeOutEvents = [...employeeRecord.timeOutEvents, newRecord];
    return employeeRecord;
}

function hoursWorkedOnDate(employee, date){
    // lookup employeeName and dateCheckedIn and save to inDate
    let inDate = employee.timeInEvents.find(function(time){
        return time.date === date
    })

    // lookup employeeName and dateCheckedOut and save to outDate
    let outDate = employee.timeOutEvents.find(function(time){
        return time.date === date
    })

    //subtract dateCheckIn from dateCheckedOut to get total hours worked on date
    return (outDate.hour - inDate.hour) / 100
}

function wagesEarnedOnDate(employee, date){
    //lookup employee's number of hours worked using hoursWorkedOnDate function, multiply by employee's payPerHour
    // save multiplication product to wageOwed and convert to float
    let wageOwed = hoursWorkedOnDate(employee, date) * employee.payPerHour
    return parseFloat(wageOwed)

}

function allWagesFor(employee){
    // use map to get all dates worked
    const daysWorked = employee.timeInEvents.map(function(event){
        return event.date
    })

    // use REDUCE() to add up wages earned for all dates or days worked
    let init = 0
    const totalDaysWorked = daysWorked.reduce(function(start, end){
        return start + wagesEarnedOnDate(employee, end)
    }, init)

    return totalDaysWorked
}

// lookup firstname of all employees in an employee records array and save to findEmployee variable.
let findEmployee = function(array, firstName){
    return array.find(function(record){
        return record.firstName === firstName
    })
}

// takes in array of employees, 
// use REDUCE() to pass all firstnames of employees to ALLWAGESFOR() to calculate wages paid to all employees 
function calculatePayroll(array){
    let init = 0
    return array.reduce(function(begin, record){
        return begin + allWagesFor(record)
    }, init)
}