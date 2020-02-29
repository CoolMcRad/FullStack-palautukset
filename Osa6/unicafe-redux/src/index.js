import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }


  const Statistics = () => {
    const g = store.getState().good
    const o = store.getState().ok
    const b = store.getState().bad

    if (g+o+b === 0) {
      return (
        <div>
          Palautetta ei ole annettu
        </div>
      )
    }
    return (
      <div>
        <div>hyvä {g}</div>
        <div>neutraali {o}</div>
        <div>huono {b}</div>
        <div>määrä {g + b +  o}</div>
        <div>keskimäärä { 100 * ( g / ( g + o + b ))} %</div>
      </div>
    )
  }

  return (
    <div>
      <h2>Anna Palautetta !</h2>
      <button onClick={good}>hyvä</button> 
      <button onClick={ok}>neutraali</button> 
      <button onClick={bad}>huono</button>
      <button onClick={zero}>nollaa tilastot</button>
      <h2>Statistiikka:</h2>
      {Statistics()}
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)