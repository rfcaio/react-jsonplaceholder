import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'
import { fireEvent, render, wait } from '@testing-library/react'

import TodoList from './TodoList'

import useTodos from '../../../hooks/useTodos'

jest.mock('axios')
jest.mock('../../../hooks/useTodos')

describe('TodoList', () => {
  beforeEach(() => {
    const todos = [{ id: 1, title: 'Foo' }]
    useTodos.mockReturnValue([todos, false, false])
  })

  describe('on render', () => {
    test('show `Could not fetch todos.` when a request error occur', () => {
      useTodos.mockReturnValue([[], false, true])
      const { getByText } = render(<TodoList />, { wrapper: MemoryRouter })
      expect(getByText('Could not fetch todos.')).toBeInTheDocument()
    })

    test('show action buttons for each todo', () => {
      const { getByTestId } = render(<TodoList />, { wrapper: MemoryRouter })
      expect(getByTestId('tl-btn-delete-1')).toBeInTheDocument()
      expect(getByTestId('tl-btn-edit-1')).toBeInTheDocument()
    })
  })

  describe('on edit', () => {
    test.todo('redirect to `/todo/update/{ID}`')
  })

  describe('on delete', () => {
    test('show `Do you want to delete todo with ID {ID}?`', () => {
      const {
        getByTestId,
        getByText
      } = render(<TodoList />, { wrapper: MemoryRouter })
      fireEvent.click(getByTestId('tl-btn-delete-1'))
      expect(getByText('Do you want to delete todo with ID 1?')).toBeInTheDocument()
    })

    test('show `Could not delete todo with ID {ID}.` when an error occur', async () => {
      axios.delete.mockName('axios.delete').mockRejectedValue(new Error())
      const {
        getByTestId,
        getByText
      } = render(<TodoList />, { wrapper: MemoryRouter })
      fireEvent.click(getByTestId('tl-btn-delete-1'))
      fireEvent.click(getByText('Yes'))
      await wait()
      expect(getByText('Could not delete todo with ID 1.')).toBeInTheDocument()
    })

    test('show `Todo deleted with success.` when no error occur', async () => {
      axios.delete.mockName('axios.delete').mockResolvedValue({ status: 204 })
      const {
        getByTestId,
        getByText
      } = render(<TodoList />, { wrapper: MemoryRouter })
      fireEvent.click(getByTestId('tl-btn-delete-1'))
      fireEvent.click(getByText('Yes'))
      await wait()
      expect(getByText('Todo deleted with success.')).toBeInTheDocument()
    })

    test.todo('remove deleted todo from the list')
  })
})
