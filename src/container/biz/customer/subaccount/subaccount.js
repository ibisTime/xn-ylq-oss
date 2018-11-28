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
} from '@redux/biz/user/users';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg } from 'common/js/util';
import { activateUser } from 'api/user';

const typeDict = {
    'P': '平台',
    'O': '产权',
    'M': '养护',
    'A': '代理商',
    'S': '业务员',
    'U': 'C端用户'
};

@listWrapper(
    state => ({
        ...state.customerSubAccount,
        parentCode: state.menu.subMenuCode
    }),
    { setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData }
)
class Subaccount extends React.Component {
   render() {
        const fields = [{
            title: '姓名',
            field: 'name',
            input: true
        }, {
            title: '手机号',
            field: 'mobile',
            search: true
        }, {
            title: '推荐人',
            field: 'userRefree',
            search: true,
            type: 'select'

        }, {
            title: '借条模块',
            field: 'nickname',
            search: true,
            type: 'select'
        }, {
            title: '风控模块',
            field: 'nickname',
            search: true,
            type: 'select'
        }, {
            title: '导流模块',
            field: 'nickname',
            search: true,
            type: 'select'
        }, {
            title: '预充值',
            field: 'nickname',
            search: true
        }, {
            title: '登录名',
            field: 'nickname',
            search: true
        }, {
            title: '初始登录密码',
            field: 'nickname',
            search: true
        }];
        return this.props.buildList({
            fields,
            rowKey: 'userId',
            pageCode: 805120
        });
    }
}

export default Subaccount;
