import { Layout } from 'antd'

const { Header, Footer, Content } = Layout

export default ({ children }) => (
  <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      header
    </Header>
    <Content style={{ padding: '0 50px', marginTop: 64, minHeight: '250px' }}>
      {children}
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      footer
    </Footer>
  </Layout>
)