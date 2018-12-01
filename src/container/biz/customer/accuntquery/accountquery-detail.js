import React from 'react';
import { Button } from 'antd';
import {
    initData,
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/biz/customer/accountquerydetail';
import fetch from 'common/js/fetch';
import { listWrapper } from 'common/js/build-list';
import {getQueryString, moneyFormat, dateTimeFormat} from 'common/js/util';
@listWrapper(
    state => ({
        ...state.accountQueryDetail,
        parentCode: state.menu.subMenuCode,
    }),
    { setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData }
)
class accountQuery extends React.Component {
    constructor(props) {
        super(props);
        this.userId = getQueryString('userId', this.props.location.search) || '';
        this.state = {
            userData: {
                realName: '',
                accountNumber: '',
                createDatetime: '',
                amount: '',
                frozenAmount: ''
            }
        };
    }
    componentDidMount() {
        // 直接请求
        this.props.doFetching();// loading显示
        Promise.all([
            fetch(802301, {
                userId: this.userId,
                type: 'B'
            })
        ]).then(([accountData]) => {
            this.setState({
                userData: accountData[0]
            });
            this.props.cancelFetching();// loading隐藏
        }).catch(this.props.cancelFetching);
    }
    goBack = () => {
        this.props.history.go(-1);
    }
    render() {
        const fields = [{
            title: '流水编号',
            field: 'code'
        }, {
            title: '业务类型',
            field: 'bizType',
            type: 'select',
            key: 'biz_type'
        }, {
            title: '变动金额',
            field: 'transAmountString',
            amount: true
        }, {
            title: '变动前金额',
            field: 'preAmountString',
            amount: true
        }, {
            title: '变动后金额',
            field: 'postAmountString',
            amount: true
        }, {
            title: '变动时间',
            field: 'createDatetime',
            type: 'date',
            rangedate: ['createDatetimeStart', 'createDatetimeEnd'],
            render: dateTimeFormat
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'jour_status'
        }, {
            title: '备注',
            field: 'remark'
        }];

        return (
            <div>
                <div style={{width: '100%', marginLeft: '30px'}}>
                    <label>所属用户：</label>
                    <span style={{marginLeft: '20px'}}>{this.state.userData.realName}</span>
                </div>

                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>账号：</label>
                    <span style={{marginLeft: '20px'}}>{this.state.userData.accountNumber}</span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>创建时间：</label>
                    <span style={{marginLeft: '20px'}}>{dateTimeFormat(this.state.userData.createDatetime)} </span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>账户余额：</label>
                    <span style={{marginLeft: '20px'}}>{moneyFormat(this.state.userData.amount)}</span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>冻结金额：</label>
                    <span style={{marginLeft: '20px'}}>{moneyFormat(this.state.userData.frozenAmount)}</span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>资金流水：</label>
                    {
                        this.props.buildList({
                            fields,
                            noSelect: true,
                            pageCode: 802320,
                            searchParams: {
                                userId: this.userId
                            },
                            buttons: []
                        })}
                    <div style={{width: '100%', marginTop: '15px', textAlign: 'center'}}>
                        <Button onClick={() => this.goBack()} type="primary">返回</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default accountQuery;
