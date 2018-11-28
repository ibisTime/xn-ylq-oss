import fetch from 'common/js/fetch';
import { getUserName, getUserId, judgeStatus, getKindByUrl } from 'common/js/util';
import { PIC_PREFIX } from 'common/js/config';

export function setRoleMenus(menuCodeList, roleCode) {
  return fetch(805027, {
    menuCodeList,
    roleCode,
    updater: getUserId()
  });
}
// 注销激活平台用户
export function activateSysUser(userId) {
  return fetch(630056, { userId, updater: getUserId() });
}
// 注销激活普通用户
export function activateUser(userId) {
  return fetch(805084, { userId, updater: getUserId() });
}
// 注销借款商用户
export function activateJUser(userId) {
    return fetch(630106, { userId, updater: getUserId() });
}
// 获取白名单
export function addwhite(userId) {
    return fetch(805151, { userId, updater: getUserId() });
}
// 获取黑名单

export function addblack(userId) {
    return fetch(805150, { userId, updater: getUserId() });
}
// 获取用户详情
export function getUser() {
  return getUserById(getUserId());
}

// 获取用户详情
export function getUserById(userId) {
  return fetch(805121, { userId });
}

// 为用户设置岗位
export function setUserPost(params) {
  return fetch(630058, {
    ...params,
    updater: getUserId()
  });
}
// 列表查询平台用户
export function getSysUsers() {
  return fetch(630066, { status: '0' });
}

// 判断养护方、产权方用户是否审核通过
export function isFullUser() {
  let bizCode = getKindByUrl() === 'A' ? 730086 : 630067;
  return fetch(bizCode, { userId: getUserId() }).then(data => {
    let url = judgeStatus(data.status);
    return { url, user: data };
  });
}
