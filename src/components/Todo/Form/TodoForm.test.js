import React from 'react'
import { fireEvent, render } from '@testing-library/react'

import TodoForm from './TodoForm'

import useUsers from '../../../hooks/useUsers'

jest.mock('../../../hooks/useUsers')

describe('TodoForm', () => {
  const todo = {
    title: 'delectus aut autem',
    userId: 1
  }

  beforeEach(() => {
    const mockedUsers = [
      { id: 1, name: 'Foo' },
      { id: 2, name: 'Bar' }
    ]
    useUsers.mockReturnValue([mockedUsers])
  })

  describe('on render', () => {
    test('show `Todo form` when no title is provided', () => {
      const { getByText } = render(<TodoForm />)
      expect(getByText('Todo form')).toBeInTheDocument()
    })

    test('show custom title when provided', () => {
      const { getByText } = render(<TodoForm title="Create todo" />)
      expect(getByText('Create todo')).toBeInTheDocument()
    })
  })

  describe('on submit', () => {
    const onSubmit = jest.fn().mockName('onSubmit')

    test('call `onSubmit` with form data', () => {
      const {
        getByLabelText,
        getByTestId,
        getByText
      } = render(<TodoForm onSubmit={onSubmit} />)
      fireEvent.change(getByLabelText('Title'), {
        target: {
          value: 'Learn JavaScript'
        }
      })
      // TODO: improve select change
      fireEvent.click(getByLabelText('User'))
      fireEvent.click(getByText('Bar'))
      fireEvent.submit(getByTestId('todo-form'))
      expect(onSubmit).toHaveBeenCalledWith({
        completed: false,
        title: 'Learn JavaScript',
        userId: 2
      })
    })
  })
})
