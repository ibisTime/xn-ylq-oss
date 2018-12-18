import React from 'react';
import { Form } from 'antd';
import { getQueryString, moneyFormat } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class FlowsAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
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
            type: 'datetime'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'jour_status'
        }, {
            title: '对应订单编号',
            field: 'refNo'
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 802321
        });
    }
}

export default FlowsAddedit;
