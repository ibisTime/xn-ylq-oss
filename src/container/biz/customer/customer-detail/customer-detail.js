import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
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
            title: '账号',
            field: 'remark',
            maxlength: 250
        }, {
            title: '状态',
            field: 'code'
        }, {
            title: '创建时间',
            field: 'createDatetime',
            type: 'datetime'
        }, {
            title: '账户余额',
            field: 'code'
        }, {
            title: '冻结金额',
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
