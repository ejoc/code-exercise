import React from 'react'
import Link from 'next/link'
import { Card, Collapse } from 'antd'

import PartyFilter from './PartyFilter'
import GenderFilter from './GenderFilter'
import NextElectionFilter from './NextElectionFilter'

const { Panel } = Collapse

const Filters = (props) => {
  const { query } = props
  const { party, gender, next_election, ...restQuery } = query
  return (
    <Card title="Filters">
      <Collapse defaultActiveKey={Object.keys(query)}>
        <Panel header="Party" key="party">
          <PartyFilter {...props} />
        </Panel>

        <Panel header="Gender" key="gender">
          <GenderFilter {...props} />
        </Panel>

        <Panel header="Next election" key="next_election">
          <NextElectionFilter {...props} />
        </Panel>
      </Collapse>
      {(query.party || query.gender || query.next_election) && (
        <Link
          href={{
            query: { ... restQuery},
          }}
        >
          <a>Clear</a>
        </Link>
      )}
    </Card>
  )
}

export default Filters