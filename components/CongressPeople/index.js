import React from 'react'
import { connect } from 'react-redux'
import { Card, Row, Col } from 'antd'

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
    votesPercentage: [0, 100],
    prevMaxTotalVotes: this.props.maxTotalVotes,
    totalVotes: [0, this.props.maxTotalVotes || 100],
  }

  static getDerivedStateFromProps(props, state) {
    if (props.maxTotalVotes !== state.prevMaxTotalVotes) {
      return {
        prevMaxTotalVotes: props.maxTotalVotes,
        totalVotes: [0, props.maxTotalVotes || 100],
      };
    }
    return null
  }

  handleVotesPercentageChange = value => {
    this.setState({ votesPercentage: value })
  }

  handleTotalVotesChange = value => {
    this.setState({ totalVotes: value })
  }

  render() {
    const { congressPeople, maxTotalVotes, isFetching, query } = this.props
    const { session, chamber, searchText, gender, party, next_election } = query
    const { votesPercentage, totalVotes } = this.state
    // console.log(maxTotalVotes, totalVotes)
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
                searchText={searchText}
                gender={gender}
                party={party}
                votesPercentage={votesPercentage}
                totalVotes={totalVotes}
                next_election={next_election}
                congressPeople={congressPeople || []}
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
