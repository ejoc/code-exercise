import React from 'react'
import Link from 'next/link'
import { Table, Icon, Divider } from 'antd'

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
})

const columns = [
  {
    title: 'Fullname',
    dataIndex: 'full_name',
    key: 'full_name',
    render: (text, record) => (
      <Link
        href={{
          pathname: 'congressperson',
          query: { id: record.id },
        }}
      >
        <a>
          {record.first_name} {record.middle_name} {record.last_name}
        </a>
      </Link>
    ),
  },
  {
    title: 'Social media',
    dataIndex: 'twitter_account',
    key: 'twitter_account',
    render: (text, record) => (
      <span>
        {record.twitter_account && (
          <a
            href={`https://twitter.com/${record.twitter_account}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <IconFont type="icon-twitter" />
          </a>
        )}
        <Divider type="vertical" />
        {record.facebook_account && (
          <a
            href={`https://www.facebook.com/${record.facebook_account}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <IconFont type="icon-facebook" />
          </a>
        )}
      </span>
    ),
  },
  {
    title: 'Party',
    dataIndex: 'party',
    key: 'party',
  },
  {
    title: 'District/State',
    dataIndex: 'state',
    key: 'state',
  },
  {
    title: 'Next election',
    dataIndex: 'next_election',
    key: 'next_election',
  },
]

const CongressPeopleList = ({ congressPeople, loading }) => (
  <Table
    dataSource={congressPeople}
    columns={columns}
    rowKey="id"
    loading={loading}
  />
)

export default CongressPeopleList
