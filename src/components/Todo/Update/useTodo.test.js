import axios from 'axios'
import { act, renderHook } from '@testing-library/react-hooks'

import useTodo from './useTodo'

jest.mock('axios')

describe('useTodo', () => {
  test('request JSONPlaceholder domain', async () => {
    axios.get.mockResolvedValue({ data: {} })
    const { result, waitForNextUpdate } = renderHook(() => useTodo(1))
    await waitForNextUpdate()
    expect(axios.get)
      .toHaveBeenCalledWith('http://jsonplaceholder.typicode.com/todos/1')
  })

  test('get a single todo', async () => {
    const todo = {
      completed: false,
      id: 1,
      title: 'delectus aut autem',
      userId: 1
    }
    axios.get.mockResolvedValue({ data: todo })
    const { result, waitForNextUpdate } = renderHook(() => useTodo(1))
    await waitForNextUpdate()
    expect(result.current.error).toBeFalsy()
    expect(result.current.loading).toBeFalsy()
    expect(result.current.todo).toEqual(todo)
  })

  test('set `error` to `true` when a request error occur', async () => {
    axios.get.mockRejectedValue(new Error())
    const { result, waitForNextUpdate } = renderHook(() => useTodo(1))
    await waitForNextUpdate()
    expect(result.current.error).toBeTruthy()
    expect(result.current.loading).toBeFalsy()
    expect(result.current.todo).toBeNull()
  })
})
