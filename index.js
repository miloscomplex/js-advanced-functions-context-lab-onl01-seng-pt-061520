/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function createEmployeeRecord(array) {
  let employeeObj = {
  firstName: array[0],
  familyName: array[1],
  title: array[2],
  payPerHour: array[3],
  timeInEvents: [],
  timeOutEvents: []
  }
  return employeeObj
}

function createEmployeeRecords(employeesArray) {
  let employeesObjArray = employeesArray.map( employee => {
    return createEmployeeRecord(employee)
  })
  return employeesObjArray
}

function createTimeInEvent(dateStamp) {
  let dateStampArray = dateStamp.split(' ')
  this.timeInEvents.push({
    type: 'TimeIn',
    hour: parseInt(dateStampArray[1]),
    date: dateStampArray[0]
  })
  return this
}

function createTimeOutEvent(dateStamp) {
  let dateStampArray = dateStamp.split(' ')
  this.timeOutEvents.push({
    type: 'TimeOut',
    hour: parseInt(dateStampArray[1]),
    date: dateStampArray[0]
  })
  return this
}

function hoursWorkedOnDate(date) {
  let timeIn = 0
  let timeOut = 0
  //console.log("this= " + this.timeInEvents);
  this.timeInEvents.forEach( element => {
    if (element.date === date) {
      timeIn = parseInt(element.hour)
    }
  })

  this.timeOutEvents.forEach( element => {
    if (element.date === date) {
      timeOut = parseInt(element.hour)
    }
  })

  return (timeOut - timeIn) * 0.01
}

function wagesEarnedOnDate(date) {
  let hoursWorked = hoursWorkedOnDate.call(this, date)
  return hoursWorked * this.payPerHour
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
// function allWagesFor() {
//   let pay = this.timeInEvents.map( element => {
//     return wagesEarnedOnDate(this, element.date)
//   })
//
//   const totalUp = (runningTotal, currentValue) => runningTotal + currentValue
//   return pay.reduce(totalUp)
// }

function findEmployeeByFirstName(srcArray, firstName) {
  function matchFirstName(employeeObj) {
    return employeeObj.firstName === firstName
  }
  return srcArray.find(matchFirstName)
}

function calculatePayroll(employeesArray) {
  let allEmployeesPay = employeesArray.map( employeeObj => {
    //console.log("allWagesFor= " + allWagesFor.call(employeeObj));
    return allWagesFor.call(employeeObj)
  })
  console.log("employeesArray= " + employeesArray);
  //let allEmployeesPay = allWagesFor.apply(employeesArray)
  const totalUp = (runningTotal, currentValue) => runningTotal + currentValue
  return allEmployeesPay.reduce(totalUp)
}
