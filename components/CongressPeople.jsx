import React from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import { Table, Card, Row, Col } from 'antd'

import SearchForm from './SearchForm2'
import Filters from './Filters'
import {
  fetchCongressPeople,
  changeInputSearch,
  changeSession,
  changeChamber,
} from '../actions'
import {
  getCongressPeople,
  getIsFetching,
  getSearchText,
  getChamber,
  getSession,
} from '../reducer'

const columns = [
  {
    title: 'Fullname',
    dataIndex: 'full_name',
    key: 'full_name',
    render: (text, record) => (
      <span>
        {record.first_name} {record.middle_name} {record.last_name}
      </span>
    ),
  },
  {
    title: 'twitter',
    dataIndex: 'twitter_account',
    key: 'twitter_account',
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

class CongressPeople extends React.Component {
  componentDidMount() {
    const { fetchCongressPeople } = this.props
    fetchCongressPeople()
  }

  handleSearchChange = e => {
    const { handleInputChange } = this.props
    handleInputChange(e.target.value)
  }

  handleSubmit = e => {
    e.preventDefault()
    const { searchText, session, chamber } = this.props
    Router.push({
      pathname: '/search',
      query: {
        session,
        chamber,
        searchText,
      },
    })
  }

  render() {
    const {
      congressPeople,
      isFetching,
      searchText,
      session,
      chamber,
      changeChamber,
      changeSession,
    } = this.props

    // const { session, chamber, searchText } = query
    let filterCongressPeople
    if (searchText.length) {
      filterCongressPeople = congressPeople.filter(c => {
        const fullName = `${c.first_name} ${c.middle_name} ${c.last_name}`
        return fullName.toLowerCase().indexOf(searchText.toLowerCase()) >= 0
      })
    }
    return (
      <Row gutter={16}>
        <Col span={4}>
          <Filters />
        </Col>
        <Col span={20}>
          <Card>
            <SearchForm
              searchText={searchText}
              session={session}
              chamber={chamber}
              onSearchChange={this.handleSearchChange}
              onChamberChange={changeChamber}
              onSessionChange={changeSession}
              onSubmit={this.handleSubmit}
            />
            <div style={{ paddingTop: '20px' }}>
              <Table
                dataSource={filterCongressPeople || congressPeople || []}
                columns={columns}
                rowKey="id"
                loading={isFetching}
              />
            </div>
          </Card>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  congressPeople: getCongressPeople(state),
  isFetching: getIsFetching(state),
  searchText: getSearchText(state),
  session: getSession(state),
  chamber: getChamber(state),
})

const mapDispatchToProps = dispatch => ({
  handleInputChange: searchText => dispatch(changeInputSearch(searchText)),
  fetchCongressPeople: () => dispatch(fetchCongressPeople()),
  changeSession: session => dispatch(changeSession(session)),
  changeChamber: chamber => dispatch(changeChamber(chamber)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CongressPeople)
