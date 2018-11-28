import React from 'react';
import { moneyFormat } from 'common/js/util';
import BagImg from './bag.png';
import './index.css';

export default class Yrydzz extends React.Component {
  render() {
    return (
      <div className="yrydzz-content">
        <img src={BagImg}/>
        <div className="white-infos">
          <div className="info-title">已认养的总值</div>
          <div className="info-price">
            <label>¥</label>{moneyFormat(this.props.account.frozenAmount) || '0.00'}
            <span className="info-amount">100<span className="info-unit">棵</span></span>
          </div>
        </div>
      </div>
    );
  }
}
