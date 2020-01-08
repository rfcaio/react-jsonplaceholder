import React from 'react'
import { render } from '@testing-library/react'

import App from './App'

describe('App', () => {
  test('show `JSONPlaceholder app`', () => {
    const { getByText } = render(<App />)
    expect(getByText('JSONPlaceholder app')).toBeInTheDocument()
  })
})
