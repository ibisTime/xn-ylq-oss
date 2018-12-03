import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class RoleAddEdit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [
            {
                title: '登录名',
                field: 'loginName',
                required: true
            }, {
            title: '姓名',
            field: 'realName',
            required: true
        }, {
            title: '手机号',
            field: 'mobile',
            mobile: true,
            required: true
            }, {
                title: '登录密码',
                field: 'loginPwd',
                type: 'password',
                required: true
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
            valueName: 'value',
            required: true
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
            valueName: 'value',
            required: true
        }, {
            title: '预充值',
            field: 'precharge',
             amount: true,
            required: true
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: 630100,
            editCode: 805025
        });
    }
}

export default RoleAddEdit;
