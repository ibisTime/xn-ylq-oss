import { getAccountsByUserId, getClientAccounts } from 'api/account';
import { SYS_USER } from 'common/js/config';

const PREFIX = 'PLATFORM_ACCOUNT_';
const SYS_ACOUNT_CNY = PREFIX + 'SYS_ACOUNT_CNY';
const LOADING = PREFIX + 'LOADING';
const CANCEL_LOADING = PREFIX + 'CANCEL_LOADING';

// ALIPAY、WEIXIN、OFFLINE、CNY、JF、TPP
const initState = {
  cnyAccount: {},
  fetching: true
};

export function platformAccount(state = initState, action) {
  switch(action.type) {
    case SYS_ACOUNT_CNY:
      return {...state, cnyAccount: action.payload};
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
function setAccount(data) {
  return { type: SYS_ACOUNT_CNY, payload: data };
}
// 初始化页面数据
export function initData() {
  return dispatch => {
    dispatch(doFetching());
    Promise.all([
      getAccountsByUserId(SYS_USER)
    ]).then(([accounts]) => {
      dispatch(cancelFetching());
      accounts.forEach(account => {
        if (account.accountNumber === 'SYS_ACOUNT_CNY') {
          dispatch(setAccount(account));
        }
      });
    }).catch(() => dispatch(cancelFetching()));
  };
}
