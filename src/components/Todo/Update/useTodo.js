import { useEffect, useState } from 'react'
import axios from 'axios'

const useTodo = id => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [todo, setTodo] = useState(null)

  useEffect(() => {
    setLoading(true)
    axios
      .get(`http://jsonplaceholder.typicode.com/todos/${id}`)
      .then(response => response.data)
      .then(todo => setTodo(todo))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [id])

  return { error, loading, todo }
}

export default useTodo
