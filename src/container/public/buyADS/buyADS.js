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
} from '@redux/general/iospublish';
import { listWrapper } from 'common/js/build-list';
import fetch from 'common/js/fetch';
import { showWarnMsg, showSucMsg, getUserId, moneyFormat } from 'common/js/util';

@listWrapper(
    state => ({
        ...state.generalIosPublish,
        parentCode: state.menu.subMenuCode
    }),
    { setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData }
)
class IosPublish extends React.Component {
    render() {
        const fields = [ {
            field: 'remark',
            title: '参数说明',
            render: (v, data) => {
                return data.remark;
            }
        },
            {
                title: '参数值',
                field: 'cvalue'
            }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '623915',
            searchParams: {
                type: 'QINIU'
            },
            // 系统参数修改
            edit: (keys, items) => {
                this.props.history.push(`/buyads/buyads/addedit/addedit?code=${keys[0]}`);
            }
        });
    }
}

export default IosPublish;
