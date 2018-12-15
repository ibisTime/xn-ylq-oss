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
      if (amount) {
          rules.push({
              pattern: /(^[1-9](,\d{3}|[0-9])*(\.\d{1,2})?$)|([0])/,
              message: '金额必须>=0，且小数点后最多2位'
          });
      }
      const props = {
          rules,
          title,
          field,
          label: title,
          getFieldDecorator: this.props.form.getFieldDecorator,
          getFieldError: this.props.form.getFieldError,
          getFieldValue: this.props.form.getFieldValue
      };
      return <CInput key={field} {...props} />;
  }
    // 页面提交
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({ btnFetching: true });
                values.updater = getUserId();
                values.amount *= 1000;
                values.currency = this.currency;
                fetch(802342, values).then(() => {
                    this.props.initData();
                    showSucMsg('操作成功');
                    this.setState({
                        btnFetching: false,
                        visible: false
                    });
                }).catch(() => this.setState({ btnFetching: false }));
            }
        });
    }
  render() {
      const { visible, btnFetching } = this.state;
    const { cnyAccount, wxAccount } = this.props;
    return (
      <div>
        <Spin spinning={this.props.fetching}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={8} style={{marginBottom: '20px', width: '350px'}}>
              <Card title="盈亏账户">¥{moneyFormat(cnyAccount.amount || 0)}
                <Button style={{float: 'right'}} onClick={() => this.goFlows(cnyAccount.accountNumber)} type="primary">流水查询</Button> </Card>
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
