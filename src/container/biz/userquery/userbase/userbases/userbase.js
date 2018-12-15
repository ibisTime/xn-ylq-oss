import React from 'react';
import {Modal} from 'antd';
import { REPORT_URL } from 'common/js/config';
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
import {listWrapper} from 'common/js/build-list';
import {showSucMsg, showWarnMsg, moneyFormat, getUserId, getCompanyCode} from 'common/js/util';
import {activateUser, getUserById, getUser, addwhite, addblack} from 'api/user';

const typeDict = {
    'W': '渠道',
    'C': 'C端用户'
};

@listWrapper(
    state => ({
        ...state.userQueryUserBase,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Userbase extends React.Component {
    rockOrActive(status, code) {
        Modal.confirm({
            okText: '确认',
            cancelText: '取消',
            content: `确认${status === '0' ? '禁止' : '恢复'}用户登录？`,
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
        const fields = [
            {
                title: '姓名',
                field: 'realName',
                search: true,
                render: (v, data) => {
                    return data.realName ? data.realName : '';
                }
            }, {
                title: '手机号',
                field: 'mobile',
                search: true
            }, {
                title: '推荐人',
                field: 'refereeWay',
                //   render: (v, data) => {
               // return data ? moneyFormat(data.amount) : '';
                render: (v, d) => {
                    if (d.refereeWay) {
                        return d.refereeWay.name ? `${d.refereeWay.name}(${typeDict[d.refereeType]})` : `-(${typeDict[d.refereeType]})`;
                    }else if (d.refereeUser) {
                        return d.refereeUser.realName ? `${d.refereeUser.realName}(${typeDict[d.refereeType]})` : `-(${typeDict[d.refereeType]})`;
                    }else {
                        return '';
                    }
                }
            }, {
                title: '所属客户',
                field: 'companyCode',
                type: 'select',
                search: true,
                pageCode: '630115',
                keyName: 'companyCode',
                valueName: '{{realName.DATA}}-{{mobile.DATA}}',
                searchName: 'keyword',
                render: (v, data) => {
                    return data.businessMan ? data.businessMan.realName + '-' + data.businessMan.mobile : '';
                }
            }, {
                title: '注册时间',
                field: 'createDatetime',
                type: 'datetime'
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
            btnEvent: {
                // 加入黑名单
                addblack: (keys, items) => {
                    if (!keys || !keys.length) {
                        showWarnMsg('请选择记录');
                    } else if (keys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (items[0].isBlackList === '1') {
                        showWarnMsg('该用户已在黑名单');
                    } else {
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
                // 加入白名单
                addwhite: (keys, items) => {
                    if (!keys || !keys.length) {
                        showWarnMsg('请选择记录');
                    } else if (keys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (items[0].isWhiteList === '1') {
                        showWarnMsg('该用户已在白名单');
                    } else {
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
                //  报告列表
                checklist: (keys, items) => {
                    this.props.history.push(`/userquery/reportlist?code=${keys[0]}`);
                },
                //  最新报告
                newreport: (keys, items) => {
                    if (!keys || !keys.length) {
                        showWarnMsg('请选择记录');
                    } else if (keys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        window.open(REPORT_URL + `?userId=` + items[0].userId + '&companyCode=' + items[0].companyCode);
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

export default Userbase;
