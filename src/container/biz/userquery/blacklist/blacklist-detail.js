import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
const typeDict = {
    'C': 'C端用户',
    'W': '渠道'
};
@Form.create()
class BlackListDetail extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [
            {
                title: '姓名',
                field: 'realName',
                search: true,
                formatter: (v, data) => {
                    return data.realName ? data.realName : '';
                }
            }, {
            title: '登录账号',
            field: 'loginName'
        }, {
            title: '手机号',
            field: 'mobile',
            search: true
        }, {
            title: '推荐人',
            field: 'userReferee',
            formatter: (v, d) => {
              if (d.refereeWay) {
                return `${d.refereeWay.name}-(${typeDict[d.refereeType]})`;
              }else if (d.refereeUser) {
                return d.refereeUser.realName ? `${d.refereeUser.realName}-${d.refereeUser.mobile}(${typeDict[d.refereeType]})` : `${d.refereeUser.mobile}-(${typeDict[d.refereeType]})`;
              }else {
                return '';
              }
            }
        }, {
            title: '所属客户',
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
export default BlackListDetail;
