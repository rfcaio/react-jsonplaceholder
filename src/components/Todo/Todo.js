import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import TodoList from './List'

const Todo = () => {
  const match = useRouteMatch()
  return (
    <Switch data-testid="todo">
      <Route path={match.path}>
        <TodoList />
      </Route>
    </Switch>
  )
}

export default Todo
