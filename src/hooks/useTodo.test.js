import axios from 'axios'
import { renderHook } from '@testing-library/react-hooks'

import useTodo from './useTodo'

jest.mock('axios')

describe('useTodo', () => {
  const mockedTodo = {
    completed: false,
    id: 1,
    title: 'delectus aut autem',
    userId: 1
  }

  beforeEach(() => {
    axios
      .get
      .mockName('axios.get')
      .mockImplementation(url => (
        url === 'http://jsonplaceholder.typicode.com/todos/1'
          ? Promise.resolve({ data: mockedTodo })
          : Promise.reject(new Error())
      ))
  })

  test('get todo by ID', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useTodo(1))
    await waitForNextUpdate()
    const [todo, loading, error] = result.current
    expect(error).toBeFalsy()
    expect(loading).toBeFalsy()
    expect(todo).toEqual(mockedTodo)
  })

  test('set `error` to `true` when an error occur', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useTodo(2))
    await waitForNextUpdate()
    const [todo, loading, error] = result.current
    expect(error).toBeTruthy()
    expect(loading).toBeFalsy()
    expect(todo).toBeNull()
  })
})
