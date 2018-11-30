import React from 'react';
import {Button} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/biz/customer/accountquerydetail';
import { listWrapper } from 'common/js/build-list';
import { dateTimeFormat, showWarnMsg, getQueryString } from 'common/js/util';

@listWrapper(
    state => ({
        ...state.accountQueryDetail,
        parentCode: state.menu.subMenuCode
    }),
    { setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData }
)
class accountQuery extends React.Component {
    constructor(props) {
        super(props);
        this.accountNumber = getQueryString('accountNumber', this.props.location.search) || '';
        this.userId = getQueryString('userId', this.props.location.search) || '';
    }
    goBack = () => {
        this.props.history.go(-1);
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
        return (
            <div>

                {this.props.buildList({
                    fields,
                    noSelect: true,
                    pageCode: 802320,
                    key: 'accountNumber',
                    searchParams: {
                        accountNumber: this.accountNumber,
                        userId: this.userId
                    },
                    buttons: []
                })}
                <div style={{width: '100%', marginTop: '15px', textAlign: 'center'}}>
                    <Button onClick={() => this.goBack()} type="primary">返回</Button>
                </div>
            </div>
        );
    }
}

export default accountQuery;
