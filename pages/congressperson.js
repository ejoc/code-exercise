import Layout from '../components/Layout'
import CongressPerson from '../components/CongressPerson'
import { fecthCongressPerson } from '../actions/congressPerson'

const CongressPersonPage = (props) => (
  <Layout>
    <CongressPerson {...props} />
  </Layout>
)

CongressPersonPage.getInitialProps = async ({ reduxStore, query }) => {
  const { dispatch } = reduxStore
  await dispatch(fecthCongressPerson(query.id))
  return {}
}

export default CongressPersonPage