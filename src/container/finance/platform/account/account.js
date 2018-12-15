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
    this.props.history.push(`/customer/accountquery/detail?code=${accountNumber}`);
  }
  // 流水查询
  goFlows(accountNumber) {
    this.props.history.push(`/platform/account/flows?accountNumber=${accountNumber}`);
  }
    // 提现回录
    goWithdraw(accountNumber) {
        this.props.history.push(`/platform/account/enter?code=${accountNumber}`);
    }
  render() {
      const { visible, btnFetching } = this.state;
    const { cnyAccount, wxAccount } = this.props;
    return (
      <div>
        <Spin spinning={this.props.fetching}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={8} style={{marginBottom: '20px', width: '350px'}}>
              <Card style={{paddingTop: '5px', paddingBottom: '5px'}} title="盈亏账户"extra={<Button style={{float: 'right', width: '90px', heigth: '30px'}} onClick={() => this.goFlows(cnyAccount.accountNumber)} type="primary">资金流水</Button> } >¥{moneyFormat(cnyAccount.amount || 0)}
                </Card>
            </Col>
              <Col span={8} style={{marginBottom: '20px', width: '350px'}}>
                <Card title="线下托管账户" extra={
                  <Button onClick={() => this.goFlows(wxAccount.accountNumber)} type="primary">资金流水</Button>
                }>¥{moneyFormat(wxAccount.amount || 0)}
                  <Button
                      style={{float: 'right'}}
                      onClick={() => this.goWithdraw(wxAccount.accountNumber)} type="primary">提现回录</Button>
                </Card>
            </Col>
            </Row>
        </Spin>
      </div>
    );
  }
}

export default Form.create()(Account);
