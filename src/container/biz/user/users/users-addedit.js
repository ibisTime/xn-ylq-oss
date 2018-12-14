import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
const typeDict = {
    'C': 'C端用户',
    'W': '渠道'
};
@Form.create()
class UsersAddEdit extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '手机号',
      field: 'mobile'
    }, {
        title: '推荐人',
        field: 'refereeWay',
        formatter: (v, d) => {
            if (d.refereeWay) {
                return `${d.refereeWay.name}(${typeDict[d.refereeType]})`;
            }
            return '';
        }
    }, {
      title: '昵称',
      field: 'nickname'
    }, {
      title: '状态',
      field: 'status',
      type: 'select',
      key: 'user_status'
    }, {
      title: '注册时间',
      field: 'createDatetime',
      type: 'datetime'
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

export default UsersAddEdit;
