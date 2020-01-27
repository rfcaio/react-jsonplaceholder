import axios from 'axios'
import { act, renderHook } from '@testing-library/react-hooks'

import useTodo from './useTodo'

jest.mock('axios')

describe('useTodo', () => {
  test('request `http://jsonplaceholder.typicode.com/todos/1`', async () => {
    axios.get.mockResolvedValue({ data: {} })
    const { result, waitForNextUpdate } = renderHook(() => useTodo(1))
    await waitForNextUpdate()
    expect(axios.get)
      .toHaveBeenCalledWith('http://jsonplaceholder.typicode.com/todos/1')
  })

  test('get a single todo', async () => {
    const data = {
      completed: false,
      id: 1,
      title: 'delectus aut autem',
      userId: 1
    }
    axios.get.mockResolvedValue({ data })
    const { result, waitForNextUpdate } = renderHook(() => useTodo(1))
    await waitForNextUpdate()
    const [todo, loading, error] = result.current
    expect(error).toBeFalsy()
    expect(loading).toBeFalsy()
    expect(todo).toEqual(data)
  })

  test('set `error` to `true` when a request error occur', async () => {
    axios.get.mockRejectedValue(new Error())
    const { result, waitForNextUpdate } = renderHook(() => useTodo(1))
    await waitForNextUpdate()
    const [todo, loading, error] = result.current
    expect(error).toBeTruthy()
    expect(loading).toBeFalsy()
    expect(todo).toBeNull()
  })
})
