# Vue3.0 ElementPlus typescript

## Project setup
```
npm install
```
### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

#### 欢迎使用VUE3.0 + ElementPlus + typescript 后台管理模板
项目Github地址:https://github.com/flmbbb/OneEasyAdmin
国内项目Github地址:https://gitee.com/fan-lianman/OneEasyAdmin
UI库文档： https://element-plus.gitee.io/#/zh-CN
vue-element-admin 官方文档：https://panjiachen.github.io/vue-element-admin-site/zh/guide/
##### 在线预览地址：http://edu.callbaba.cn:8000/myweb/easyadmin/index.html
个人服务器，宽代小比较慢见谅
##### 平台简介
平台是个超简易的入手平台,vue-elm-admin
扩展的一大堆功能统统抛弃，越庞大对新手越不友好，连我这老鸟看着多头痛,从简单做起。然后要什么在从官方DEMOCOPY模块过来！值得你拥有
##### 平台特色
全用TS实现写的，有助于团队合作和维护;平台支持一个页面多开，例如列表打开明细，打开多个明细界面;
##### 认识平台
1.目录 baselib 自已封装的一些库，只开放一些常用的基本的
  1.1 HTTPClient.ts HTTP交互单元,做了封装，我自认为封装的还不错,当然还有很多细节还没考虑
  1.2 BaseApi.ts 与HTTP交互一些事例
2.目录 components 整体主界面布局
3.目录 evenBus 公共事件中心,菜单触发多在此控制
4.router 路由,没什么好说的，这些是搞VUE必备的知识！
    重点充分利用好路由【前置守卫】,可以很好达到界面权限控制,但本平台采用的是tablePanle当容器放component，
    基本没路由说法，只需要在打开菜单公共事件控件权限即可，如需要路由版的，后面我在开源个版。
5.store 存储,没什么好说的，这些是搞VUE必备的知识
    5.1 IMenuItem主要说下这个，菜单还有标题基类  
6.views 页面
    6.1 zComRegister.ts主界面控件展示的核心注册控件单元
    6.2 Home.vue 主界面 主要是布局的展示，以及页面当控件的展示区域
##### 入门学习，程序基本流程，代码不复杂具体的就自已看源码了
1.1 main.ts 加载
  引入一些公共的包及一些控制 axios拦截，全局变量注册 多放在此单元,当然你们也可以自已规化
1.2 App.vue 加载
1.3 跟据vueRouter 加载默认启动路由
1.4 加载Home主页

##### 重点类介绍
1.1 菜单和标题栏信息类
```
export interface IMenuItem {
    menuIndexName: string;  //索引值一般是唯一的，同个控件menuIndexName不同就可以多开
    menuComponent: string;  //挂载的组件
    menuTitle: string;  //标题
    menuIcon: string; //图标
    menuParams: any; //参数
    menuChildren: IMenuItem[]; //子菜单
}
```
例增加个页面写法如下
```
    let tempTag: IMenuItem = {
      menuIndexName: "TDashboard",
      menuComponent: "TDashboard",
      menuTitle: "主页",
      menuIcon: "el-icon-s-home",
      menuParams: {},
      menuChildren: [],
    };
    EvenBus.addTag(tempTag);
```
1.2 页面获取自已的IMenuItem信息,可以参考单元 About.vue
//重点继承 BaseForm ，可以参考BaseForm写法
```
export default class About extends BaseForm {
  private tagInfo: string = "";
  public created() {
    this.tagInfo = JSON.stringify(this.$props.indexTag);
  }
}
```
1.3 Home.vue单元 如何展示控件以及控件传参
```
<div class="content">
        <el-tabs id="homTable" v-model="FIndexName">
          <el-tab-pane
            v-for="item in tagsList"
            :key="item.menuIndexName"
            :name="item.menuIndexName"
            :label="item.menuTitle"
          >
            <component :is="item.menuComponent" :zIndexTag="item"></component>
          </el-tab-pane>
        </el-tabs>
      </div>
    
```
重点此句，把页面标签传到控件属性 indexTag,达到传参的目标
```
<component :is="item.menuComponent" :zIndexTag="item"></component>
```

1.4 页面控件注册单元 zComRegister.ts
  当然也可以自已写函数扩展自动加载比如以什么开头的vue文件

##### 赞助作者
![微信收款码](https://github.com/flmbbb/OneEasyAdmin/blob/main/src/assets/img/%E5%BE%AE%E4%BF%A1%E6%94%B6%E6%AC%BE%E7%A0%81.png)
![QQ群](https://github.com/flmbbb/OneEasyAdmin/blob/main/src/assets/img/QQ.png?raw=true)
##### 作者简介
姓名:范联满 联系QQ：378464060 交流QQ群:437551621
教育经历:爱玩，把青春多浪费了。读书是有用的，如果你读书只是为了玩，就是对自已的未来不负责，感觉就是在浪费青春，
人生经历:当过网管扫过地，进过工厂当小弟，人生坎坷，最终发粪图墙，最终独霸一方
会什么:
  1.入门语言学过delphi，用这货工作了六年了吧，自研一套自定义框架也是开源的
  2.Go语言 2021年初学的，同时学了flutter，自已按自已思路搭了套框架，自已爽.
  3.HTML JS 没研究多少，拿起来就用，用到什么不懂就百度 语言多是相通的。基本语法看下那可
  4.C# 2021年5月入手，搞了个框架。 FastAPI值得你拥有
  5.其它杂七杂八的语言多会点，没办法打工的多这样，要这会那会
总结：语言真的不重要，只是个工具，什么场景用什么工具。。
