import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class MenuAddEdit extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '父菜单编号',
      field: 'parentCode',
      required: true,
      type: 'select',
      listCode: '805001',
      params: { type: 1 },
      keyName: 'code',
      valueName: '{{code.DATA}} {{name.DATA}}'
    }, {
      title: '菜单名称',
      field: 'name',
      required: true,
      maxlength: 32
    }, {
      title: '菜单地址',
      field: 'url',
      required: true,
      maxlength: 64
    }, {
      title: '类型',
      field: 'type',
      required: true,
      type: 'select',
      data: [{
        dkey: '1',
        dvalue: '菜单'
      }, {
        dkey: '2',
        dvalue: '按钮'
      }],
      keyName: 'dkey',
      valueName: 'dvalue'
    }, {
      title: '菜单顺序号',
      field: 'orderNo',
      help: '数字越小，排序越靠前',
      required: true,
      integer: true
    }, {
      title: '备注',
      field: 'remark',
      maxlength: 250
    }];
    return this.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 805002,
      addCode: 805003,
      editCode: 805005
    });
  }
}

export default MenuAddEdit;
