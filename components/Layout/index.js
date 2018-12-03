import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import NProgress from 'nprogress'
import { Layout, Row, Col } from 'antd'

import '../../styles/style.less'

Router.onRouteChangeStart = () => {
  NProgress.start()
}

Router.onRouteChangeComplete = () => {
  NProgress.done()
}

Router.onRouteChangeError = () => {
  NProgress.done()
}

const { Footer, Content } = Layout

export default ({ children }) => (
  <Layout>
    <header id="header">
      <Row>
        <Col xxl={5} xl={5} lg={4} md={6} sm={24} xs={24}>
          <Link href="/">
            <a id="logo">
              <img src="/static/logo.png" alt="logo" />
            </a>
          </Link>
        </Col>
      </Row>
    </header>
    <Content style={{ padding: '0 20px', marginTop: 15, minHeight: '250px' }}>
      {children}
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      Elias Ortega
    </Footer>
  </Layout>
)