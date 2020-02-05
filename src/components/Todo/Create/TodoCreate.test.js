import React from 'react'
import { render } from '@testing-library/react'

import TodoCreate from './TodoCreate'

// TODO: to check, without this an error occur
jest.mock('react-router')

describe('TodoCreate', () => {
  describe('on render', () => {
    test('show `TodoForm` component', () => {
      const { getByTestId } = render(<TodoCreate />)
      expect(getByTestId('todo-form')).toBeInTheDocument()
    })

    test('show `Create todo` title', () => {
      const { getByText } = render(<TodoCreate />)
      expect(getByText('Create todo')).toBeInTheDocument()
    })
  })

  describe('onSubmit', () => {
    test.todo('show `Could not create todo.` when an error occur')

    test.todo('show `Todo created with success.` when no error occur')

    test.todo('redirect to `/todo`')
  })
})
