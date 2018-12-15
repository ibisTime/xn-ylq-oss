import React from 'react';
import { Form } from 'antd';
import { getQueryString, moneyFormat } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class CustomerDetail extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('companyCode', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [
            {
                title: '编号',
                field: 'companyCode'
            }, {
                title: '登录名',
                field: 'loginName'
            }, {
                title: '姓名',
                field: 'realName'
            }, {
                title: '手机号',
                field: 'mobile'
            }, {
                title: '累计消费',
                field: 'outAmount',
                formatter: (v, data) => {
                    return data ? moneyFormat(data.outAmount) : '';
                }
            }, {
                title: '账户余额',
                field: 'amount',
                formatter: (v, data) => {
                    return data.account ? moneyFormat(data.account.amount) : '';
                }
            }, {
                title: '注册时间',
                field: 'createDatetime',
                type: 'datetime'
            }, {
                title: '借条模块',
                field: 'isJt',
                type: 'select',
            data: [{
                key: '1',
                value: '是'
            }, {
                key: '0',
                value: '否'
            }],
                keyName: 'key',
                valueName: 'value',
                required: true
            }, {
                title: '风控模块',
                field: 'isFk',
                type: 'select',
                data: [{
                    key: '1',
                    value: '是'
                }, {
                    key: '0',
                    value: '否'
                }],
                keyName: 'key',
                valueName: 'value'
            }, {
                title: '导流模块',
                field: 'isDl',
                type: 'select',
                data: [{
                    key: '1',
                    value: '是'
                }, {
                    key: '0',
                    value: '否'
                }],
                keyName: 'key',
                valueName: 'value'
            }, {
                title: '状态',
                field: 'status',
                type: 'select',
                key: 'user_status'
            }, {
                title: 'APP名',
                field: 'appName',
                formatter: (v, data) => {
                    return data.company ? data.company.name : '';
                }
            }, {
                title: 'Logo',
                field: 'logo',
                type: 'img',
                formatter: (v, data) => {
                    return data.company ? data.company.logo : '';
                }
            }, {
                title: '备注',
                field: 'remark'
            }];
        return this.buildDetail({
            fields,
            key: 'companyCode',
            code: this.code,
            view: this.view,
            detailCode: 630118
        });
    }
}

export default CustomerDetail;
