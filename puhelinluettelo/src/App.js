import React from 'react'

import PersonsList from './components/PersonsList'
import SearchForm from './components/SearchForm'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import PersonService from './services/Persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      search: '',
      notification: ''
    }
  }

  componentWillMount() {
    PersonService
      .getAll()
      .then(response => {
        this.setState({ persons: response.data })
      })
  }

  addPerson(person) {
    PersonService
      .create(person)
      .then(response => {
        this.setState({
          persons: this.state.persons.concat(response.data),
          newName: '',
          newNumber: '',
          search: '',
          notification: "lisättiin " + person.name
        })
      })
  }

  editPerson(person) {
    if (!window.confirm(person.name + " on jo luettelossa, korvataanko?")) {
      return
    }
    PersonService
      .update(person.id, person)
      .then(response => {
        this.setState({
          persons: this.state.persons
            .filter(p => p.id !== person.id)
            .concat(response.data),
          newName: '',
          newNumber: '',
          search: '',
          notification: "muokattiin " + person.name
        })
        setTimeout(() => {
          this.setState({ notification: '' })
        }, 2500)
      }).catch(error => {
        // Was probably deleted, remove from list and re-add
        this.setState({
          persons: this.state.persons.filter(p => p.id !== person.id)
        })
        this.addPerson(person)
      })
  }

  addPersonHandler = event => {
    event.preventDefault()

    let name = this.state.newName
    let number = this.state.newNumber
    let personBeingEdited = this.state.persons.find(person => person.name === name)

    if (!personBeingEdited) {
      this.addPerson({ name, number })
    } else {
      this.editPerson({ id: personBeingEdited.id, name, number })
    }
  }

  removePerson = person => {
    if (!window.confirm("poistetaanko " + person.name)) {
      return;
    }

    // finally over then to ignore errors (such as already being deleted)
    PersonService
      .remove(person.id)
      .finally(response => { 
        this.setState({
          persons: this.state.persons.filter(p => p.id !== person.id),
          notification: "poistettiin " + person.name
        })
        setTimeout(() => {
          this.setState({ notification: '' })
        }, 2500)
      })

  }

  handleNameChange = event => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = event => {
    this.setState({ newNumber: event.target.value })
  }

  handleSearchChange = event => {
    this.setState({ search: event.target.value })
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Notification message={this.state.notification} />
        <SearchForm onChange={this.handleSearchChange} />
        <PersonForm
          onSubmit={this.addPersonHandler}
          name={this.state.newName}
          onNameChange={this.handleNameChange}
          number={this.state.newNumber}
          onNumberChange={this.handleNumberChange} />
        <PersonsList
          persons={this.state.persons}
          search={this.state.search}
          handleRemove={this.removePerson} />
      </div>
    )
  }
}

export default App