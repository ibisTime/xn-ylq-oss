import React from 'react';
import './index.css';

export default class NormalPersonBox extends React.Component {
  render() {
    return (
      <div className="normal-person-wrapper" style={{backgroundImage: `url(${this.props.bgImage})`}}>
        <img src={this.props.icon}/>
        <div className="normal-content">
          <div className="normal-title">{this.props.title}</div>
          <div className="normal-amount">{this.amount || '0'}<label>人</label></div>
        </div>
      </div>
    );
  }
}
