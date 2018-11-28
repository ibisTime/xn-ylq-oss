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
} from '@redux/finance/platform/accountFlows';
import { listWrapper } from 'common/js/build-list';
import { getQueryString, dateTimeFormat } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.platformAccountFlows
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class PlatformAccountFlows extends React.Component {
  constructor(props) {
    super(props);
    this.accountNumber = getQueryString('code', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '户名',
      field: 'relaNameForQuery',
      render: (v, d) => d.realName
    }, {
      title: '业务类型',
      field: 'bizType',
      type: 'select',
      key: 'biz_type',
      search: true
    }, {
      title: '变动金额',
      field: 'transAmount',
      amount: true
    }, {
      title: '变动前金额',
      field: 'preAmount',
      amount: true
    }, {
      title: '变动后金额',
      field: 'postAmount',
      amount: true
    }, {
      title: '状态',
      field: 'status',
      type: 'select',
      key: 'jour_status'
    }, {
      title: '变动时间',
      field: 'createDatetime',
      type: 'date',
      rangedate: ['createDatetimeStart', 'createDatetimeEnd'],
      render: dateTimeFormat
    }];
    return this.props.buildList({
      fields,
      pageCode: 630115,
      searchParams: {
        type: '0',
        accountNumber: this.accountNumber
      }
    });
  }
}

export default PlatformAccountFlows;
