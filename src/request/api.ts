import axios2 from "."

export interface loginData{
    username:string,
    password:string
}
//登录接口
 export function login(data:loginData){
    return axios2({
        url:'./login',
        method:"post",
        data
    })
}
// 商品列表接口

export function getGoodList(){
    return axios2({
        url:'/getGoodsList',
        method:'get'
    })
}

export function getUserList(){
    return axios2({
        url:'/getUserList',
        method:'get'
    })
}

export function getRoleList(){
    return axios2({
        url:'/getRoleList',
        method:'get'
    })
}

//获取权限列表接口
export function getAuthorityList(){
    return axios2({
        url:"/getAuthorityList",
        method:"get"
    })
}