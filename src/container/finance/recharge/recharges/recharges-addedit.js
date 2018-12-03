import React from 'react';
import { Form } from 'antd';
import { getQueryString, getUserId, showSucMsg, dateTimeFormat } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@Form.create()
class RechargesAddEdit extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.check = !!getQueryString('check', this.props.location.search);
    this.status = getQueryString('status', this.props.location.search) || '';
  }
  checkOrder(payResult, params) {
    this.doFetching();
    params.payResult = payResult;
    params.codeList = [this.code];
    params.payUser = getUserId();
    fetch(802341, params).then(data => {
      this.cancelFetching();
      showSucMsg('操作成功');
      setTimeout(() => {
        this.props.history.go(-1);
      }, 1000);
    }).catch(this.cancelFetching);
  }
  render() {
    const fields = [{
      field: 'applyUser',
      value: getUserId(),
      hidden: true
    }, {
      field: 'accountNumber',
      title: '用户账户',
      required: true,
      type: 'select',
      pageCode: 802300,
      params: {
        status: '0',
        type: 'NOT_P'
      },
      dict: [
        ['type', 'account_type']
      ],
      keyName: 'accountNumber',
      valueName: '{{mobile.DATA}}-{{typeName.DATA}}',
      searchName: 'mobileForQuery'
    }, {
      title: '充值金额',
      field: 'amount',
      required: true,
      amount: true
    }, {
      field: 'applyNote',
      title: '充值说明',
      maxlength: 255
    }];
    let config = {
      fields,
      code: this.code,
      view: this.view,
      detailCode: 802346,
      addCode: 802340,
      beforeSubmit: (params) => {
        if (!this.code) {
          params.applyUserType = 'P';
        }
        return params;
      }
    };
    if (this.view) {
      if (!this.check) {
        fields.push({
          field: 'status',
          title: '状态',
          type: 'select',
          key: 'charge_status'
        });
      }
        fields.push({
            field: 'applyUserName',
            title: '申请人'
        }, {
            field: 'applyDatetime',
            title: '申请时间',
            type: 'datetime'
        }, {
            field: 'payUserName',
            title: '审核人',
            hidden: this.status !== '3'
        }, {
            field: 'payDatetime',
            title: '审核时间',
            type: 'datetime',
            hidden: this.status !== '3'
        }, {
            field: 'payNote',
            title: '审核意见',
            required: true,
            readonly: !this.check,
            hidden: this.status !== '3' && !this.check
        });
    }
    if (this.check) {
      config.buttons = [{
        title: '通过',
        check: true,
        type: 'primary',
        handler: (params) => {
          this.checkOrder(1, params);
        }
      }, {
        title: '不通过',
        check: true,
        type: 'primary',
        handler: (params) => {
          this.checkOrder(0, params);
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

export default RechargesAddEdit;
