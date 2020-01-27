import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

import TodoList from './TodoList'

import useTodos from '../../../hooks/useTodos'

jest.mock('../../../hooks/useTodos')

describe('TodoList', () => {
  const todos = [
    { id: 1, title: 'Foo' },
    { id: 2, title: 'Bar' }
  ]

  describe('on render', () => {
    test('show `Could not fetch todos.` when a request error occur', () => {
      useTodos.mockReturnValue([[], false, true])
      const { getByText } = render(<TodoList />, { wrapper: MemoryRouter })
      expect(getByText('Could not fetch todos.')).toBeInTheDocument()
    })

    test('list todos', () => {
      useTodos.mockReturnValue([todos, false, false])
      const { getByText } = render(<TodoList />, { wrapper: MemoryRouter })
      expect(getByText('Foo')).toBeInTheDocument()
      expect(getByText('Bar')).toBeInTheDocument()
    })

    test('show action buttons for each todo', () => {
      useTodos.mockReturnValue([todos, false, false])
      const { getByTestId } = render(<TodoList />, { wrapper: MemoryRouter })
      expect(getByTestId('tl-btn-delete-1')).toBeInTheDocument()
      expect(getByTestId('tl-btn-edit-1')).toBeInTheDocument()
      expect(getByTestId('tl-btn-delete-2')).toBeInTheDocument()
      expect(getByTestId('tl-btn-edit-2')).toBeInTheDocument()
    })
  })
})
