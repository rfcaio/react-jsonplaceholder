import React from 'react'
import axios from 'axios'
import { render } from '@testing-library/react'

import TodoList from './TodoList'

describe('TodoList', () => {
  const todos = [
    {
      id: 1,
      title: 'Foo'
    },
    {
      id: 2,
      title: 'Bar'
    }
  ]

  describe('on render', () => {
    test('show `Todo list`', () => {
      const { getByText } = render(<TodoList />)
      expect(getByText('Todo list')).toBeInTheDocument()
    })

    test('list todos', () => {
      const { getByText } = render(<TodoList todos={todos} />)
      expect(getByText('Foo')).toBeInTheDocument()
      expect(getByText('Bar')).toBeInTheDocument()
    })
  })
})
