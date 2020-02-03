import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import NumberDisplay from './components/NumberDisplay'
import FilterInput from './components/FilterInput'
import PersonSubmit from './components/PersonSubmit'

  const Notification =  ({message})  => {
    if (message === null) {
      return null
    }
    const errorStyle = {
      color: 'green',
      background: `lightgrey`,
      fontSize: 40,
      borderStyle: `solid`,
      borderRadius: 10,
      padding: 10,
      marginBottom: 10
    }
  
    return (
      <div style={errorStyle} className="error">
        {message}
      </div>
    )
  }

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addNumber = (event) => {
    event.preventDefault()
    let dup = 0;
    const num = {
      name: newName,
      number: newNumber
    }
  
    persons.forEach(person => {if (person.name === num.name) {
      dup = 1
      if (window.confirm(`${newName} has already been added. Would you like to replace the number of ${newName} ?`)) {
        changeNumber(person.id)
        setNewName('')
        setNewNumber('')
        setErrorMessage(`${newName}'s number has been changed !`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
      setNewName('')
      setNewNumber('')
    }}
    )

    if (dup === 0){
      personService
      .create(num)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setErrorMessage(`${newName} has been added !`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
    
    dup = 0
  }

  const deleteNumber = event => {
    event.preventDefault()
    if (window.confirm(`Are you sure you want to delete this ?`)) { 

    personService
      .del(event.target.id)

      personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setErrorMessage(`Selected number deleted !`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
  }

  const changeNumber = id => {
    const person = persons.find(n => n.id === id)
    const changedPerson = { ...person, number: newNumber }

    personService
      .update(id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
        <div>
          <FilterInput newFilter={newFilter} handleFilterChange={handleFilterChange}/>
        </div>
      <h2>add a new</h2>
      <PersonSubmit addNumber={addNumber} newName={newName} 
      handleNameChange={handleNameChange} newNumber={newNumber} 
      handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
          {persons.map((person, i) => 
          <NumberDisplay key={i} person={person} newFilter={newFilter} deleteNumber={deleteNumber}/>
          )}
    </div>
  )

}

export default App