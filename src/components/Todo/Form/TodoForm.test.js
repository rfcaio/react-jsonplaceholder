import React from 'react'
import { render } from '@testing-library/react'

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
  })

  describe('on render', () => {
    const users = [
      { id: 1, name: 'Foo' },
      { id: 2, name: 'Bar' }
    ]

    beforeEach(() => {
      useUsers.mockReturnValue([users])
    })

    test('show `Todo form` when no title is provided', () => {
      const { getByText } = render(<TodoForm />)
      expect(getByText('Todo form')).toBeInTheDocument()
    })

    test('show the title provided', () => {
      const { getByText } = render(<TodoForm title="Create todo" />)
      expect(getByText('Create todo')).toBeInTheDocument()
    })

    test('show todo info', () => {
      const { getByLabelText, getByText, queryByText } = render(
        <TodoForm todo={todo} />
      )
      expect(getByLabelText('Title')).toHaveValue('delectus aut autem')
      // TODO: improve
      expect(getByText('Foo')).toBeInTheDocument()
      expect(queryByText('Bar')).not.toBeInTheDocument()
    })

    test('fetch users', () => {
      render(<TodoForm />)
      expect(useUsers).toHaveBeenCalled()
    })
  })
})
