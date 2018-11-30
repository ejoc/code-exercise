import Layout from '../components/Layout'
import CongressPeople from '../components/CongressPeople'
import { changeSession, changeChamber, changeInputSearch, fetchCongressPeople } from '../actions'

const Search = (props) => (
  <Layout>
    <div style={{ padding: '10px' }}>
      <CongressPeople {...props} />
    </div>
  </Layout>
)

Search.getInitialProps = async ({ reduxStore, query }) => {
  const { session, chamber, searchText } = query
  const { dispatch } = reduxStore
  dispatch(changeSession(session))
  dispatch(changeChamber(chamber))
  dispatch(changeInputSearch(searchText))
  await dispatch(fetchCongressPeople())

  return {}
}

export default Search
