import { useEffect, useState } from 'react'
import axios from 'axios'

const useTodos = () => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [todos, setTodos] = useState([])

  const removeTodo = id => setTodos(todos.filter(todo => todo.id !== id))

  useEffect(() => {
    setLoading(true)
    axios
      .get('http://jsonplaceholder.typicode.com/todos')
      .then(response => response.data)
      .then(todos => setTodos(todos))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  return [todos, loading, error, removeTodo]
}

export default useTodos
