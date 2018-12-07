import Layout from '../components/Layout'
import CongressPeople from '../components/CongressPeople'
import { fetchCongressPeople } from '../actions/congressPeople'

const Search = (props) => (
  <Layout>
    <div style={{ padding: '10px' }}>
      <CongressPeople {...props} />
    </div>
  </Layout>
)

Search.getInitialProps = async ({ reduxStore, query }) => {
  const { session, chamber } = query
  const { dispatch } = reduxStore
  await dispatch(fetchCongressPeople(session, chamber))

  return {}
}

export default Search
