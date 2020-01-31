import React, { useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { Alert, Button, Divider, message, Popconfirm, Table } from 'antd'
import axios from 'axios'

import useTodos from '../../../hooks/useTodos'

const TodoList = () => {
  const match = useRouteMatch()
  const [loading, setLoading] = useState(false)
  const [todos, todosLoading, todosError, removeTodo] = useTodos()

  const deleteTodo = async (id) => {
    setLoading(true)
    axios
      .delete(`http://jsonplaceholder.typicode.com/todos/${id}`)
      .then(() => {
        message.success('Todo deleted with success.', 5)
        removeTodo(id)
      })
      .catch(() => message.error(`Could not delete todo with ID ${id}.`, 5))
      .finally(() => setLoading(false))
  }

  const todoListProps = {
    bordered: true,
    columns: [
      {
        align: 'right',
        dataIndex: 'id',
        title: 'ID'
      },
      {
        dataIndex: 'title',
        title: 'Title'
      },
      {
        align: 'center',
        render: todo => (
          <React.Fragment>
            <Link to={`${match.url}/update/${todo.id}`}>
              <Button
                data-testid={`tl-btn-edit-${todo.id}`}
                icon="edit"
                shape="circle"
                type="primary"
              />
            </Link>
            <Divider type="vertical" />
            <Popconfirm
              cancelText="No"
              okText="Yes"
              placement="leftTop"
              title={`Do you want to delete todo with ID ${todo.id}?`}
              onConfirm={() => deleteTodo(todo.id)}
            >
              <Button
                data-testid={`tl-btn-delete-${todo.id}`}
                icon="delete"
                shape="circle"
                type="danger"
              />
            </Popconfirm>
          </React.Fragment>
        ),
        title: 'Actions'
      }
    ],
    dataSource: todos,
    loading: loading || todosLoading,
    rowKey: 'id',
    size: 'middle',
    title: () => 'Todo list'
  }

  return (
    todosError
      ? <Alert message="Could not fetch todos." type="error" />
      : <Table {...todoListProps} data-testid="todo-list" />
  )
}

export default TodoList
