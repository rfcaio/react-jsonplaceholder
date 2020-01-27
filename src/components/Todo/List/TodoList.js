import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { Alert, Button, Divider, Table } from 'antd'

import useTodos from '../../../hooks/useTodos'

const TodoList = () => {
  const match = useRouteMatch()
  const [todos, loading, error] = useTodos()
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
            <Button
              data-testid={`tl-btn-delete-${todo.id}`}
              icon="delete"
              shape="circle"
              type="danger"
            />
          </React.Fragment>
        ),
        title: 'Actions'
      }
    ],
    dataSource: todos,
    loading,
    rowKey: 'id',
    size: 'middle',
    title: () => 'Todo list'
  }

  return (
    error
      ? <Alert message="Could not fetch todos." type="error" />
      : <Table {...todoListProps} data-testid="todo-list" />
  )
}

export default TodoList
