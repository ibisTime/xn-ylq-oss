import React from 'react';
import { Form } from 'antd';
import { getQueryString, showSucMsg } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import fetch from 'common/js/fetch';

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
            value: '1',
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
        }, {
                title: 'APP名',
                field: 'appName',
                required: true
            }, {
                title: 'Logo',
                field: 'logo',
                type: 'img',
                single: true,
                required: true
            }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            buttons: [{
                title: '保存',
                type: 'primary',
                check: true,
                handler: (param) => {
                    this.doFetching();
                    fetch(630100, param).then(() => {
                        showSucMsg('操作成功');
                        this.cancelFetching();
                        setTimeout(() => {
                            this.props.form.setFieldsValue({
                                'loginName': '',
                                'realName': '',
                                'mobile': '',
                                'loginPwd': '',
                                'isJt': '',
                                'isFk': '',
                                'isDl': '',
                                'precharge': '',
                                'appName': '',
                                'logo': ''
                            });
                        }, 1000);
                    }).catch(this.cancelFetching);
                }
            }]

        });
    }
}

export default RoleAddEdit;
