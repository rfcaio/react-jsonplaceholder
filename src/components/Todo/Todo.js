import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Todo = () => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/todos/')
      .then(response => response.data)
      .then(todos => setTodos(todos))
      .catch(console.log) // TODO: improve this
  }, [])

  return (
    <div data-testid="todo">
      {
        todos.length === 0
          ? <p>No todos to list.</p>
          : (
            <ul>
              {todos.map(({ title, id }) => <li key={id}>{title}</li>)}
            </ul>
          )
      }
    </div>
  )
}

export default Todo
