import React from 'react';
import { Modal } from 'antd';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/biz/seller/seller';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, moneyFormat } from 'common/js/util';
import { activateSysUser } from 'api/user';

@listWrapper(
  state => ({
    ...state.sellerSeller,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class Seller extends React.Component {
  rockOrActive(status, code) {
    Modal.confirm({
      okText: '确认',
      cancelText: '取消',
      content: `确认${status === '2' ? '注销' : '激活'}用户？`,
      onOk: () => {
        this.props.doFetching();
        return activateSysUser(code).then(() => {
          this.props.getPageData();
          showWarnMsg('操作成功');
        }).catch(() => {
          this.props.cancelFetching();
        });
      }
    });
  }
  render() {
    const fields = [{
      title: '手机号',
      field: 'mobile'
    }, {
      title: '状态',
      field: 'status',
      type: 'select',
      key: 'sys_user_status',
      search: true
    }, {
      title: '注册时间',
      field: 'createDatetime',
      type: 'datetime'
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this.props.buildList({
      fields,
      rowKey: 'userId',
      pageCode: '630065',
      searchParams: {
        kind: 'B'
      },
      btnEvent: {
        // 审核
        check: (keys, items) => {
          if (!keys || !keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (items[0].status !== '0') {
            showWarnMsg('该用户不是待审核状态');
          } else {
            this.props.history.push(`/property/property/addedit?code=${keys[0]}&v=1&check=1`);
          }
        },
        // 注销
        rock: (keys, items) => {
          if (!keys || !keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (items[0].status !== '2') {
            showWarnMsg('该用户无法注销');
          } else {
            this.rockOrActive(items[0].status, keys[0]);
          }
        },
        // 账户查询
        account: (keys, items) => {
          if (!keys || !keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/property/property/accounts?code=${keys[0]}`);
          }
        }
      }
    });
  }
}

export default Seller;
