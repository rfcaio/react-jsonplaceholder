import React from 'react'
import { useParams } from 'react-router'
import { Card } from 'antd'

import TodoForm from '../Form'

import useTodo from './useTodo'

const TodoUpdate = () => {
  const { id } = useParams()
  const [todo, loading, error] = useTodo(id)

  return (
    <Card data-testid="todo-update" loading={loading} title="Update todo">
      {error && <p>Could not fetch todo with ID {id}.</p>}
      {todo && <TodoForm todo={todo} />}
    </Card>
  )
}

export default TodoUpdate
