import { useEffect, useState } from 'react'
import axios from 'axios'

const useTodos = () => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [todos, setTodos] = useState([])

  useEffect(() => {
    setLoading(true)
    axios
      .get('http://jsonplaceholder.typicode.com/todos')
      .then(response => response.data)
      .then(todos => setTodos(todos))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  return [todos, loading, error]
}

export default useTodos
