import React from 'react'
import { useParams } from 'react-router'
import { Card } from 'antd'

import useTodo from './useTodo'

const TodoUpdate = () => {
  const { id } = useParams()
  const [todo, loading, error] = useTodo(id)

  return (
    <Card data-testid="todo-update" loading={loading} title="Update todo">
      {error && <p>Could not fetch todo with ID {id}.</p>}
      {todo && <h1>{todo.title}</h1>}
    </Card>
  )
}

export default TodoUpdate
