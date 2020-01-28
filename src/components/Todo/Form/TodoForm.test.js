import React from 'react'
import { fireEvent, render } from '@testing-library/react'

import TodoForm from './TodoForm'

import useUsers from '../../../hooks/useUsers'

jest.mock('../../../hooks/useUsers')

describe('TodoForm', () => {
  let todo = null

  beforeEach(() => {
    todo = {
      title: 'delectus aut autem',
      userId: 1
    }
    const users = [
      { id: 1, name: 'Foo' },
      { id: 2, name: 'Bar' }
    ]
    useUsers.mockReturnValue([users])
  })

  describe('on render', () => {
    test('get users from `useUsers`', () => {
      render(<TodoForm />)
      expect(useUsers).toHaveBeenCalled()
    })

    test('show `Todo form` when no title is provided', () => {
      const { getByText } = render(<TodoForm />)
      expect(getByText('Todo form')).toBeInTheDocument()
    })

    test('show `Create todo` title', () => {
      const { getByText } = render(<TodoForm title="Create todo" />)
      expect(getByText('Create todo')).toBeInTheDocument()
    })
  })

  describe('on submit', () => {
    let onSubmit = jest.fn().mockName('onSubmit')

    test('not call `onSubmit` when validation errors exists', () => {
      const { getByTestId } = render(<TodoForm onSubmit={onSubmit} />)
      fireEvent.submit(getByTestId('todo-form'))
      expect(onSubmit).not.toHaveBeenCalled()
    })

    test('call `onSubmit` with form data', () => {
      const { getByTestId } = render(
        <TodoForm todo={todo} onSubmit={onSubmit} />
      )
      fireEvent.submit(getByTestId('todo-form'))
      expect(onSubmit).toHaveBeenCalledWith({
        title: 'delectus aut autem',
        userId: 1
      })
    })
  })
})
