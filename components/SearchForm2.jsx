import React from 'react'
import Router from 'next/router'
import { Form, Input, Select, InputNumber, Button } from 'antd'

const { Option } = Select
// const { Search } = Input

const FormItem = Form.Item

// export const initialChamber = 'senate'
// export const initialSession = 115

class SearchForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    const { form } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        Router.push({
          pathname: '/search',
          query: values,
        })
      }
    })
  }

  render() {
    const {
      form: { getFieldDecorator },
      searchText,
      session,
      chamber,
    } = this.props
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem label="Chamber">
          {getFieldDecorator('chamber', {
            initialValue: chamber,
          })(
            <Select
              // value={props.chamber}
              // onChange={value => props.onChamberChange(value)}
              style={{ width: 120 }}
            >
              <Option value="senate">Senate</Option>
              <Option value="house">House</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="Session">
          {getFieldDecorator('session', {
            initialValue: session,
          })(
            <InputNumber
            // value={props.session}
            // onChange={props.onSessionChange}
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('searchText', {
            initialValue: searchText || '',
            // rules: [
            //   { required: true, message: 'Please input your search text!' },
            // ],
          })(
            <Input
              // value={props.searchText}
              // onChange={props.onSearchChange}
              placeholder="Search input"
            />
          )}
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
