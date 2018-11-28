import fetch from 'common/js/fetch';

/**
 * 获取数据字典列表
 * @param parentKey
 * @param bizType
 */

export function getDictList({ parentKey, companyCode, bizType = 623907 }) {
  if (getDictList[parentKey]) {
    return Promise.resolve(getDictList[parentKey]);
  }
  return fetch(bizType, {
    parentKey
  }).then(data => {
    getDictList[parentKey] = data;
    return data;
  });
}
/**
 * 根据ckey查询系统参数
 * @param key
 * @param bizType
 */
export function getSystormParam({ key, bizType = 630047 }) {
    if (getSystormParam[key]) {
        return Promise.resolve(getSystormParam[key]);
    }
    return fetch(bizType, {
        key
    }).then(data => {
        getSystormParam[key] = data;
        return data;
    });
}
