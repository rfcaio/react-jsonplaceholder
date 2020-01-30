import React from 'react'
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Switch
} from 'antd'
import PropTypes from 'prop-types'

import useUsers from '../../../hooks/useUsers'

const propTypes = {
  form: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  title: PropTypes.string,
  todo: PropTypes.object,
  onSubmit: PropTypes.func
}

const defaultProps = {
  loading: false,
  title: 'Todo form',
  todo: null,
  onSubmit: () => null
}

const TodoForm = ({ form, loading, title, todo, onSubmit }) => {
  const [users, usersLoading] = useUsers()
  const { getFieldDecorator } = form

  const submit = event => {
    event.preventDefault()
    form.validateFields((error, data) => {
      !error && onSubmit(data)
    })
  }

  return (
    <Spin spinning={loading}>
      <Form data-testid="todo-form" onSubmit={submit}>
        <Card
          actions={[
            <Button htmlType="submit" key="submit" type="primary">Submit</Button>
          ]}
          title={title}
        >
          <Row gutter={16}>
            <Col sm={24} md={12}>
              <Form.Item label="User">
                {
                  getFieldDecorator('userId', {
                    initialValue: todo ? todo.userId : null,
                    rules: [{ message: 'Required field.', required: true }]
                  })(
                    <Select loading={usersLoading}>
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
                    initialValue: todo ? todo.title : '',
                    rules: [{ message: 'Required field.', required: true }]
                  })(<Input />)
                }
              </Form.Item>
            </Col>

            <Col sm={24} md={12}>
              <Form.Item label="Completed">
                {
                  getFieldDecorator('completed', {
                    initialValue: todo ? todo.completed : false,
                    valuePropName: 'checked'
                  })(<Switch />)
                }
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </Spin>
  )
}

TodoForm.propTypes = propTypes
TodoForm.defaultProps = defaultProps

export default Form.create({ name: 'todo-form' })(TodoForm)
