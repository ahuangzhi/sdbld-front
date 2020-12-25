import request from '@/utils/request'
const prefix = "hzBasics/";

export function searchTableData (pageNum, pageSize,equipmentListType) {
  return request({
    url: prefix + 'searchTableData.json?pageSize=' + pageSize + '&pageNum=' + pageNum + '&equipmentListType=' + equipmentListType,
    method: 'get'
  })
}

export function deleteOperation (ids) {
  return request({
    url: prefix + 'deleteOperation.json?ids=' + ids,
    method: 'post'
  })
}

export function selectBasicsEq1uipmentList () {
  return request({
    url: prefix + 'selectBasicsEq1uipmentList.json',
    method: 'get'
  })
}

export function insertOperation (data) {
  return request({
    url: prefix + 'insertOperation.json?name='+data.name +'&timeSectional='+ data.timeSectional + '&electricityType=' + data.electricityType+
    '&price='+data.price + '&equipmentListType=' + data.insertSelectData.id,
    method: 'post'
  })
}

export function updateOperation (data) {
  return request({
    url: prefix + 'updateOperation.json?name='+data.name +'&timeSectional='+ data.timeSectional + '&price='+data.price + '&electricityType=' + data.electricityType+
    '&equipmentListType=' + data.insertSelectData.id +'&id='+data.id,
    method: 'post'
  })
}