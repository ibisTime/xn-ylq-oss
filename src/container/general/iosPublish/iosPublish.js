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
} from '@redux/general/iospublish';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg, getUserId, moneyFormat, getQueryString } from 'common/js/util';

@listWrapper(
    state => ({
        ...state.generalIosPublish,
        parentCode: state.menu.subMenuCode
    }),
    { setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData }
)
class IosPublish extends React.Component {
  constructor(props) {
    super(props);
    this.companyCode = getQueryString('companyCode', this.props.location.search) || '';
    this.state = {
      ...this.state
    };
  }
  render() {
    const fields = [ {
      field: 'remark',
      title: '参数说明'
    },
      {
        title: '参数值',
        field: 'cvalue'
      }];
        return this.props.buildList({
          fields,
          rowKey: 'id',
          pageCode: '623915',
          searchParams: {
            companyCode: this.companyCode,
            type: 'ios-c'
          },
          buttons: [{
            code: 'edit',
            name: '修改',
            handler: (keys, items) => {
              if (!keys || !keys.length) {
                showWarnMsg('请选择记录');
              } else if (keys.length > 1) {
                showWarnMsg('请选择一条记录');
              } else{
                this.props.history.push(`/customer/customers/iosrodition/edit?code=${keys[0]}`);
              }
            }
          }, {
            name: '返回',
            code: 'back',
            handler: () => this.props.history.go(-1)
          }]
        });
  }
}

export default IosPublish;
