import { useEffect, useState } from 'react'
import axios from 'axios'

const useUsers = () => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])

  useEffect(() => {
    setLoading(true)
    axios
      .get('http://jsonplaceholder.typicode.com/users')
      .then(response => response.data)
      .then(users => setUsers(users))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  return [users, loading, error]
}

export default useUsers
