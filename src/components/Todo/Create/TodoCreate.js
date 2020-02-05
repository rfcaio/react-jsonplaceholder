import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { message } from 'antd'
import axios from 'axios'

import TodoForm from '../Form'

const TodoCreate = () => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  const createTodo = data => {
    setLoading(true)
    axios
      .post('http://jsonplaceholder.typicode.com/todos', data)
      .then(() => {
        message.success('Todo created with success.', 5)
        history.push('/todo')
      })
      .catch(() => {
        message.error('Could not create todo.', 5)
        setLoading(false)
      })
  }

  return (
    <TodoForm
      loading={loading}
      title="Create todo"
      onSubmit={createTodo}
    />
  )
}

export default TodoCreate
