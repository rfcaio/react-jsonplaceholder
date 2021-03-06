import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { Alert, message } from 'antd'
import axios from 'axios'

import TodoForm from '../Form'

import useTodo from '../../../hooks/useTodo'

const TodoUpdate = () => {
  const history = useHistory()
  const { id } = useParams()
  const [todo, todoLoading, error] = useTodo(id)
  const [loading, setLoading] = useState(false)

  const updateTodo = async (data) => {
    setLoading(true)
    try {
      await axios.put(`http://jsonplaceholder.typicode.com/todos/${id}`, data)
      message.success('Todo updated with success.', 5)
      history.push('/todo')
    } catch (err) {
      message.error(`Could not update todo with ID ${id}.`)
    } finally {
      setLoading(false)
    }
  }

  if (error) {
    return (
      <Alert message={`Could not fetch todo with ID ${id}.`} type="error" />
    )
  }

  return (
    <TodoForm
      loading={todoLoading || loading}
      title="Update todo"
      todo={todo}
      onSubmit={updateTodo}
    />
  )
}

export default TodoUpdate
