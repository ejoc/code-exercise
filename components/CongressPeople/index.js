import React from 'react'
import { connect } from 'react-redux'
import { Card, Row, Col, Button } from 'antd'

import CongressPeopleList from './CongressPeopleList'
import SearchForm from './SearchForm'
import Filters from './Filters'
import VotesPercentage from '../VotesPercentage'
import TotalVotes from '../TotalVotes'
import { fetchCongressPeople } from '../../actions/congressPeople'
import {
  getCongressPeople,
  getIsFetching,
} from '../../reducers/congressPeople'

class CongressPeople extends React.Component {
  state = {
    votesPercentage: [],
    totalVotes: [],
  }

  // componentDidMount() {
  //   const { fetchCongressPeople } = this.props
  //   fetchCongressPeople()
  // }

  handleVotesPercentageChange = value => {
    this.setState({ votesPercentage: value })
  }

  handleTotalVotesChange = value => {
    this.setState({ totalVotes: value })
  }

  handleVotesSliderClear = e => {
    e.preventDefault()
    this.setState({ totalVotes: [], votesPercentage: [] })
  }

  render() {
    const { congressPeople, maxTotalVotes, isFetching, query } = this.props
    const { searchText, session, chamber, gender, party, next_election } = query
    const { votesPercentage, totalVotes } = this.state
    console.log(totalVotes)
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
    return (
      <Row gutter={16}>
        <Col span={5}>
          <Filters query={query} />
          <Card>
            <VotesPercentage value={votesPercentage} onChange={this.handleVotesPercentageChange} />
            <TotalVotes
              value={totalVotes}
              max={maxTotalVotes}
              onChange={this.handleTotalVotesChange}
            />
            {(totalVotes.length > 1 || votesPercentage.length > 1) && (
              <Button onClick={this.handleVotesSliderClear}>Clear</Button>
            )}
          </Card>
        </Col>
        <Col span={19}>
          <Card>
            <SearchForm
              query={query}
              searchText={searchText}
              session={session}
              chamber={chamber}
            />
            <div style={{ paddingTop: '20px' }}>
              <CongressPeopleList
                congressPeople={filterCongressPeople || congressPeople || []}
                loading={isFetching}
              />
            </div>
          </Card>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state, props) => {
  const { query } = props
  const congressPeople = getCongressPeople(state, query.session, query.chamber)
  const maxTotalVotes =
    congressPeople && Math.max(...congressPeople.map(o => o.total_votes))
  return {
    congressPeople,
    maxTotalVotes,
    isFetching: getIsFetching(state),
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCongressPeople: (session, chamber) =>
    dispatch(fetchCongressPeople(session, chamber)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CongressPeople)
