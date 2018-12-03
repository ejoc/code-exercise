import Layout from '../components/Layout'
import CongressPeople from '../components/CongressPeople'
import { fetchCongressPeople } from '../actions/congressPeople'

// const apiFilters = [
//   'party',
//   'gender',
//   'next_election',
// ]

const CongressPage =  (props) => (
  <Layout>
    <div style={{ padding: '10px' }}>
      <CongressPeople {...props} />
    </div>
  </Layout>
)

CongressPage.getInitialProps = async ({ reduxStore }) => {
  const { dispatch } = reduxStore
  await dispatch(fetchCongressPeople())
  return {}
}

export default CongressPage
