import asyncComponent from './component/async-component/async-component';

const ROUTES = [
  {
    path: '/system/role', component: asyncComponent(() => import('container/security/role/role'))
  },
  {
    path: '/system/role/addedit', component: asyncComponent(() => import('container/security/role-addedit/role-addedit'))
  },
  {
    path: '/system/role/menu', component: asyncComponent(() => import('container/security/role-menu/role-menu'))
  },
  {
    path: '/system/menu', component: asyncComponent(() => import('container/security/menu/menu'))
  },
  {
    path: '/system/menu/addedit', component: asyncComponent(() => import('container/security/menu-addedit/menu-addedit'))
  },
  {
    path: '/system/user', component: asyncComponent(() => import('container/security/user/user'))
  },
  {
    path: '/system/user/role', component: asyncComponent(() => import('container/security/user/assign'))
  },
  {
    path: '/system/user/pwd_reset', component: asyncComponent(() => import('container/security/user/pwdReset'))
  },
  //  系统参数
  {
    path: '/system/sysPara', component: asyncComponent(() => import('container/security/sysParam/sysParam'))
  },
  //  系统参数修改
  {
    path: '/system/sysPara/addedit', component: asyncComponent(() => import('container/security/sysParam-addedit/sysParam-addedit'))
  },
  {
    path: '/system/dataDict', component: asyncComponent(() => import('container/security/dataDict/dataDict'))
  },
  {
    path: '/system/dataDict/addedit', component: asyncComponent(() => import('container/security/dataDict-addedit/dataDict-addedit'))
  },
  {
    path: '/system/user/addedit', component: asyncComponent(() => import('container/security/user-addedit/user-addedit'))
  },
  {
    path: '/platform/memberLevel/addedit', component: asyncComponent(() => import('container/security/sysParam-addedit/sysParam-addedit'))
  },
  // 财务管理 -- 平台账户 -- 积分规则 -- 详情
  {
    path: '/platform/integralRules/addedit', component: asyncComponent(() => import('container/security/sysParam-addedit/sysParam-addedit'))
  },
  {
    path: '/platform/payRules/addedit', component: asyncComponent(() => import('container/security/sysParam-addedit/sysParam-addedit'))
  },
  // 财务管理 -- 平台账户 -- 账户查询
  {
    path: '/platform/account', component: asyncComponent(() => import('container/finance/platform/account/account'))
  },
  // 财务管理 -- 平台账户 -- 账户查询 -- 流水查询
  {
    path: '/platform/account/flows', component: asyncComponent(() => import('container/finance/platform/account/account-flows'))
  },
    // 财务管理 -- 平台账户 -- 账户查询 -- 提现回录
    {
        path: '/platform/account/enter', component: asyncComponent(() => import('container/finance/platform/account/account-enter'))
    },
  // 财务管理 -- 平台账户 -- 账户查询 -- 资金分布
  {
    path: '/platform/account/accounts', component: asyncComponent(() => import('container/finance/platform/account/account-list'))
  },
  // 财务管理 -- 平台账户 -- 流水查询
  {
    path: '/platform/flows', component: asyncComponent(() => import('container/finance/platform/flows/flows'))
  },
    // 财务管理 -- 平台账户 -- 流水查询--流水详情
    {
        path: '/platform/flows/addedit', component: asyncComponent(() => import('container/finance/platform/flows/flow-detail'))
    },
  // 财务管理 -- 充值管理 -- 线下充值
  {
    path: '/recharge/recharges', component: asyncComponent(() => import('container/finance/recharge/recharges/recharges'))
  },
  // 财务管理 -- 充值管理 -- 线下充值 -- 详情
  {
    path: '/recharge/recharges/addedit', component: asyncComponent(() => import('container/finance/recharge/recharges/recharges-addedit'))
  },
  // 财务管理 -- 充值管理 -- 充值查询
  {
    path: '/recharge/records', component: asyncComponent(() => import('container/finance/recharge/records/records'))
  },
  // 财务管理 -- 充值管理 -- 充值查询 -- 详情
  {
    path: '/recharge/records/addedit', component: asyncComponent(() => import('container/finance/recharge/recharges/recharges-addedit'))
  },
  // 财务管理 -- 取现管理 -- 取现规则
  {
    path: '/withdraw/rules', component: asyncComponent(() => import('container/finance/withdraw/rules/rules'))
  },
  // 财务管理 -- 取现管理 -- 取现规则 -- 详情
  {
    path: '/withdraw/rules/addedit', component: asyncComponent(() => import('container/security/sysParam-addedit/sysParam-addedit'))
  },
  // 财务管理 -- 取现管理 -- 线下取现
  {
    path: '/withdraw/withdraw', component: asyncComponent(() => import('container/finance/withdraw/withdraw/withdraw'))
  },
  // 财务管理 -- 取现管理 -- 线下取现 -- 详情
  {
    path: '/withdraw/withdraw/addedit', component: asyncComponent(() => import('container/finance/withdraw/withdraw/withdraw-addedit'))
  },
  // 财务管理 -- 取现管理 -- 线下取现
  {
    path: '/withdraw/records',
    component: asyncComponent(() => import('container/finance/withdraw/records/records'))
  },
  // 财务管理 -- 取现管理 -- 线下取现
  {
    path: '/withdraw/records/addedit', component: asyncComponent(() => import('container/finance/withdraw/withdraw/withdraw-addedit'))
  },
  // 业务管理 -- 用户管理 -- 会员查询
  {
    path: '/user/users', component: asyncComponent(() => import('container/biz/user/users/users'))
  },
  // 业务管理 -- 用户管理 -- 会员查询 -- 详情
  {
    path: '/user/users/addedit', component: asyncComponent(() => import('container/biz/user/users/users-addedit'))
  },
  // 业务管理 -- 用户管理 -- 会员查询 -- 账户查询
  {
    path: '/user/users/accounts', component: asyncComponent(() => import('container/biz/user/user-accounts/user-accounts'))
  },
  // 业务管理 -- 用户管理 -- 账户查询
  {
    path: '/user/accounts', component: asyncComponent(() => import('container/biz/user/accounts/accounts'))
  },
  // 业务管理 -- 用户管理 -- 账户查询 -- 流水查询
  {
    path: '/user/accounts/flows', component: asyncComponent(() => import('container/biz/user/accounts/account-flows'))
  },
  // 业务管理 -- 用户管理 -- 账户查询 -- 流水查询 -- 详情
  {
    path: '/user/accounts/flows/addedit', component: asyncComponent(() => import('container/finance/flows-addedit/flows-addedit'))
  },
  // 业务管理 -- 用户管理 -- 流水查询
  {
    path: '/user/flows', component: asyncComponent(() => import('container/biz/user/flows/flows'))
  },
  // 业务管理 -- 用户管理 -- 流水查询 -- 详情
  {
    path: '/user/flows/addedit', component: asyncComponent(() => import('container/finance/flows-addedit/flows-addedit'))
  },
    // 业务管理--客户管理--客户管理
    {
        path: '/customer/customers', component: asyncComponent(() => import('container/biz/customer/customers/customers'))
    },
    // 业务管理--客户管理--报告列表
    {
        path: '/customer/customers/reportlist', component: asyncComponent(() => import('container/biz/customer/reportlist/reportlist'))
    },
    // 客户管理-新增备注
    {
        path: '/customer/customers/addedit', component: asyncComponent(() => import('container/biz/customer/customer-addedit/customer-addedit'))
    }, // 客户管理-账户余额
    {
        path: '/customer/customers/amount', component: asyncComponent(() => import('container/biz/customer/accuntquery/accountquery-detail'))
    },
    // 业务管理--客户管理--开子账号
    {
        path: '/customer/subaccount', component: asyncComponent(() => import('container/biz/customer/subaccount/subaccount'))
    },
    // 业务管理--客户管理--账户查询
    {
        path: '/customer/accountquery', component: asyncComponent(() => import('container/biz/customer/accuntquery/accountquery'))
    },
    // 业务管理--客户管理--详情
    {
        path: '/customer/customers/detail', component: asyncComponent(() => import('container/biz/customer/customers/customer-detail'))
    },
    // 业务管理--客户管理--账户查询-流水查询
    {
        path: '/customer/accountquery/detail', component: asyncComponent(() => import('container/biz/customer/accuntquery/accountquery-detail'))
    },
    // 业务管理--用户查询--用户库
    {
        path: '/userquery/userbase', component: asyncComponent(() => import('container/biz/userquery/userbase/userbases/userbase'))
    },
    // 业务管理--用户查询--用户库--添加备注
    {
        path: '/userquery/userqueryaddedit', component: asyncComponent(() => import('container/biz/userquery/userquery-addedit/userquery-addedit'))
    },
    // 业务管理--用户查询--用户库--报告列表
    {
        path: '/userquery/userbases/reportlist', component: asyncComponent(() => import('container/biz/userquery/userbase/reportlist/reportlist'))
    },
    // 业务管理--用户查询--用户库--最新报告
    {
        path: '/userquery/newreport', component: asyncComponent(() => import('container/biz/userquery/userbase/newreport/newreport'))
    },
    // 业务管理--用户查询--报告库
    {
        path: '/userquery/reportlibrary', component: asyncComponent(() => import('container/biz/userquery/reportlibrary/reportlibrary'))
    },
    // 业务管理--用户查询--白名单
    {
        path: '/userquery/whitelist', component: asyncComponent(() => import('container/biz/userquery/whitelist/whitelist'))
    },
    // 业务管理--用户查询--白名单--详情
    {
        path: '/userquery/whitelist/detail', component: asyncComponent(() => import('container/biz/userquery/whitelist/whitelist-detail'))
    },
    // 业务管理--用户查询--白名单--报告列表
    {
        path: '/userquery/whitelist/reportlist', component: asyncComponent(() => import('container/biz/userquery/userbase/reportlist/reportlist'))
    },
    // 业务管理--用户查询--黑名单
    {
        path: '/userquery/blacklist', component: asyncComponent(() => import('container/biz/userquery/blacklist/blacklist'))
    },
    // 业务管理--用户查询--黑名单--详情
    {
        path: '/userquery/blacklist/detail', component: asyncComponent(() => import('container/biz/userquery/blacklist/blacklist-detail'))
    },
    // 业务管理--用户查询--黑名单--报告列表
    {
        path: '/userquery/blacklist/reportlist', component: asyncComponent(() => import('container/biz/userquery/userbase/reportlist/reportlist'))
    },
    // 业务管理--系统参数管理--七牛图片参数
    {
        path: '/buyads/buyads', component: asyncComponent(() => import('container/public/buyADS/buyADS'))
    },
    // 业务管理--系统参数管理--七牛图片参数--修改
    {
        path: '/buyads/buyads/addedit', component: asyncComponent(() => import('container/public/buyADS/buyADS-addedit'))
    },
    // 业务管理--系统参数管理--认证接口费用管理
    {
        path: '/general/andmanagement', component: asyncComponent(() => import('container/general/andmanagement'))
    },
    // 业务管理--系统参数管理--认证接口费用管理--修改
    {
        path: '/general/andmanagement/addedit', component: asyncComponent(() => import('container/general/andmanagement-addedit'))
    },
    // 业务管理--系统参数管理--文章管理
    {
        path: '/general/articlemanagement', component: asyncComponent(() => import('container/public/articlemanagement/articlemanagement'))
    },
    // 业务管理--系统参数管理--文章管理-修改
    {
        path: '/general/articlemanagement/addedit', component: asyncComponent(() => import('container/public/articlemanagement/articlemanagement-addedit'))
    }
];

export default ROUTES;
