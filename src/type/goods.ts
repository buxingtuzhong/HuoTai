export interface ListInt{
    id:number
    introduce:string
    title:string
    userId:number 

}
//定义输入框接口
interface selectDataInt{
    title:string,
    introduce:string,
    page:number,//页码
    count:number//总条数
    pagesize:number
}
export class InitData{
    selectData:selectDataInt={
        title:"",
        introduce:"",
        page:1,//页码
        count:0,//总条数
        pagesize:5
    }
    //展示的内容数据
    list:ListInt[]=[]
}