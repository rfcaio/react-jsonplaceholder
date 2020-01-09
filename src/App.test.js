import React from 'react'
import { render } from '@testing-library/react'

import App from './App'

describe('App', () => {
  test('show `Todo` component', () => {
    const { getByTestId } = render(<App />)
    expect(getByTestId('todo')).toBeInTheDocument()
  })
})
