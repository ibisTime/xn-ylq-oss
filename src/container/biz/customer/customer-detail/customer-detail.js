import React from 'react';
import { Form } from 'antd';
import { getQueryString, moneyFormat } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class CustomerAddEdit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'kind',
            value: 1,
            hidden: true
        }, {
            title: '所属用户',
            field: 'remark',
            maxlength: 250
        }, {
            title: '账号',
            field: 'loginName'
        }, {
           title: '状态',
            field: 'status',
            type: 'select',
            key: 'user_status'
        }, {
            title: '创建时间',
            field: 'createDatetime',
            type: 'datetime'
        }, {
            title: '账户余额',
            field: 'amount',
            formatter: (v, data) => {
                return data.account ? moneyFormat(data.account.amount) : '';
            }
        }, {
            title: '冻结金额',
            field: 'frozenAmount',
            formatter: (v, data) => {
                return data.account ? moneyFormat(data.account.amount) : '';
            }
        }, {
            title: '资金流水',
            field: 'code'
        }];
        return this.buildDetail({
            fields,
            key: 'userId',
            code: this.code,
            view: this.view,
            detailCode: 630117
        });
    }
}

export default CustomerAddEdit;
