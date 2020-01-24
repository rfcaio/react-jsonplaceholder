import React from 'react'
import { Checkbox, Col, Form, Input, Row } from 'antd'
import PropTypes from 'prop-types'

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
              })(<Input />)
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
