
export interface ListInt{
    id:number
    nickName:string
    role:RoleInt[]
    userName:string
}

interface RoleInt{
    role:number
    roleName:string
}

interface selectDataInt{
    nickName:string
    role:number
}

interface ActiveInt{
    id:number
        nickName: string
        role:number[]
        userName:string
}
export interface RoleListInt{
    authority:number[]
    roleId:number
    roleName:string
}

export class InitData{
    selectData:selectDataInt={
        nickName:'',
        role:0
    }
    list:ListInt[]=[]//用来接收角色列表
    roleList:RoleListInt[]=[]//用来接收用户列表


    isShow=true
    active:ActiveInt={//选中的对象
        id:0,
        nickName: "",
        role:[],
        userName:""
    }
}




