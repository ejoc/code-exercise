import React from 'react'
import Router from 'next/router'
import { Form, Input, Select, InputNumber, Button } from 'antd'

import { initialSession, initialChamber } from '../../reducers/congressPeople'

const { Option } = Select
// const { Search } = Input

const FormItem = Form.Item

class SearchForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    const { form, query } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        Router.push({
          pathname: '/search',
          query: {
            ...query,
            ...values,
          },
        })
      }
    })
  }

  render() {
    const {
      form: { getFieldDecorator },
      session,
      chamber,
      searchText,
    } = this.props
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem label="Chamber">
          {getFieldDecorator('chamber', {
            initialValue: chamber || initialChamber,
          })(
            <Select style={{ width: 120 }}>
              <Option value="senate">Senate</Option>
              <Option value="house">House</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="Session">
          {getFieldDecorator('session', {
            initialValue: session || initialSession,
          })(<InputNumber />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('searchText', {
            initialValue: searchText || '',
            // rules: [
            //   { required: true, message: 'Please input your search text!' },
            // ],
          })(<Input placeholder="Search input" />)}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(SearchForm)
