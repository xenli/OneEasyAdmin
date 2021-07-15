import { createStore } from 'vuex'

export interface IMenuItem {
    menuIndexName: string;  //索引值一般是唯一的，同个控件menuIndexName不同就可以多开
    menuComponent: string;  //挂载的组件
    menuTitle: string;  //标题
    menuIcon: string; //图标
    menuParams: any; //参数
    menuChildren: IMenuItem[]; //子菜单
}
export const defaultTag: IMenuItem = {
    menuIndexName: "-1", //索引值一般是唯一的
    menuComponent: '',  //挂载的组件
    menuTitle: '',  //标题
    menuIcon: '',//图标
    menuParams: {},//参数
    menuChildren: []
};
//菜单
export const defaultMenu: IMenuItem[] = [
    {
        menuIndexName: "TDashboard",
        menuComponent: "TDashboard",
        menuTitle: "主页",
        menuIcon: "el-icon-s-home",
        menuParams: {},
        menuChildren: [],
    },
    {
        menuIndexName: "TDashboard2",
        menuComponent: "TDashboard",
        menuTitle: "主页2-多开测试",
        menuIcon: "el-icon-s-home",
        menuParams: {},
        menuChildren: [],
    },
    {
        menuIndexName: "TAbout",
        menuComponent: "TAbout",
        menuTitle: "关于",
        menuIcon: "el-icon-s-home",
        menuParams: { "参数1": "值1" },
        menuChildren: [],
    },
];


export class TMenuList {
    itemTags: IMenuItem[] = [];
}
export default createStore({
    state: {
        tagsList: new TMenuList(),
        menuList: defaultMenu,
        indexTag: defaultTag,
        collapse: false,
    },
    mutations: {
        hadndleCollapse(state, data) {
            state.collapse = data;
        }
    },
    actions: {},
    modules: {}
})