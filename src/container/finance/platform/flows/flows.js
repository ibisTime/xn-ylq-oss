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
} from '@redux/finance/platform/flows';
import { listWrapper } from 'common/js/build-list';
import { dateTimeFormat } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.platformFlows,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class PlatformFlows extends React.Component {
    render() {
        const fields = [{
            title: '户名',
            field: 'relaNameForQuery',
            render: (v, d) => d.realName,
            search: true
        }, {
            title: '业务类型',
            field: 'bizType',
            type: 'select',
            key: 'biz_type'
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
            title: '创建时间',
            field: 'createDatetime',
            type: 'date',
            rangedate: ['createDatetimeStart', 'createDatetimeEnd'],
            render: dateTimeFormat
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'jour_status'
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            pageCode: 802320,
            searchParams: {
            }
        });
    }
}

export default PlatformFlows;
