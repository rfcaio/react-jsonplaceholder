import React from 'react'
import { useParams } from 'react-router'

const TodoUpdate = () => {
  const { id } = useParams()
  return (
    <p>Updating todo with ID {id}.</p>
  )
}

export default TodoUpdate
