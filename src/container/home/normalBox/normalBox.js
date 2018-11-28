import React from 'react';
import { moneyFormat } from 'common/js/util';
import './index.css';

export default class NormalBox extends React.Component {
  render() {
    return (
      <div className="normal-wrapper" style={{backgroundImage: `url(${this.props.bgImage})`}}>
        <img src={this.props.icon}/>
        <div className="normal-content">
          <div className="normal-title">{this.props.title}</div>
          <div className="normal-price">
            <label>¥</label>{moneyFormat(this.props.account.amount) || '0.00'}
          </div>
        </div>
      </div>
    );
  }
}
