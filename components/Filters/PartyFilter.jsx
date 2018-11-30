import React from 'react'
import { Select } from 'antd'

const { Option } = Select

const PartyFilter = () => (
  <div>
    <Select style={{ width: 130 }} defaultValue="Party">
      <Option value="R">Republicans</Option>
      <Option value="D">Democratic</Option>
    </Select>
  </div>
)

export default PartyFilter
