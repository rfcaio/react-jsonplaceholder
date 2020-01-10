import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import axios from 'axios'

import TodoList from './List'

const Todo = () => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/todos/')
      .then(response => response.data)
      .then(todos => setTodos(todos))
      .catch(() => message.error('Could not fetch todos.', 5))
  }, [])

  return (
    <div data-testid="todo">
      {
        todos.length === 0 ? <p>No todos to list.</p> : <TodoList todos={todos} />
      }
    </div>
  )
}

export default Todo
