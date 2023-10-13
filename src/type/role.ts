export interface ListInt {
  authority: number[];
  roleId: number;
  roleName: string;
}
// export interface nameInt {
//   rolename: string;
// }
export class InitData {
  list: ListInt[] = [];
  openlist = false;
  rolename = "";
}
