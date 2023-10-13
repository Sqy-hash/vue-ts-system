export interface ListInt{
    userId:number,
    id:number,
    title:string,
    introduce:string
}
interface selectDataInt {
    title:string,
    introduce:string,
    page:number,
    count:number,
    pagesize:number
}
// 定义一个类
export class InitData{
    selectData:selectDataInt = {
        title:"",
        introduce:"",
        page:1,
        count:0,
        pagesize:7
    }
      list:ListInt[]=[]//展示的内容的数据,接受后台返回的数据
}