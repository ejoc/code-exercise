import React from 'react'
import { Form, Input, Select, InputNumber, Button } from 'antd'

const { Option } = Select
// const { Search } = Input

const FormItem = Form.Item

const SearchForm = props => (
  <Form layout="inline" onSubmit={props.onSubmit}>
    <FormItem label="Chamber">
      <Select
        value={props.chamber}
        onChange={value => props.onChamberChange(value)}
        style={{ width: 120 }}
      >
        <Option value="senate">Senate</Option>
        <Option value="house">House</Option>
      </Select>
    </FormItem>
    <FormItem label="Session">
      <InputNumber value={props.session} onChange={props.onSessionChange} />
    </FormItem>
    <FormItem>
      <Input
        value={props.searchText}
        onChange={props.onSearchChange}
        placeholder="Search input"
      />
    </FormItem>
    <FormItem>
      <Button type="primary" htmlType="submit">
        Search
      </Button>
    </FormItem>
  </Form>
)

export default SearchForm
