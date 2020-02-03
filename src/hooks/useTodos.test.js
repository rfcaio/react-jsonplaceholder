import axios from 'axios'
import { renderHook } from '@testing-library/react-hooks'

import useTodos from './useTodos'

jest.mock('axios')

describe('useTodos', () => {
  const mockedTodos = [{ id: 1, title: 'Foo' }, { id: 2, title: 'Bar' }]

  beforeEach(() => {
    axios.get.mockName('axios.get').mockResolvedValue({ data: mockedTodos })
  })

  test('get all todos', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useTodos())
    await waitForNextUpdate()
    const [todos, loading, error] = result.current
    expect(error).toBeFalsy()
    expect(loading).toBeFalsy()
    expect(todos).toEqual(mockedTodos)
  })

  test('set `error` to `true` when a request error occur', async () => {
    axios.get.mockName('axios.get').mockRejectedValue(new Error())
    const { result, waitForNextUpdate } = renderHook(() => useTodos())
    await waitForNextUpdate()
    const [todos, loading, error] = result.current
    expect(error).toBeTruthy()
    expect(loading).toBeFalsy()
    expect(todos).toEqual([])
  })

  test.todo('delete todo by ID')
})
