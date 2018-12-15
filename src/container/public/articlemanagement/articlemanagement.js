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
} from '@redux/public/articlemanagement';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg, getUserId, moneyFormat } from 'common/js/util';

@listWrapper(
    state => ({
        ...state.publicArticeManagement,
        parentCode: state.menu.subMenuCode
    }),
    { setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData }
)
class IosPublish extends React.Component {
    render() {
        const fields = [ {
            field: 'remark',
            title: '说明',
            render: (v, data) => {
                return data[0] ? data[0] : '';
            }
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '623915',
            searchParams: {
                type: 'richText'
            }
        });
    }
}

export default IosPublish;
