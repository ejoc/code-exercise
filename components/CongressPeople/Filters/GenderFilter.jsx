import React from 'react'
import Link from 'next/link'
import { Menu } from 'antd'

const GenderFilter = ({ query }) => (
  <Menu
    mode="inline"
    selectedKeys={query.gender ? [query.gender.toUpperCase()] : []}
  >
    <Menu.Item key="M">
      <Link
        href={{
          to: '/search',
          query: { ...query, gender: 'M' },
        }}
      >
        <a>Male</a>
      </Link>
    </Menu.Item>
    <Menu.Item key="F">
      <Link
        href={{
          to: '/search',
          query: { ...query, gender: 'F' },
        }}
      >
        <a>Female</a>
      </Link>
    </Menu.Item>
  </Menu>
)

export default GenderFilter
