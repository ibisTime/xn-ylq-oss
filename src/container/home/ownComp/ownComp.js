import React from 'react';
import { Row, Col } from 'antd';
import Kyyjje from '../kyyjje/kyyjje';
import Txclz from '../txclz/txclz';
import Multiple from '../multiple/multiple';
import Notice from '../notice/notice';
import Fbdsdzz from '../fbdsdzz/fbdsdzz';
import Yrydzz from '../yrydzz/yrydzz';
import fetch from 'common/js/fetch';

export default class OwnComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    fetch(805305, {
      object: 'O',
      start: '1',
      limit: '10',
      orderDir: 'desc',
      orderColumn: 'publish_datetime'
    }).then((res) => {
      res.list.length && this.setState({
        data: [{
          title: res.list[0].title,
          createDatetime: res.list[0].publishDatetime
        }]
      });
    }).catch();
  }
  goWithdraw = () => {}
  goNotice = () => {
    window.location.href = '/own/notices';
  }
  render() {
    return (
      <div>
        <Row gutter={{ xs: 6, sm: 16, md: 24, lg: 32 }} style={{marginBottom: 4}}>
          <Col span={8} style={{marginBottom: '20px'}}>
            <Kyyjje account={this.props.cnyAccount} goWithdraw={this.goWithdraw}/>
          </Col>
          <Col span={8}>
            <Txclz account={this.props.cnyAccount}/>
          </Col>
          <Col span={8}>
            <Multiple
              title0="累计获得货款"
              account0={this.props.cnyAccount}
              title1="累计提现货款"
              account1={this.props.cnyAccount}
              title2="本月货款收入"
              account2={this.props.cnyAccount}/>
          </Col>
        </Row>
        <Row gutter={{ xs: 6, sm: 16, md: 24, lg: 32 }}>
          <Col span={12}>
            <Notice
              data={this.state.data}
              goNotice={this.goNotice}
            />
          </Col>
          <Col span={12}>
            <Fbdsdzz account={this.props.cnyAccount}/>
            <Yrydzz account={this.props.cnyAccount}/>
          </Col>
        </Row>
      </div>
    );
  }
}
