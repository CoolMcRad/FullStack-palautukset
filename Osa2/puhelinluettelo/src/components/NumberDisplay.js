import React from 'react';

const NumberDisplay = ({ person, newFilter, deleteNumber }) => {

    if (person.name.toUpperCase().includes(newFilter.toUpperCase())) {
      return (
        <div>
          <form>
          <p>
            {person.name} {person.number}
            <button onClick={deleteNumber} id={person.id}>{'delete'}</button>
          </p>
          </form>
        </div>
        )
    }
    return (
      <div>
        <p></p>
      </div>
    )
    }

    export default NumberDisplay