import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class TypesAddEdit extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.state = {
      ...this.state,
      isTop: false
    };
  }
  render() {
    const fields = [{
      title: '名称',
      field: 'name',
      required: true
    }, {
      title: '类型',
      field: 'type',
      value: '2',
      hidden: true
    }, {
      title: '上级编号',
      field: 'parentCode',
      type: 'select',
      listCode: '629007',
      params: {
        status: 1,
        level: 1,
        orderColumn: 'order_no',
        orderDir: 'asc',
        type: 2
      },
      keyName: 'code',
      valueName: 'name',
      onChange: (v) => {
        if (v && this.state.isTop) {
          this.setState({ isTop: false });
        } else if (!v && !this.state.isTop) {
          this.setState({ isTop: true });
        }
      },
      hidden: this.view
    }, {
      title: '上级编号',
      field: 'parentCode1',
      type: 'select',
      listCode: '629007',
      params: {
        status: 1,
        level: 1,
        orderColumn: 'order_no',
        orderDir: 'asc',
        type: 2
      },
      keyName: 'code',
      valueName: 'name',
      formatter: (v, d) => {
        return d.parentCode;
      },
      hidden: !this.view
    }, {
      title: '图片',
      field: 'pic',
      type: 'img',
      single: true,
      required: this.state.isTop
    }, {
      title: '次序',
      field: 'orderNo',
      help: '数字越小，排序越靠前',
      integer: true,
      required: true
    }, {
      title: '备注',
      field: 'remark',
      maxlength: 250
    }];
    return this.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 629006,
      addCode: 629000,
      editCode: 629001,
      beforeSubmit: (params) => {
        params.parentCode = params.parentCode || params.parentCode1;
        params.parentCode1 && delete params.parentCode1;
        return params;
      }
    });
  }
}

export default TypesAddEdit;
