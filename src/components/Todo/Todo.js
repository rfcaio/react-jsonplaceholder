import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import TodoCreate from './Create'
import TodoList from './List'
import TodoUpdate from './Update'

const Todo = () => {
  const match = useRouteMatch()
  return (
    <Switch data-testid="todo">
      <Route path={`${match.path}/create`}>
        <TodoCreate />
      </Route>
      <Route path={`${match.path}/update/:id`}>
        <TodoUpdate />
      </Route>
      <Route path={match.path}>
        <TodoList />
      </Route>
    </Switch>
  )
}

export default Todo
