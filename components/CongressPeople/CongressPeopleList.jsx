import React from 'react'
import Link from 'next/link'
import { Table, Icon, Divider, Pagination } from 'antd'

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

class CongressPeopleList extends React.Component {
  state = {
    current: 1,
    perPage: 20,
  }

  onPaginationChange = page => {
    this.setState({
      current: page,
    })
  }

  onShowSizeChange = (current, perPage) => {
    this.setState({
      current,
      perPage,
    })
  }

  render() {
    const {
      congressPeople,
      searchText,
      votesPercentage,
      totalVotes,
      gender,
      party,
      next_election,
      loading,
    } = this.props
    const { current, perPage } = this.state

    let filterCongressPeople
    if (
      votesPercentage.length ||
      (searchText && searchText.length) ||
      totalVotes.length ||
      gender ||
      party ||
      next_election
    ) {
      filterCongressPeople =
        congressPeople &&
        congressPeople.filter(c => {
          const fullName = `${c.first_name} ${c.middle_name} ${c.last_name}`
          let flag = true
          if (searchText && searchText.length) {
            flag = fullName.toLowerCase().indexOf(searchText.toLowerCase()) >= 0
          }
          if (flag && gender) {
            flag = c.gender === gender.toUpperCase()
          }
          if (flag && party) {
            flag = c.party === party.toUpperCase()
          }
          if (flag && next_election) {
            flag = c.next_election === next_election
          }
          if (flag && votesPercentage.length) {
            flag =
              c.votes_with_party_pct >= votesPercentage[0] &&
              c.votes_with_party_pct <= votesPercentage[1]
          }
          if (flag && totalVotes.length) {
            flag =
              c.total_votes >= totalVotes[0] && c.total_votes <= totalVotes[1]
          }
          return flag
        })
    }

    const indexOfLast = current * perPage
    const indexOfFirst = indexOfLast - perPage
    const displayList = (filterCongressPeople || congressPeople || []).slice(
      indexOfFirst,
      indexOfLast
    )

    return (
      <div>
        <Table
          dataSource={displayList}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={false}
        />
        <br />
        <Pagination
          showSizeChanger
          onChange={this.onPaginationChange}
          onShowSizeChange={this.onShowSizeChange}
          current={current}
          pageSize={perPage}
          total={(filterCongressPeople || congressPeople || []).length}
        />
      </div>
    )
  }
}

export default CongressPeopleList
