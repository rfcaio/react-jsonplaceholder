import React from 'react'
import { useParams } from 'react-router'
import { render } from '@testing-library/react'

import TodoUpdate from './TodoUpdate'

import useTodo from './useTodo'

jest.mock('react-router')
jest.mock('./useTodo')

describe('TodoUpdate', () => {
  beforeEach(() => {
    useParams.mockReturnValue({ id: 7 })
    useTodo.mockReturnValue({ error: false, loading: false, todo: null })
  })

  describe('on render', () => {
    test('show `Update todo` title', () => {
      const { getByText } = render(<TodoUpdate />)
      expect(getByText('Update todo')).toBeInTheDocument()
    })

    test('show `Could not fetch todo with ID 7.` when a request error occur', () => {
      useTodo.mockReturnValue({ error: true, loading: false, todo: null })
      const { getByText } = render(<TodoUpdate />)
      expect(getByText('Could not fetch todo with ID 7.')).toBeInTheDocument()
    })

    test('show loading indicator', () => {
      useTodo.mockReturnValue({ error: false, loading: true, todo: null })
      const { getByTestId } = render(<TodoUpdate />)
      expect(getByTestId('todo-update')).toHaveClass('ant-card-loading')
    })

    test('show todo title', () => {
      useTodo.mockReturnValue({
        error: false,
        loading: false,
        todo: {
          completed: false,
          id: 7,
          title: 'delectus aut autem',
          userId: 7
        }
      })
      const { getByText } = render(<TodoUpdate />)
      expect(useTodo).toHaveBeenCalledWith(7)
      expect(getByText('delectus aut autem')).toBeInTheDocument()
    })
  })
})
