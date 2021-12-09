import service from "./utils/request"

// 字符串请求
export function getTextResult(){
  return service.request({
    method: 'post',
    url: '/single',
  })
}