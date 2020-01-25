import React from 'react'
import { Col, Form, Input, Row, Select } from 'antd'
import PropTypes from 'prop-types'

import useUsers from '../../../hooks/useUsers'

const propTypes = {
  form: PropTypes.object.isRequired,
  todo: PropTypes.object
}

const defaultProps = {
  todo: {
    completed: false,
    title: '',
    userId: null
  }
}

const TodoForm = ({ form, todo }) => {
  const [users, usersLoding] = useUsers()
  const { getFieldDecorator } = form
  return (
    <Form data-testid="todo-form">
      <Row gutter={16}>
        <Col sm={24} md={12}>
          <Form.Item label="User">
            {
              getFieldDecorator('userId', {
                initialValue: todo.userId,
                rules: [{ message: 'Required field.', required: true }]
              })(
                <Select loading={usersLoding}>
                  {
                    users.map(user => (
                      <Select.Option key={user.id} value={user.id}>
                        {user.name}
                      </Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
        </Col>

        <Col sm={24} md={12}>
          <Form.Item label="Title">
            {
              getFieldDecorator('title', {
                initialValue: todo.title,
                rules: [{ message: 'Required field.', required: true }]
              })(<Input />)
            }
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

TodoForm.propTypes = propTypes
TodoForm.defaultProps = defaultProps

export default Form.create({ name: 'todo-form' })(TodoForm)
