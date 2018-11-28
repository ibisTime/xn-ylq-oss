import React from 'react';
import { moneyFormat } from 'common/js/util';
import '../yrydzz/index.css';
import './index.css';

export default class UserInfo extends React.Component {
  render() {
    const { icon, title, totalCount, addCount } = this.props;
    let style = this.props.style || {};
    return (
      <div className="yrydzz-content user-info-wrapper" style={style}>
        <img src={icon}/>
        <div className="white-infos">
          <div className="info-title">{title}</div>
          <div className="info-price">
            <label>累计：</label>{totalCount || 0}<i>人</i>
            <span className="info-amount"><label>新增：</label>{addCount || 0}<i>人</i></span>
          </div>
        </div>
      </div>
    );
  }
}
