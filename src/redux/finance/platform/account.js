import { getAccountsByUserId, getClientAccounts } from 'api/account';
import { SYS_USER } from 'common/js/config';

const PREFIX = 'PLATFORM_ACCOUNT_';
const SET_ALIPAY_ACCOUNT = PREFIX + 'SET_ALIPAY_ACCOUNT';
const SET_WX_ACCOUNT = PREFIX + 'SET_WX_ACCOUNT';
const SET_OFFLINE_ACCOUNT = PREFIX + 'SET_OFFLINE_ACCOUNT';
const SET_CNY_ACCOUNT = PREFIX + 'SET_CNY_ACCOUNT';
const SET_JF_ACCOUNT = PREFIX + 'SET_JF_ACCOUNT';
const SET_TPP_ACCOUNT = PREFIX + 'SET_TPP_ACCOUNT';
const SET_CCLIENT_ACCOUNT = PREFIX + 'SET_CCLIENT_ACCOUNT';
const SET_MCLIENT_ACCOUNT = PREFIX + 'SET_MCLIENT_ACCOUNT';
const SET_OCLIENT_ACCOUNT = PREFIX + 'SET_OCLIENT_ACCOUNT';
const SET_ACLIENT_ACCOUNT = PREFIX + 'SET_ACLIENT_ACCOUNT';
const SET_BCLIENT_ACCOUNT = PREFIX + 'SET_BCLIENT_ACCOUNT';
const LOADING = PREFIX + 'LOADING';
const CANCEL_LOADING = PREFIX + 'CANCEL_LOADING';

// ALIPAY、WEIXIN、OFFLINE、CNY、JF、TPP
const initState = {
  aliAccount: {},
  wxAccount: {},
  offAccount: {},
  cnyAccount: {},
  jfAccount: {},
  tppAccount: {},
  cClientAccount: {},
  mClientAccount: {},
  bClientAccount: {},
  oClientAccount: {},
  aClientAccount: {},
  fetching: true
};

export function platformAccount(state = initState, action) {
  switch(action.type) {
    case SET_ALIPAY_ACCOUNT:
      return {...state, aliAccount: action.payload};
    case SET_WX_ACCOUNT:
      return {...state, wxAccount: action.payload};
    case SET_OFFLINE_ACCOUNT:
      return {...state, offAccount: action.payload};
    case SET_CNY_ACCOUNT:
      return {...state, cnyAccount: action.payload};
    case SET_JF_ACCOUNT:
      return {...state, jfAccount: action.payload};
    case SET_TPP_ACCOUNT:
      return {...state, tppAccount: action.payload};
    case SET_CCLIENT_ACCOUNT:
      return {...state, cClientAccount: action.payload};
    case SET_MCLIENT_ACCOUNT:
      return {...state, mClientAccount: action.payload};
    case SET_OCLIENT_ACCOUNT:
      return {...state, oClientAccount: action.payload};
    case SET_ACLIENT_ACCOUNT:
      return {...state, aClientAccount: action.payload};
    case SET_BCLIENT_ACCOUNT:
      return {...state, bClientAccount: action.payload};
    case LOADING:
      return {...state, fetching: true};
    case CANCEL_LOADING:
      return {...state, fetching: false};
    default:
      return state;
  }
}

// 显示loading
function doFetching() {
  return { type: LOADING };
}

// 隐藏loading
function cancelFetching() {
  return { type: CANCEL_LOADING };
}
// 设置平台支付宝账户
function setAlipayAccount(data) {
  return { type: SET_ALIPAY_ACCOUNT, payload: data };
}
// 设置平台微信账户
function setWXAccount(data) {
  return { type: SET_WX_ACCOUNT, payload: data };
}
// 设置平台线下充值账户
function setOffAccount(data) {
  return { type: SET_OFFLINE_ACCOUNT, payload: data };
}
// 设置平台余额账户
function setCnyAccount(data) {
  return { type: SET_CNY_ACCOUNT, payload: data };
}
// 设置平台积分账户
function setJfAccount(data) {
  return { type: SET_JF_ACCOUNT, payload: data };
}
// 设置平台碳泡泡账户
function setTppAccount(data) {
  return { type: SET_TPP_ACCOUNT, payload: data };
}
// 设置用户总余额
function setCClientAccount(data) {
  return { type: SET_CCLIENT_ACCOUNT, payload: data };
}
// 设置养护方总余额
function setMClientAccount(data) {
  return { type: SET_MCLIENT_ACCOUNT, payload: data };
}
// 设置产权方总余额
function setOClientAccount(data) {
  return { type: SET_OCLIENT_ACCOUNT, payload: data };
}
// 设置分销商总余额
function setAClientAccount(data) {
  return { type: SET_ACLIENT_ACCOUNT, payload: data };
}
// 设置商家总余额
function setBClientAccount(data) {
  return { type: SET_BCLIENT_ACCOUNT, payload: data };
}
// 初始化页面数据
export function initData() {
  return dispatch => {
    dispatch(doFetching());
    Promise.all([
      getAccountsByUserId(SYS_USER),
      getClientAccounts()
    ]).then(([accounts, accounts1]) => {
      dispatch(cancelFetching());
      accounts.forEach(account => {
        if (account.accountNumber === 'SYS_ACOUNT_ALIPAY_TG') {
          dispatch(setAlipayAccount(account));
        } else if (account.accountNumber === 'SYS_ACOUNT_WEIXIN_TG') {
          dispatch(setWXAccount(account));
        } else if (account.accountNumber === 'SYS_ACOUNT_OFFLINE_TG') {
          dispatch(setOffAccount(account));
        } else if (account.accountNumber === 'SYS_ACOUNT_CNY') {
          dispatch(setCnyAccount(account));
        } else if (account.accountNumber === 'SYS_ACOUNT_JF_POOL') {
          dispatch(setJfAccount(account));
        } else if (account.accountNumber === 'SYS_ACOUNT_TPP') {
          dispatch(setTppAccount(account));
        }
      });
      accounts1.forEach(account => {
        // 用户总余额
        if (account.type === 'C' && account.currency === 'CNY') {
          dispatch(setCClientAccount(account));
          // 养护方总余额
        } else if (account.type === 'M' && account.currency === 'CNY') {
          dispatch(setMClientAccount(account));
          // 产权方总余额
        } else if (account.type === 'O' && account.currency === 'CNY') {
          dispatch(setOClientAccount(account));
          // 分销商总余额
        } else if (account.type === 'A' && account.currency === 'CNY') {
          dispatch(setAClientAccount(account));
        } else if (account.type === 'B' && account.currency === 'CNY') {
          dispatch(setBClientAccount(account));
        }
      });
    }).catch(() => dispatch(cancelFetching()));
  };
}
