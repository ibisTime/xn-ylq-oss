import React from 'react';
import { Modal, Button } from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/biz/userquery/whitelist';
import { listWrapper } from 'common/js/build-list';
import { showSucMsg, showWarnMsg, getQueryString, moneyFormat, getUserId } from 'common/js/util';
import { activateJUser, getUserById, getUser, addwhite, addblack } from 'api/user';
import { REPORT_URL } from 'common/js/config';
const typeDict = {
    'C': 'C端用户',
    'W': '渠道'
};
@listWrapper(
    state => ({
        ...state.userQueryWhiteList,
        parentCode: state.menu.subMenuCode
    }),
    { setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData }
)
class Reportlist extends React.Component {
    constructor(props) {
        super(props);
        this.userId = getQueryString('userId', this.props.location.search) || '';
    }
    goBack = () => {
        this.props.history.go(-1);
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
                render: (v, d) => {
                    if (d.refereeWay) {
                        return `${d.refereeWay.name}(${typeDict[d.refereeType]})`;
                    }
                    return '';
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
        return (
            <div>
                {
                    this.props.buildList({
                        fields,
                        rowKey: 'userId',
                        pageCode: 805120,
                        code: this.code,
                        searchParams: {
                            companyCode: ''
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
                                    window.open(REPORT_URL + `?userId=` + items[0].userId);
                                }
                            }
                        }
                        ]
                    })
                }
                <div style={{width: '100%', marginTop: '15px', textAlign: 'center'}}>
                    <Button onClick={() => this.goBack()} type="primary">返回</Button>
                </div>
            </div>
        );
    }
}

export default Reportlist;
