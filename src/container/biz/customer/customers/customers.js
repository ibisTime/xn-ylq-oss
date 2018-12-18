import React from 'react';
import {Modal} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/biz/customer/customers';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, moneyFormat, formatFile} from 'common/js/util';
import {activateJUser} from 'api/user';

@listWrapper(
    state => ({
        ...state.customerCustomers,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Customers extends React.Component {
    rockOrActive(status, code) {
        Modal.confirm({
            okText: '确认',
            cancelText: '取消',
            content: `确认${status === '0' ? '注销' : '激活'}用户？`,
            onOk: () => {
                this.props.doFetching();
                return activateJUser(code).then(() => {
                    this.props.getPageData();
                    showWarnMsg('操作成功');
                }).catch(() => {
                    this.props.cancelFetching();
                });
            }
        });
    }

    render() {
        const fields = [
            {
                title: '编号',
                field: 'companyCode'
            }, {
                title: '姓名',
                field: 'realName'
            }, {
                title: '手机号',
                field: 'keyword',
                render: (v, data) => data ? data.mobile : '',
                search: true
            }, {
                title: '登录账号',
                field: 'loginName'
            }, {
                title: '累计消费',
                field: 'outAmount',
                render: (v, data) => {
                    return data ? moneyFormat(data.outAmount) : '';
                }
            }, {
                title: '账户余额',
                field: 'amount',
                render: (v, data) => {
                    return data.account ? moneyFormat(data.account.amount) : '';
                }
            }, {
                title: 'app名',
                field: 'name',
                render: (v, data) => {
                    return data.company ? data.company.name : '';
                }
            }, {
                title: 'logo',
                field: 'logo',
                render: (v, data) => {
                    if(data.company) {
                        return (<div width={'30px'}><img width={'30px'} src={formatFile(data.company.logo)}/></div>);
                    }
                }
            }, {
                title: '注册时间',
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
            pageCode: 630115,
            searchParams: {
                companyCode: '',
                isAdmin: '1'
            },
            btnEvent: {
                // 账户余额
                amount: (keys, items) => {
                    if (!keys || !keys.length) {
                        showWarnMsg('请选择记录');
                    } else if (keys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/customer/customers/amount?userId=${keys[0]}`);
                    }
                },
                detail: (keys, items) => {
                    if (!keys || !keys.length) {
                        showWarnMsg('请选择记录');
                    } else if (keys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/customer/customers/detail?detail=1&v=1&companyCode=${items[0].companyCode}`);
                    }
                },
                //  报告列表
                checklist: (keys, items) => {
                        this.props.history.push(`/customer/customers/reportlist`);
                },
              // Android 版本
                andition: (keys, items) => {
                if (!keys || !keys.length) {
                  showWarnMsg('请选择记录');
                } else if (keys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/customer/customers/androdition?companyCode=${items[0].companyCode}`);
                }
              },
              // Android 版本
              iosition: (keys, items) => {
                if (!keys || !keys.length) {
                  showWarnMsg('请选择记录');
                } else if (keys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/customer/customers/iosrodition?companyCode=${items[0].companyCode}`);
                }
              },

                // 注销
                rock: (keys, items) => {
                    if (!keys || !keys.length) {
                        showWarnMsg('请选择记录');
                    } else if (keys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.rockOrActive(items[0].status, keys[0]);
                    }
                }
            }
        });
    }
}

export default Customers;
