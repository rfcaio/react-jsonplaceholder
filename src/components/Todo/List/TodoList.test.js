import React from 'react'
import axios from 'axios'
import { render, wait } from '@testing-library/react'

import TodoList from './TodoList'

jest.mock('axios')

describe('TodoList', () => {
  const todos = [
    { id: 1, title: 'Foo' },
    { id: 2, title: 'Bar' }
  ]

  describe('on render', () => {
    test('show `No todos to list.` when todo list is empty', async () => {
      axios.get.mockResolvedValue({ data: [] })
      const { getByText } = render(<TodoList />)
      await wait()
      expect(axios.get).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/todos/'
      )
      expect(getByText('No todos to list.')).toBeInTheDocument()
    })

    test('show `Could not fetch todos.` when a request error occur', async () => {
      axios.get.mockRejectedValue(new Error())
      const { getByText } = render(<TodoList />)
      await wait()
      expect(getByText('Could not fetch todos.')).toBeInTheDocument()
      expect(getByText('No todos to list.')).toBeInTheDocument()
    })

    test('list todos', async () => {
      axios.get.mockResolvedValue({ data: todos })
      const { getByText } = render(<TodoList />)
      await wait()
      expect(getByText('Foo')).toBeInTheDocument()
      expect(getByText('Bar')).toBeInTheDocument()
    })

    test('show action buttons for each todo', async () => {
      axios.get.mockResolvedValue({ data: todos })
      const { getByTestId } = render(<TodoList />)
      await wait()
      expect(getByTestId('tl-btn-delete-1')).toBeInTheDocument()
      expect(getByTestId('tl-btn-edit-1')).toBeInTheDocument()
      expect(getByTestId('tl-btn-delete-2')).toBeInTheDocument()
      expect(getByTestId('tl-btn-edit-2')).toBeInTheDocument()
    })
  })
})
