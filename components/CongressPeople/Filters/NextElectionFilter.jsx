import React from 'react'
import Link from 'next/link'
import { InputNumber, Button } from 'antd'

// const NextElectionFilter = ({ query }) => (
//   <div>
//     <InputNumber defaultValue={filter} /> <Button icon="search" />
//   </div>
// )

class NextElectionFilter extends React.Component {
  state = {
    input: '',
  }

  handleInputChange = input => {
    this.setState({ input })
  }

  render() {
    const { input } = this.state
    const { query } = this.props
    return (
      <div>
        <InputNumber
          // value={input}
          onChange={this.handleInputChange}
          defaultValue={query.next_election}
        />{' '}
        <Link
          href={{
            query: { ...query, next_election: input },
          }}
        >
          <Button icon="search" />
        </Link>
      </div>
    )
  }
}

export default NextElectionFilter
