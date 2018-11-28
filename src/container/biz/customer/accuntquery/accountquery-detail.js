import React from 'react';
import { Form } from 'antd';
import { getQueryString, moneyFormat } from 'common/js/util';
import DetailUtil from 'common/js/NOild-detail';

@Form.create()
class CustomerAddEdit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '户名',
            field: 'accountNumber',
            search: true
        }, {
            title: '账户余额',
            field: 'amount',
            formatter: (v, data) => {
                return data ? moneyFormat(data.amount) : '';
            }
        }, {
            title: '冻结金额',
            field: 'frozenAmount',
            formatter: (v, data) => {
                return data.account ? moneyFormat(data.amount) : '';
            }
        }, {
            title: '创建时间',
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
        return this.buildDetail({
            fields,
            key: 'userId',
            code: this.code,
            view: this.view,
            detailCode: 802321,
            editCode: 805023
        });
    }
}

export default CustomerAddEdit;
