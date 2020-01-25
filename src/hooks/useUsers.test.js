import axios from 'axios'
import { act, renderHook } from '@testing-library/react-hooks'

import useUsers from './useUsers'

jest.mock('axios')

describe('useUsers', () => {
  test('request `http://jsonplaceholder.typicode.com/users`', async () => {
    axios.get.mockResolvedValue({ data: {} })
    const { result, waitForNextUpdate } = renderHook(() => useUsers())
    await waitForNextUpdate()
    expect(axios.get)
      .toHaveBeenCalledWith('http://jsonplaceholder.typicode.com/users')
  })

  test('get a users list', async () => {
    const data = [{ id: 1, name: 'Foo' }, { id: 2, name: 'Bar' }]
    axios.get.mockResolvedValue({ data })
    const { result, waitForNextUpdate } = renderHook(() => useUsers())
    await waitForNextUpdate()
    const [users, loading, error] = result.current
    expect(error).toBeFalsy()
    expect(loading).toBeFalsy()
    expect(users).toEqual(data)
  })

  test('set `error` to `true` when a request error occur', async () => {
    axios.get.mockRejectedValue(new Error())
    const { result, waitForNextUpdate } = renderHook(() => useUsers())
    await waitForNextUpdate()
    const [users, loading, error] = result.current
    expect(error).toBeTruthy()
    expect(loading).toBeFalsy()
    expect(users).toEqual([])
  })
})
