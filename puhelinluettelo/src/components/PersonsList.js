import React from 'react'

const PersonsList = ({ persons, search, handleRemove }) => {
  if (persons.length === 0) return null
  return (
    <div>
      <h3>Numerot</h3>
      <table>
        <tbody>
          {persons.map(person => {
            if (person.name.toUpperCase().includes(search.toUpperCase())) {
              return (
                <tr key={person.name}>
                  <td>{person.name}</td>
                  <td>{person.number}</td>
                  <td><button value={person.id} onClick={() => handleRemove(person)}>poista</button></td>
                </tr>
              )
            }
            return (null)
          })}
        </tbody>
      </table>
    </div>
  )
}

export default PersonsList