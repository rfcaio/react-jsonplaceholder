import React from 'react'
import { render } from '@testing-library/react'

import TodoCreate from './TodoCreate'

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
})
