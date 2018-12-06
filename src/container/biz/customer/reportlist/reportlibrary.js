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
} from '@redux/biz/userquery/reportlibrary';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg } from 'common/js/util';
import { activateUser } from 'api/user';

@listWrapper(
    state => ({
        ...state.customerReportLibrary,
        parentCode: state.menu.subMenuCode
    }),
    { setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData }
)
class ReportLibrary extends React.Component {
    goBack = () => {
        this.props.history.go(-1);
    }
    render() {
        const fields = [{
            title: '报告编号',
            field: 'mobile'
        }, {
            title: '报告主人',
            field: 'loginName',
            search: true
        }, {
            title: '手机号',
            field: 'mobile',
            type: 'select'
        }, {
            title: '所属业务员',
            field: 'createDatetime',
            type: 'datetime',
            search: true
        }, {
            title: '类型',
            field: 'dateStart',
            type: 'datetime'
        }, {
            title: '报告规格',
            field: 'remark',
            search: true
        }, {
            title: '综合报告分',
            field: 'remark'
        }, {
            title: '完整度',
            field: 'remark'
        }, {
            title: '填写时间',
            field: 'createDatetime',
            type: 'datetime'
        }];
        return (
            <div>
         {
            this.props.buildList({
                fields,
                rowKey: 'userId',
                pageCode: 805120
            })
        }
        <div style={{width: '100%', marginTop: '15px', textAlign: 'center'}}>
            <Button onClick={() => this.goBack()} type="primary">返回</Button>
        </div>
            </div>
        );
    }
}

export default ReportLibrary;
