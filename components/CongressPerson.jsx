import React from 'react'
import { connect } from 'react-redux'
import { Card, Form, Icon, Table, Row, Col } from 'antd'
import { getIsFetching, getCongressPerson } from '../reducers/congressPerson'
import OfficeMap from './OfficeMap'

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
})

const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const columns = [
  {
    title: 'Congress',
    dataIndex: 'congress',
    key: 'congress',
  },
  {
    title: 'Chamber',
    dataIndex: 'chamber',
    key: 'chamber',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'State',
    dataIndex: 'state',
    key: 'state',
  },
  {
    title: 'Party',
    dataIndex: 'party',
    key: 'party',
  },
]

const committeesColumns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Code', dataIndex: 'code', key: 'code' },
  { title: 'Side', dataIndex: 'side', key: 'side' },
  { title: 'Title', dataIndex: 'title', key: 'title' },
  { title: 'Begin date', dataIndex: 'begin_date', key: 'begin_date' },
  { title: 'End date', dataIndex: 'end_date', key: 'end_date' },
]

const expandedRowRender = record => (
  <Table
    columns={committeesColumns}
    dataSource={record.committees}
    rowKey="code"
    pagination={false}
  />
)

const CongressPerson = ({ congressPerson, isFetching }) => (
  <div style={{ padding: '0 45px' }}>
    <Card
      title={congressPerson && congressPerson.first_name}
      loading={isFetching}
    >
      {congressPerson && (
        <div>
          <Row>
            <Col span={12}>
              <Form>
                <FormItem {...formItemLayout} label="Fullname">
                  <span className="ant-form-text">
                    {congressPerson.first_name} {congressPerson.middle_name}{' '}
                    {congressPerson.last_name}
                  </span>
                </FormItem>
                <FormItem {...formItemLayout} label="Party">
                  <span className="ant-form-text">
                    {congressPerson.current_party}
                  </span>
                </FormItem>
                <FormItem {...formItemLayout} label="Social media">
                  <span className="ant-form-text">
                    {congressPerson.twitter_account && (
                      <a
                        href={`https://twitter.com/${
                          congressPerson.twitter_account
                        }`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <IconFont type="icon-twitter" />
                      </a>
                    )}{' '}
                    |{' '}
                    {congressPerson.facebook_account && (
                      <a
                        href={`https://www.facebook.com/${
                          congressPerson.facebook_account
                        }`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <IconFont type="icon-facebook" />
                      </a>
                    )}
                  </span>
                </FormItem>
                <FormItem {...formItemLayout} label="Most recent vote">
                  <span className="ant-form-text">
                    {congressPerson.most_recent_vote}
                  </span>
                </FormItem>
                <FormItem {...formItemLayout} label="Birthday">
                  <span className="ant-form-text">
                    {congressPerson.date_of_birth}
                  </span>
                </FormItem>
              </Form>
            </Col>

            <Col span={12}>
              {congressPerson.roles[0].office && (
                <OfficeMap
                  office={congressPerson.roles[0].office}
                  isMarkerShown
                />
              )}
            </Col>
          </Row>

          <Card type="inner" title="Roles">
            <Table
              dataSource={congressPerson.roles}
              columns={columns}
              expandedRowRender={expandedRowRender}
              rowKey="congress"
            />
          </Card>
        </div>
      )}
    </Card>
  </div>
)

const mapStateToProps = (state, props) => ({
  isFetching: getIsFetching(state),
  congressPerson: getCongressPerson(state, props.query.id),
})

export default connect(mapStateToProps)(CongressPerson)
