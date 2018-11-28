import React from 'react';
import { moneyFormat } from 'common/js/util';
import MoneyImg from './money.png';
import './index.css';

export default class Kyyjje extends React.Component {
  render() {
    return (
      <div className="kyyjje-wrapper">
        <div className="title"><img src={MoneyImg}/>可用佣金金额</div>
        <div className="price-content">
          <label>¥</label>{moneyFormat(this.props.account.amount) || '0.00'}
        </div>
        <div onClick={this.props.goWithdraw} className="btn-brd">提现</div>
      </div>
    );
  }
}
