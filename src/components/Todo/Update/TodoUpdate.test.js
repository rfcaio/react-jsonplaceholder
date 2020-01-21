import React from 'react'
import { useParams } from 'react-router'
import { render } from '@testing-library/react'

import TodoUpdate from './TodoUpdate'

jest.mock('react-router')

describe('TodoUpdate', () => {
  describe('on render', () => {
    test('show a message with todo id', () => {
      useParams.mockReturnValue({ id: 7 })
      const { getByText } = render(<TodoUpdate />)
      expect(useParams).toHaveBeenCalled()
      expect(getByText('Updating todo with ID 7.')).toBeInTheDocument()
    })
  })
})
