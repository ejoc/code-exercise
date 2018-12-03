import React from 'react'
import Link from 'next/link'
import { Menu } from 'antd'

// const { Option } = Select
/* <Select style={{ width: 130 }} defaultValue="Party">
  <Option value="R">Republicans</Option>
  <Option value="D">Democratic</Option>
</Select> */

const PartyFilter = ({ query }) => (
  <Menu
    mode="inline"
    selectedKeys={query.party ? [query.party.toUpperCase()] : []}
  >
    <Menu.Item key="D">
      <Link
        href={{
          // to: '/search',
          query: { ...query, party: 'D' },
        }}
      >
        <a>Democratic</a>
      </Link>
    </Menu.Item>
    <Menu.Item key="R">
      <Link
        href={{
          // to: '/search',
          query: { ...query, party: 'R' },
        }}
      >
        <a>Republicans</a>
      </Link>
    </Menu.Item>
  </Menu>
)

export default PartyFilter
