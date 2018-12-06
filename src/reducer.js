import { combineReducers } from 'redux';

import { user } from './redux/user';
import { menu } from './redux/menu';
import { securityRole } from './redux/security/role';
import { securityMenu } from './redux/security/menu';
import { securitySysParam } from './redux/security/sysParam';
import { securityUser } from './redux/security/user';
import { securityDataDict } from './redux/security/dataDict';
/** ***** 财务管理start ***** **/
// 财务管理--平台账户
import { platformTppRules } from './redux/finance/platform/tppRules';
import { platformAccount } from './redux/finance/platform/account';
import { platformAccountFlows } from './redux/finance/platform/accountFlows';
import { platformAccountList } from './redux/finance/platform/accountList';
import { platformFlows } from './redux/finance/platform/flows';
// 财务管理--充值管理
import { rechargeRecharges } from './redux/finance/recharge/recharges';
import { rechargeRecords } from './redux/finance/recharge/records';
// 财务管理--取现管理
import { withdrawRules } from './redux/finance/withdraw/rules';
import { withdrawWithdraw } from './redux/finance/withdraw/withdraw';
import { withdrawRecords } from './redux/finance/withdraw/records';
// 业务管理--用户管理
import { userUsers } from './redux/biz/user/users';
import { userUserAccounts } from './redux/biz/user/user-accounts';
import { userAccounts } from './redux/biz/user/accounts';
import { userAccountFlows } from './redux/biz/user/account-flows';
import { userFlows } from './redux/biz/user/flows';
// 客户管理--客户管理
import { customerCustomers } from './redux/biz/customer/customers';
// 客户管理--客户管理-报告列表
import { customerReportLibrary } from './redux/biz/customer/reportlist/reportlibrary';
// 客户管理--客户查询
import { customerAccountQuery } from './redux/biz/customer/accountquery';
// 客户管理--客户查询--流水查询
import { accountQueryDetail } from './redux/biz/customer/accountquerydetail';
// 客户管理--开子账号
import { customerSubAccount } from './redux/biz/customer/subaccount';
// 客户管理--客户查询--详情
import { customerCustomersDetail } from './redux/biz/customer/customersdetail';
// 用户查询--用户库
import { userQueryUserBase } from './redux/biz/userquery/userbase';
// 用户查询--用户库--添加备注
import { userQueryAddEdit } from './redux/biz/userquery/userqueryAddedit';
// k客户管理-报告列表
import { userQueryReporyLibraryDetil } from './redux/biz/userquery/reportlibrarydetail';
// 用户查询--用户库-报告库
import { userQueryReporyLibrary } from './redux/biz/userquery/reportlibrary';
// 用户查询--白名单
import { userQueryWhiteList } from './redux/biz/userquery/whitelist';
// 用户查询--黑名单
import { userQueryBlackList } from './redux/biz/userquery/blacklist';
// 系统参数管理--七牛云图片管理
import { publicBuyAds } from './redux/public/buyADS';
import { publicBuyAdsAddEdit } from './redux/public/buyADS-addedit';
// 系统参数管理--安卓管理
import { generalAndPublish } from './redux/general/andpublish';
import { generalAndPublishAddEdit } from './redux/general/andpublish-addedit';
// 系统参数管理--苹果管理
import { generalIosPublish } from './redux/general/iospublish';
import { generalIosPublishAddEdit } from './redux/general/iospublish-addedit';
export default combineReducers({
  user,
  menu,
  securityRole,
  securityMenu,
  securityUser,
  securitySysParam,
  securityDataDict,
  platformTppRules,
  platformAccount,
  platformAccountFlows,
  platformAccountList,
  platformFlows,
  rechargeRecharges,
  rechargeRecords,
  withdrawRules,
  withdrawWithdraw,
  withdrawRecords,
  userUsers,
  userUserAccounts,
  userAccounts,
  userAccountFlows,
  userFlows,
    customerCustomers,
    customerAccountQuery,
    customerSubAccount,
    customerReportLibrary,
    userQueryUserBase,
    userQueryReporyLibrary,
    userQueryWhiteList,
    userQueryBlackList,
    userQueryAddEdit,
    publicBuyAds,
    publicBuyAdsAddEdit,
    generalAndPublish,
    generalAndPublishAddEdit,
    generalIosPublish,
    generalIosPublishAddEdit,
    accountQueryDetail,
    customerCustomersDetail,
    userQueryReporyLibraryDetil
});
