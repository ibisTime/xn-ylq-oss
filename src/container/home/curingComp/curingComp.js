import React from 'react';
import { Row, Col } from 'antd';
import Kyyjje from '../kyyjje/kyyjje';
import Txclz from '../txclz/txclz';
import Multiple from '../multiple/multiple';
import Notice from '../notice/notice';
import Zjyhrw from '../zjyhrw/zjyhrw';
import fetch from 'common/js/fetch';

export default class CuringComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      yhData: []
    };
  }
  componentDidMount() {
    fetch(805305, {
      object: 'M',
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
  goWithdraw() {}
  goNotice = () => {
    // window.location.href = '/own/notices';
  }
  render() {
    return (
      <div>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{marginBottom: 4}}>
          <Col span={8} style={{marginBottom: '20px'}}>
            <Kyyjje account={this.props.cnyAccount} goWithdraw={this.goWithdraw}/>
          </Col>
          <Col span={8}>
            <Txclz account={this.props.cnyAccount}/>
          </Col>
          <Col span={8}>
            <Multiple account0={this.props.cnyAccount} account1={this.props.cnyAccount} account2={this.props.cnyAccount}/>
          </Col>
        </Row>
        <Row gutter={{ xs: 12, sm: 24, md: 24, lg: 32 }}>
          <Col span={12}>
            <Notice
              data={this.state.data}
              goNotice={this.goNotice}
            />
          </Col>
          <Col span={12} style={{marginBottom: '20px'}}>
            <Zjyhrw data={this.state.yhData}/>
          </Col>
        </Row>
      </div>
    );
  }
}
