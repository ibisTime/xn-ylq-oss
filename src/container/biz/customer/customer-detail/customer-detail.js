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
} from '@redux/biz/customer/customersdetail';
import { listWrapper } from 'common/js/build-list';
import { dateTimeFormat, moneyFormat, showWarnMsg } from 'common/js/util';

@listWrapper(
    state => ({
        ...state.customerCustomersDetail,
        parentCode: state.menu.subMenuCode
    }),
    { setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData }
)
    // 平台流水详情
class Flows extends React.Component {
    render() {
        const fields = [{
            title: '户名',
            field: 'realName',
            search: true
        }, {
            title: '业务类型',
            field: 'bizType',
            key: 'biz_type',
            type: 'select',
            search: true
        }, {
            title: '变动金额',
            field: 'transAmountString',
            amount: true,
            render: (v, data) => {
                return data ? moneyFormat(data.amount) : '';
            }
        }, {
            title: '变动前金额',
            field: 'preAmountString',
            amount: true,
            render: (v, data) => {
                return data ? moneyFormat(data.amount) : '';
            }
        }, {
            title: '变动后金额',
            field: 'postAmountString',
            amount: true,
            render: (v, data) => {
                return data ? moneyFormat(data.amount) : '';
            }
        }, {
            title: '变动时间',
            field: 'createDatetime',
            type: 'date',
            rangedate: ['createDatetimeStart', 'createDatetimeEnd'],
            render: dateTimeFormat
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            search: true,
            key: 'jour_status'
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            pageCode: 802320,
            searchParams: {
                accountType: 'B'
            },
            // 流水详情
            detail: (keys, items) => {
                if (!keys || !keys.length) {
                    showWarnMsg('请选择记录');
                } else if (keys.length > 1) {
                    showWarnMsg('请选择一条记录');
                } else{
                    this.props.history.push(`/platform/flows/addedit?detail=1&v=1&code=${keys[0]}`);
                }
            }
        });
    }
}

export default Flows;
