import React from 'react'
import { render } from '@testing-library/react'

import TodoForm from './TodoForm'

describe('TodoForm', () => {
  let todo = null

  beforeEach(() => {
    todo = {
      title: 'delectus aut autem',
      userId: 1
    }
  })

  describe('on render', () => {
    test('show todo info', () => {
      const { getByLabelText } = render(<TodoForm todo={todo} />)
      expect(getByLabelText('Title')).toHaveValue('delectus aut autem')
      expect(getByLabelText('User')).toHaveValue('1')
    })
  })
})
