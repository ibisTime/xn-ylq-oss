import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class SellerOrderAddEdit extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '订单编号',
      field: 'orderCode'
    }, {
      title: '产品名称',
      field: 'commodityName'
    }, {
      title: '规格名称',
      field: 'specsName'
    }, {
      title: '数量',
      field: 'quantity'
    }, {
      title: '订单金额',
      field: 'amount',
      amount: true
    }, {
      title: '实际支付金额',
      field: 'payAmount',
      amount: true
    }, {
      title: '抵扣的人民币',
      field: 'cnyDeductAmount',
      amount: true
    }, {
      title: '使用积分数量',
      field: 'jfDeductAmount',
      amount: true
    }, {
      title: '订单状态',
      field: 'status',
      type: 'select',
      key: 'commodity_order_detail_status'
    }, {
      title: '地址信息',
      field: 'province',
      formatter: (v, d) => d.address && `${d.address.province} ${d.address.city} ${d.address.district} ${d.address.detailAddress}`
    }, {
      title: '收货人',
      field: 'addressee',
      _keys: ['address', 'addressee']
    }, {
      title: '收货人手机号',
      field: 'mobile',
      _keys: ['address', 'mobile']
    }, {
      title: '物流公司',
      field: 'logisticsCompany',
      type: 'select',
      key: 'logistics_company'
    }, {
      title: '物流单号',
      field: 'logisticsNumber'
    }];
    let config = {
      fields,
      code: this.code,
      view: true,
      detailCode: 629736
    };
    if (this.fahuo) {
      config.buttons = [{
        title: '发货',
        check: true,
        type: 'primary',
        handler: (params) => {
          this.checkOrder(1, params);
        }
      }, {
        title: '返回',
        handler: (params) => {
          this.props.history.go(-1);
        }
      }];
    }
    return this.buildDetail(config);
  }
}

export default SellerOrderAddEdit;
