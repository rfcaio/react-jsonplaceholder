import React from 'react'
import { Table } from 'antd'
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
        dataIndex: 'id',
        title: 'ID'
      },
      {
        dataIndex: 'title',
        title: 'Title'
      }
    ],
    dataSource: todos,
    rowKey: 'id',
    title: () => 'Todo list'
  }

  return <Table {...todoListProps} data-testid="todo-list" />
}

TodoList.propTypes = propTypes
TodoList.defaultProps = defaultProps

export default TodoList
