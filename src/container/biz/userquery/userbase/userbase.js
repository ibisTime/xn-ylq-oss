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
} from '@redux/biz/userquery/userbase';
import { listWrapper } from 'common/js/build-list';
import { showSucMsg, showWarnMsg, moneyFormat, getUserId } from 'common/js/util';
import { activateUser, getUserById, getUser, addwhite, addblack } from 'api/user';
@listWrapper(
    state => ({
        ...state.userQueryUserBase,
        parentCode: state.menu.subMenuCode
    }),
    { setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData }
)
class Userbase extends React.Component {
    rockOrActive(status, code) {
        Modal.confirm({
            okText: '确认',
            cancelText: '取消',
            content: `确认${status === '0' ? '注销' : '激活'}用户？`,
            onOk: () => {
                this.props.doFetching();
                return activateUser(code).then(() => {
                    this.props.getPageData();
                    showSucMsg('操作成功');
                }).catch(() => {
                    this.props.cancelFetching();
                });
            }
        });
    }
    render() {
        const fields = [{
            title: '手机号',
            field: 'mobile',
            search: true
        }, {
            title: '推荐人',
            field: 'realName'
        }, {
            title: '所属客户',
            field: 'companyCode',
            type: 'select',
            pageCode: '630115',
            keyName: 'companyCode',
            valueName: '{{realName.DATA}}',
            searchName: 'keyword',
            search: true,
            render: (v, data) => {
                return data.businessMan.loginName ? data.businessMan.loginName : '';
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
            title: '是否黑名单',
            field: 'isBlackList',
            type: 'select',
            data: [{
                'key': '1',
                'value': '是'
            }, {
                'key': '0',
                'value': '否'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            title: '是否白名单',
            field: 'isWhiteList',
            type: 'select',
            data: [{
                'key': '1',
                'value': '是'
            }, {
                'key': '0',
                'value': '否'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'userId',
            pageCode: 805120,
            searchParams: {
                companyCode: ''
            },
            btnEvent: {
                // 添加备注
                addRemark: (keys, items) => {
                    if (!keys || !keys.length) {
                        showWarnMsg('请选择记录');
                    } else if (keys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    }else {
                        this.props.history.push(`/userquery/userqueryaddedit?code=${keys[0]}`);
                    }
                },
                addblack: (keys, items) => {
                    if (!keys || !keys.length) {
                        showWarnMsg('请选择记录');
                    } else if (keys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (items[0].isBlackList === '1') {
                        showWarnMsg('该用户已在黑名单');
                    }else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: `确认将该用户加入黑名单？`,
                            onOk: () => {
                                this.props.doFetching();
                                return addblack(items[0].userId).then(() => {
                                    this.props.getPageData();
                                    showSucMsg('操作成功');
                                }).catch(() => {
                                    this.props.cancelFetching();
                                });
                            }
                        });
                    }
                },
                addwhite: (keys, items) => {
                    if (!keys || !keys.length) {
                          showWarnMsg('请选择记录');
                    } else if (keys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (items[0].isWhiteList === '1') {
                        showWarnMsg('该用户已在白名单');
                    }else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: `确认将该用户加入白名单？`,
                            onOk: () => {
                                this.props.doFetching();
                                return addwhite(items[0].userId).then(() => {
                                    this.props.getPageData();
                                    showSucMsg('操作成功');
                                }).catch(() => {
                                    this.props.cancelFetching();
                                });
                            }
                        });
                    }
                },
                // 账户余额
                detail: (keys, items) => {
                    this.props.history.push(`/customer/customers/detail?detail=1&v=1&code=${keys[0]}`);
                },
                //  报告列表
                checklist: () => {
                    this.props.history.push(`/customer/customers/reportlist/reportlibrary`);
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
                }}
        });
    }
}

export default Userbase;
