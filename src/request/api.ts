import service from ".";
interface loginData {
  username: string;
  password: string;
}
// 登录接口
export function login(data: loginData) {
  return service({
    url: "/login",
    method: "post",
    data,
  });
}
//获取商品列表
export function goods() {
  return service({
    url: "/getGoodsList",
    method: "get",
  });
}
//获取用户列表
export function getuserlist() {
  return service({
    url: "/getUserList",
    method: "get",
  });
}
// 角色列表接口
export function getRolelist() {
  return service({
    url: "/getRoleList",
    method: "get",
  });
}
//获取权限列表
export function getAuthorityList() {
  return service({
    url: "/getAuthorityList",
    method: "get",
  });
}
