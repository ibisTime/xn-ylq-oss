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
import { activateJUser, getUserById, getUser, addwhite, addblack } from 'api/user';
@listWrapper(
    state => ({
        ...state.userQueryUserBase,
        parentCode: state.menu.subMenuCode
    }),
    { setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData }
)
class BlackList extends React.Component {
    rockOrActive(status, code) {
        Modal.confirm({
            okText: '确认',
            cancelText: '取消',
            content: `确认${status === '0' ? '注销' : '激活'}用户？`,
            onOk: () => {
                this.props.doFetching();
                return activateJUser(code).then(() => {
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
            title: '登录账号',
            field: 'loginName'
        }, {
            title: '手机号',
            field: 'mobile',
            search: true
        }, {
            title: '推荐人',
            field: 'realName'
        }, {
            title: '所属客户',
            field: 'companyName',
            type: 'select',
            search: true,
            pageCode: '630115',
            keyName: 'userId',
            valueName: '{{realName.DATA}}-{{mobile.DATA}}',
            searchName: 'keyword',
            render: (v, data) => {
                return data.company ? data.company.businessMan.realName : '';
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
            pageCode: 805120,
            searchParams: {
                companyCode: '',
                isBlackList: '1'
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
                deleteblack: (keys, items) => {
                    if (!keys || !keys.length) {
                        showWarnMsg('请选择记录');
                    } else if (keys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (items[0].isBlackList === '0') {
                        showWarnMsg('该用户已移除黑名单');
                    }else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: `确认将该用户移除黑名单？`,
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
                // 详情
                detail: (keys, items) => {
                    if (!keys || !keys.length) {
                        showWarnMsg('请选择记录');
                    } else if (keys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/userquery/blacklist/detail?detail=1&v=1&code=${keys[0]}`);
                    }
                },
                //  报告列表
                checklist: () => {
                    this.props.history.push(`/customer/customers/reportlist/reportlibrary`);
                }}
        });
    }
}

export default BlackList;
