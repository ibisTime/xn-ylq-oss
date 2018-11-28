import React from 'react';
import { Row, Col } from 'antd';
import NormalBox from '../normalBox/normalBox';
import NormalPersonBox from '../normalPersonBox/normalPersonBox';
import LjhdyjImg from './ljhdyj.png';
import SyyjsrImg from './syyjsr.png';
import DjsjeImg from './djsje.png';
import BlueImg from './blue.png';
import GreenImg from './green.png';
import RedImg from './red.png';
import UserImg from './user.png';
import UsersImg from './users.png';

export default class Saleman extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      yhData: []
    };
  }
  goWithdraw() {}
  render() {
    return (
      <div>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{marginBottom: 4}}>
          <Col span={8} style={{marginBottom: '20px'}}>
            <NormalBox
              icon={LjhdyjImg}
              title='累计获得佣金'
              account={this.props.cnyAccount}
              bgImage={BlueImg}/>
          </Col>
          <Col span={8}>
            <NormalBox
              icon={SyyjsrImg}
              title='上月佣金收入'
              account={this.props.cnyAccount}
              bgImage={GreenImg}/>
          </Col>
          <Col span={8}>
            <NormalBox
              icon={DjsjeImg}
              title='待结算金额'
              account={this.props.cnyAccount}
              bgImage={RedImg}/>
          </Col>
        </Row>
        <Row gutter={{ xs: 12, sm: 24, md: 24, lg: 32 }}>
          <Col span={12}>
            <NormalPersonBox icon={UserImg} title="新增用户" amount={this.props.amount || 0}/>
          </Col>
          <Col span={12} style={{marginBottom: '20px'}}>
            <NormalPersonBox icon={UsersImg} title="累计用户" amount={this.props.amount || 0}/>
          </Col>
        </Row>
      </div>
    );
  }
}
