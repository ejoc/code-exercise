import Layout from '../components/Layout'
import CongressPeople from '../components/CongressPeople'
import { fetchCongressPeople } from '../actions'

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
  // const { session, chamber, searchText } = query
  const { dispatch } = reduxStore
  // dispatch(changeSession(session))
  // dispatch(changeChamber(chamber))
  // dispatch(changeInputSearch(searchText))
  await dispatch(fetchCongressPeople())

  return {}
}

export default CongressPage
