import React, { useEffect, useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { Button, Divider, message, Table } from 'antd'
import axios from 'axios'

const TodoList = () => {
  const [todos, setTodos] = useState([])
  const match = useRouteMatch()
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
    rowKey: 'id',
    size: 'middle',
    title: () => 'Todo list'
  }
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/todos/')
      .then(response => response.data)
      .then(todos => setTodos(todos))
      .catch(() => message.error('Could not fetch todos.', 5))
  }, [])

  return (
    todos.length > 0
      ? <Table {...todoListProps} data-testid="todo-list" />
      : <p>No todos to list.</p>
  )
}

export default TodoList
