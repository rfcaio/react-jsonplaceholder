import axios from 'axios'
import { renderHook } from '@testing-library/react-hooks'

import useUsers from './useUsers'

jest.mock('axios')

describe('useUsers', () => {
  const mockedUsers = [
    { id: 1, name: 'Foo' },
    { id: 2, name: 'Bar' }
  ]

  beforeEach(() => {
    axios.get.mockName('axios.get').mockResolvedValue({ data: mockedUsers })
  })

  test('get all users', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useUsers())
    await waitForNextUpdate()
    const [users, loading, error] = result.current
    expect(error).toBeFalsy()
    expect(loading).toBeFalsy()
    expect(users).toEqual(mockedUsers)
  })

  test('set `error` to `true` when an error occur', async () => {
    axios.get.mockName('axios.get').mockRejectedValue(new Error())
    const { result, waitForNextUpdate } = renderHook(() => useUsers())
    await waitForNextUpdate()
    const [users, loading, error] = result.current
    expect(error).toBeTruthy()
    expect(loading).toBeFalsy()
    expect(users).toEqual([])
  })
})
