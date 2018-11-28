import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class GradationRulesAddEdit extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      field: 'remark',
      hidden: true
    }, {
      field: 'remark1',
      title: '备注',
      _keys: ['remark'],
      readonly: true
    }, {
      title: '比例(%)',
      field: 'cvalue',
      formatter: (v) => (v * 100).toFixed(2)
    }, {
      title: '最近修改时间',
      field: 'updateDatetime',
      type: 'datetime',
      readonly: true
    }];
    return this.buildDetail({
      fields,
      key: 'id',
      code: this.code,
      view: this.view,
      detailCode: '630046',
      editCode: '630042',
      beforeSubmit: (params) => {
        params.cvalue = (params.cvalue / 100).toFixed(2);
        return params;
      }
    });
  }
}

export default GradationRulesAddEdit;
