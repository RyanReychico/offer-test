const data = require('./data');

'use strict'

const args = process.argv.slice(2)

function isEmpty(arr) {
  return (Array.isArray(arr) && arr.length)
}

// This function filters out every animal that does not match the string pattern
const removeNonMatching = (searchedStr, person) => {
  return person.animals.map((animal) => {
    if (animal.name.includes(searchedStr)) {
        return animal;
    }
  }).filter(e => e)
}

const filter = (searchedStr) => {
  const newList = data.filter(q => {
    let newCountry = q
    newCountry.people = q.people.filter(p => {
      let newPerson = p
      newPerson.animals = removeNonMatching(searchedStr, p)

      // The 'animals' entry will be removed if there is nothing left inside
      return isEmpty(newPerson.animals)
    })

    // The 'people' entry will be removed if there is nothing left inside
    return (isEmpty(newCountry.people))
  });

  const newListToJson = JSON.stringify(newList, null, 2)

  // prints out the filtered list if there is any match
  return (!isEmpty(newList)) ? 'Nothing found' : newListToJson
}

const count = (myData) => {
  const dataToCount = myData? myData : data
  const newList =dataToCount.map((country) => {
    country.people.map((person) => {
      person.name = `${person.name} [${person.animals.length}]`
      return person
    })
    country.name = `${country.name} [${country.people.length}]`
    return country
  })
  let dataWithCount = JSON.stringify(newList, null, 2)
  // console.log(dataWithCount)
  return dataWithCount
}

// Function that executes one command
const executeSpecificCommand = (cmd) => {
  
  // case of no arguments
  if (!cmd.length) {
    console.log('No arguments')
  }
  // Case of a filter call
  else if (cmd[0] === '--filter' || cmd[0] === 'filter') {
    let filteredData = filter(cmd[1])
    console.log(typeof filteredData === String ? 'Nothing found' : filter(cmd[1]))
    return filteredData
  } 

  // Case of a count call
  else if (cmd[0] === '--count' || cmd[0] === 'count') {
    let countData = count()
    console.log(countData)
    return countData
  }

  // Case of wrong argument
  else {
    console.log('Wrong arguments')
  }
  
}

// function that executes multiple command
const executeMultipleCommands = (args) => {
  let filterValue
  // Get the filter value
  for (let arg of args) {
    if (arg.includes('--filter') || arg.includes ('filter')) {
      filterValue = arg.split("=")[1]
    }
  }

  // Execute finter and count commands if called correctly
  const ifCountCalled = args[0] === '--count' || args[0] === 'count' || args[1] === '--count' || args[1] === 'count'
  if (ifCountCalled && filterValue) {
    let filteredData = filter(filterValue)
    if (typeof filteredData === String) {
      console.log(count())
    } else {
      let filteredAndCountedData = count(JSON.parse(filteredData))
      console.log(filteredAndCountedData)
      return filteredAndCountedData
    } 
  } else {
    console.log('Wrong arguments')
  }
}

// USAGE: node app.js --filter=[PATTERN] OR node app.js filter=[PATTERN]
// USAGE: node app.js --count OR node app.js count
// USAGE: node app.js -filter=[PATTERN] (OR filter=[PATTERN]) --count (OR count)

switch (args.length) {
  case 0: 
    console.log('No argument')
    break;
  case 1:
    const cmd = args[0].split("=");
    executeSpecificCommand(cmd) 
    break;
  case 2:
    executeMultipleCommands(args)
    break;
  default:
    console.log('Wrong arguments')
    break;
}

module.exports = {
  count, 
  filter, 
  executeSpecificCommand, 
  executeMultipleCommands
}