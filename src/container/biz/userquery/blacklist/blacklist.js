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
} from '@redux/biz/userquery/blacklist';
import { listWrapper } from 'common/js/build-list';
import { showSucMsg, showWarnMsg, moneyFormat, getUserId } from 'common/js/util';
import { activateJUser, getUserById, getUser, addwhite, addblack } from 'api/user';
import { REPORT_URL } from 'common/js/config';
const typeDict = {
    'C': 'C端用户',
    'W': '渠道'
};
@listWrapper(
    state => ({
        ...state.userQueryBlackList,
        parentCode: state.menu.subMenuCode
    }),
    { setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData }
)
class BlackList extends React.Component {
    render() {
        const fields = [ {
            title: '姓名',
            field: 'realName',
            search: true,
            render: (v, data) => {
                return data.realName ? data.realName : '';
            }
        }, {
            title: '登录账号',
            field: 'loginName'
        }, {
            title: '手机号',
            field: 'mobile',
            search: true
        }, {
          title: '推荐人',
          field: 'userReferee',
          render: (v, d) => {
            if (d.refereeWay) {
              return `${d.refereeWay.name}-(${typeDict[d.refereeType]})`;
            }else if (d.refereeUser) {
              return d.refereeUser.realName ? `${d.refereeUser.realName}-${d.refereeUser.mobile}(${typeDict[d.refereeType]})` : `${d.refereeUser.mobile}-(${typeDict[d.refereeType]})`;
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
              params: {
                isAdmin: '1',
                companyCode: ''
              },
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
                isBlackList: '1'
            },
            beforeSearch: (data) => {
                if (data.companyCode === '' || !data.companyCode) {
                    data.companyCode = '';
                }
                return data;
            },
            btnEvent: {
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
                //  报告列表
                checklist: (keys, items) => {
                    this.props.history.push(`/userquery/blacklist/reportlist`);
                }
            }
        });
    }
}

export default BlackList;
