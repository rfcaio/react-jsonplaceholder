import React from 'react'
import { Button, Divider, Table } from 'antd'
import PropTypes from 'prop-types'

const propTypes = {
  todos: PropTypes.array
}

const defaultProps = {
  todos: []
}

const TodoList = ({ todos }) => {
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
            <Button
              data-testid={`tl-btn-edit-${todo.id}`}
              icon="edit"
              shape="circle"
              type="primary"
            />
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

  return <Table {...todoListProps} data-testid="todo-list" />
}

TodoList.propTypes = propTypes
TodoList.defaultProps = defaultProps

export default TodoList
