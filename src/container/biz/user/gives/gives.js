import React from 'react';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/biz/user/gives';
import { listWrapper } from 'common/js/build-list';

@listWrapper(
  state => ({
    ...state.userGives,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class Gives extends React.Component {
  render() {
    const fields = [{
      title: '赠送人',
      field: 'userName'
    }, {
      title: '被赠送人',
      field: 'toUserName'
    }, {
      title: '数量',
      field: 'quantity',
      amount: true
    }, {
      title: '赠送时间',
      field: 'createDatetime',
      type: 'datetime'
    }];
    return this.props.buildList({
      fields,
      rowKey: 'id',
      pageCode: 629365
    });
  }
}

export default Gives;
