import React from 'react'
import { useParams } from 'react-router'
import { fireEvent, render } from '@testing-library/react'

import TodoUpdate from './TodoUpdate'

import useTodo from '../../../hooks/useTodo'

jest.mock('react-router')
jest.mock('../../../hooks/useTodo')

describe('TodoUpdate', () => {
  beforeEach(() => {
    const todo = {
      completed: false,
      id: 7,
      title: 'delectus aut autem',
      userId: 7
    }
    useParams.mockReturnValue({ id: 7 })
    useTodo.mockReturnValue([todo, false, false])
  })

  describe('on render', () => {
    test('show `TodoForm` component', () => {
      const { getByTestId } = render(<TodoUpdate />)
      expect(getByTestId('todo-form')).toBeInTheDocument()
    })

    test('show `Update todo` title', () => {
      const { getByText } = render(<TodoUpdate />)
      expect(getByText('Update todo')).toBeInTheDocument()
    })

    test('show `Could not fetch todo with ID {ID}.` when a request error occur', () => {
      useTodo.mockReturnValue([null, false, true])
      const { getByText } = render(<TodoUpdate />)
      expect(getByText('Could not fetch todo with ID 7.')).toBeInTheDocument()
    })
  })

  describe('onSubmit', () => {
    test.todo('request `http://jsonplaceholder.typicode.com/todos/{ID}` (PUT)')

    test.todo('show `Could not update todo with ID {ID}.` when an error occur')

    test.todo('show `Todo updated with success.` when no error occur')

    test.todo('redirect to `/todo`')
  })
})
