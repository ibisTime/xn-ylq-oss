import React from 'react';
import { moneyFormat } from 'common/js/util';
import TimeImg from './time.png';
import './index.css';

export default class Txclz extends React.Component {
  render() {
    return (
      <div className="txclz-wrapper">
        <div className="title"><img src={TimeImg}/>提现处理中</div>
        <div className="price-content"><label>¥</label>{moneyFormat(this.props.account.amount) || '0.00'}</div>
        <div className="tip">平台正在加紧处理，请您耐心等待</div>
      </div>
    );
  }
}
