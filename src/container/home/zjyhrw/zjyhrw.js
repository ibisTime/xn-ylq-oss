import React from 'react';
import { Table } from 'antd';
import { dateFormat } from 'common/js/util';
import YhrwImg from './yhrw.png';
import './index.css';

const statusDict = {
  '0': '待认养',
  '1': '已认养'
};
const columns = [{
  title: '树木编号',
  dataIndex: 'treeNumber',
  key: 'treeNumber'
}, {
  title: '树龄',
  dataIndex: 'age',
  key: 'age'
}, {
  title: '状态',
  dataIndex: 'status',
  key: 'status',
  render: (v) => statusDict[v]
}];

export default class Zjyhrw extends React.Component {
  render() {
    return (
      <div className="notice-wrapper">
        <div className="notice-title"><img src={YhrwImg}/>最近养护任务</div>
        <Table
          className="notice-table-wrapper"
          columns={columns}
          dataSource={this.props.data}
          pagination={false} />
      </div>
    );
  }
}
