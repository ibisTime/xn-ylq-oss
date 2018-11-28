import React from 'react';
import { moneyFormat } from 'common/js/util';
import BagImg from './bag.png';
import '../yrydzz/index.css';

export default class Djsje extends React.Component {
  render() {
    let style = this.props.style || {};
    return (
      <div className="fbdsdzz-content" style={style}>
        <img src={BagImg}/>
        <div className="white-infos">
          <div className="info-title">待结算金额</div>
          <div className="info-price">
            <label>¥</label>{moneyFormat(this.props.amount) || '0.00'}
          </div>
        </div>
      </div>
    );
  }
}
