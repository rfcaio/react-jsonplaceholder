import React from 'react'
import axios from 'axios'
import { render, wait } from '@testing-library/react'

import Todo from './Todo'

jest.mock('axios')

describe('Todo', () => {
  describe('on render', () => {
    test('show `No todos to list.` when todo list is empty', async () => {
      axios.get.mockResolvedValue({
        data: []
      })
      const { getByText } = render(<Todo />)
      await wait()
      expect(getByText('No todos to list.')).toBeInTheDocument()
    })

    test('load todos', async () => {
      axios.get.mockResolvedValue({
        data: [
          {
            id: 1,
            title: 'Foo'
          },
          {
            id: 2,
            title: 'Bar'
          }
        ]
      })
      const { getByText } = render(<Todo />)
      await wait()
      expect(getByText('Foo')).toBeInTheDocument()
      expect(getByText('Bar')).toBeInTheDocument()
    })
  })
})