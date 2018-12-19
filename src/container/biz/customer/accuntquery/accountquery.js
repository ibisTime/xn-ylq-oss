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
import { showWarnMsg, moneyFormat, getCompanyCode } from 'common/js/util';
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
        const fields = [ {
            title: '户名',
            field: 'accountNumber',
            type: 'select',
            search: true,
            pageCode: '802300',
            params: {
                status: '0',
                type: 'NOT_P'
            },
            keyName: 'accountNumber',
            valueName: '{{realName.DATA}}',
            searchName: 'mobileForQuery',
            render: (v, data) => {
                return data ? data.realName : '';
            }
        }, {
            title: '账户余额',
            field: 'amount',
            render: (v, data) => {
                return moneyFormat(data.amount);
            }
        }, {
            title: '冻结金额',
            field: 'frozenAmount',
            render: (v, data) => {
                return moneyFormat(data.frozenAmount);
            }
        }, {
            title: '创建时间',
            field: 'createDatetime',
            type: 'datetime'
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'userId',
            pageCode: 802300,
            searchParams: {
              companyCode: getCompanyCode(),
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
                        this.props.history.push(`/user/users/accounts?code=${keys[0]}&companyCode=${items[0].companyCode}`);
                    }
                },
                // 详情
                detail: (keys, items) => {
                    if (!keys || !keys.length) {
                        showWarnMsg('请选择记录');
                    } else if (keys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/customer/accountquery/detail?userId=${keys[0]}&companyCode=${items[0].businessMan.companyCode}`);
                    }
                }
            }
        });
    }
}

export default AccountQuery;
