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
import { dateTimeFormat, showWarnMsg, getQueryString } from 'common/js/util';

@listWrapper(
    state => ({
        ...state.platformAccountFlows,
        parentCode: state.menu.subMenuCode
    }),
    { setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData }
)
class PlatformFlows extends React.Component {
    constructor(props) {
        super(props);
        this.accountNumber = getQueryString('accountNumber', this.props.location.search) || '';
    }
    render() {
        const fields = [{
            title: '户名',
            field: 'realName',
            search: true
        }, {
            title: '业务类型',
            field: 'bizType',
            type: 'select',
            search: true,
            key: 'biz_type'
        }, {
            title: '变动金额',
            field: 'transAmountString',
            amount: true
        }, {
            title: '变动前金额',
            field: 'preAmountString',
            amount: true
        }, {
            title: '变动后金额',
            field: 'postAmountString',
            amount: true
        }, {
            title: '变动时间',
            field: 'createDatetime',
            type: 'date',
            search: true,
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
                accountNumber: this.accountNumber
            },
            buttons: [{
                code: 'detail',
                name: '详情',
                handler: (keys, items) => {
                    if (!keys || !keys.length) {
                        showWarnMsg('请选择记录');
                    } else if (keys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else{
                        this.props.history.push(`/platform/flows/addedit?detail=1&v=1&code=${keys[0]}`);
                    }
                }
            }]
        });
    }
}

export default PlatformFlows;
