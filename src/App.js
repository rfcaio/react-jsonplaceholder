import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'

import './App.css'

import Todo from './components/Todo'

const App = () => (
  <div className="app">
    <Router>
      <Switch>
        <Route path="/todo">
          <Todo />
        </Route>
        <Route path="/">
          <Redirect to="/todo" />
        </Route>
      </Switch>
    </Router>
  </div>
)

export default App
