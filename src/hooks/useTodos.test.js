import axios from 'axios'
import { act, renderHook } from '@testing-library/react-hooks'

import useTodos from './useTodos'

jest.mock('axios')

describe('useTodos', () => {
  test('request `http://jsonplaceholder.typicode.com/todos`', async () => {
    axios.get.mockResolvedValue({ data: {} })
    const { result, waitForNextUpdate } = renderHook(() => useTodos())
    await waitForNextUpdate()
    expect(axios.get)
      .toHaveBeenCalledWith('http://jsonplaceholder.typicode.com/todos')
  })

  test('get a todos list', async () => {
    const data = [{ id: 1, title: 'Foo' }, { id: 2, title: 'Bar' }]
    axios.get.mockResolvedValue({ data })
    const { result, waitForNextUpdate } = renderHook(() => useTodos())
    await waitForNextUpdate()
    const [todos, loading, error] = result.current
    expect(error).toBeFalsy()
    expect(loading).toBeFalsy()
    expect(todos).toEqual(data)
  })

  test('set `error` to `true` when a request error occur', async () => {
    axios.get.mockRejectedValue(new Error())
    const { result, waitForNextUpdate } = renderHook(() => useTodos())
    await waitForNextUpdate()
    const [users, loading, error] = result.current
    expect(error).toBeTruthy()
    expect(loading).toBeFalsy()
    expect(users).toEqual([])
  })
})
