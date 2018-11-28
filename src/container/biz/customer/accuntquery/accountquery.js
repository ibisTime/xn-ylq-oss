import React from 'react';
import { Modal } from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/biz/customer/accountquery';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, moneyFormat } from 'common/js/util';
import { activateUser } from 'api/user';

@listWrapper(
    state => ({
        ...state.customerAccountQuery,
        parentCode: state.menu.subMenuCode
    }),
    { setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData }
)
class AccountQuery extends React.Component {
    render() {
        const fields = [{
            title: '户名',
            field: 'accountNumber',
            search: true
        }, {
            title: '账户余额',
            field: 'amount',
            render: (v, data) => {
                return data ? moneyFormat(data.amount) : '';
            }
        }, {
            title: '冻结金额',
            field: 'frozenAmount',
            render: (v, data) => {
                return data ? moneyFormat(data.amount) : '';
            }
        }, {
            title: '创建时间',
            field: 'createDatetime',
            type: 'datetime'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'user_status',
            search: true
        }, {
            title: '备注',
                field: 'remark'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'userId',
            pageCode: 802300,
            searchParams: {
                type: 'B'
            },
            btnEvent: {
                // 账户查询
                accounts: (keys, items) => {
                    if (!keys || !keys.length) {
                        showWarnMsg('请选择记录');
                    } else if (keys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/user/users/accounts?code=${keys[0]}`);
                    }
                },
                // 详情
                detail: (keys, items) => {
                    if (!keys || !keys.length) {
                        showWarnMsg('请选择记录');
                    } else if (keys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/customer/customers/detail?detail=1&v=1&code=${keys[0]}`);
                    }
                }
            }
        });
    }
}

export default AccountQuery;
