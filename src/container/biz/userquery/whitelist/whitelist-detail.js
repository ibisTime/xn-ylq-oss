import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class WhiteListDetail extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [ {
            title: '姓名',
            field: 'realName',
            formatter: (v, data) => {
                return data.businessMan.realName ? data.businessMan.realName : '';
            }
        }, {
            title: '登录账号',
            field: 'loginName'
        }, {
            title: '手机号',
            field: 'mobile'
        }, {
            title: '推荐人',
            field: 'businessMan',
            formatter: (v, data) => {
                return data.businessMan ? data.businessMan.mobile : '';
            }
        }, {
            title: '所属客户',
            field: 'keyword',
            formatter: (v, data) => {
                return data.businessMan ? data.businessMan.realName + '-' + data.businessMan.mobile : '';
            }
        }, {
            title: '注册时间',
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
            detailCode: 805121
        });
    }
}

export default WhiteListDetail;
