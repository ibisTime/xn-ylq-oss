import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class BuyAdsAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.state = {
            ...this.state
        };
    }
    render() {
        const fields = [{
            field: 'remark',
            title: '说明',
            required: true,
            maxlength: 20,
            readonly: true
        }, {
                title: '内容',
                field: 'cvalue',
                type: 'textarea',
                required: true
            }];
        return this.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            view: this.view,
            detailCode: 623916,
            editCode: 623910,
            beforeSubmit: (data) => {
                data.remark = this.state.pageData.remark;
                return data;
            }
        });
    }
}

export default BuyAdsAddedit;
