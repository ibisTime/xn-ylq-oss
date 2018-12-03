import React from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Button, Spin, Modal, Form } from 'antd';
import { initData } from '@redux/finance/platform/account';
import { moneyFormat, getUserId, showSucMsg } from 'common/js/util';
import fetch from 'common/js/fetch';
import { formItemLayout } from 'common/js/config';
import CInput from 'component/cInput/cInput';

const { Meta } = Card;

@connect(
  state => state.platformAccount,
  { initData }
)
class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      btnFetching: false
    };
  }
  componentDidMount() {
    this.props.initData();
  }
  // 账户查询
    goAccounts(accountNumber) {
    this.props.history.push(`/platform/account/accounts?code=${accountNumber}`);
  }
  // 平台流水
  goFlows(type) {
    this.props.history.push(`/platform/account/flows?type=${type}`);
  }
  // 手动增发
  goAdd(currency) {
    this.currency = currency;
    this.setState({ visible: true });
  }
  onCancel = () => {
    this.setState({ visible: false });
  }
  // 获取输入框类型的控件
  getInputComp(field, title, amount) {
    let rules = [{
      required: true,
      message: '必填字段'
    }];
  }
  render() {
    const { visible, btnFetching } = this.state;
    const { cnyAccount } = this.props;
    return (
      <div>
        <Spin spinning={this.props.fetching}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={8} style={{marginBottom: '20px'}}>
              <Card title="盈亏账户"onClick={() => this.goFlows(cnyAccount.accountNumber)}>¥{moneyFormat(cnyAccount.amount || 0)}</Card>
            </Col>
            </Row>
        </Spin>
      </div>
    );
  }
}

export default Form.create()(Account);
