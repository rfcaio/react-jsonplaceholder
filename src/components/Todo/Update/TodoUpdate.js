import React from 'react'
import { useParams } from 'react-router'
import { Alert } from 'antd'

import TodoForm from '../Form'

import useTodo from '../../../hooks/useTodo'

const TodoUpdate = () => {
  const { id } = useParams()
  const [todo, , error] = useTodo(id)

  if (error) {
    return (
      <Alert message={`Could not fetch todo with ID ${id}.`} type="error" />
    )
  }

  return todo && <TodoForm title="Update todo" todo={todo} />
}

export default TodoUpdate
