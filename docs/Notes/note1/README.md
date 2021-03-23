## 随手记
> 2021-3-10 17:23:11 
<br>分类专栏：vue css js 


**常见报错Error**	
1. ![在这里插入图片描述](https://img-blog.csdnimg.cn/20210323110231903.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ2MzYzNzkw,size_16,color_FFFFFF,t_70#pic_center)
2. 没有log
```bash
log.js?1afd:24 [HMR] Waiting for update signal from WDS...
main.js?56d7:131
```
解决：在babel.config.js  注释掉plugins.push("transform-remove-console")

**vuex**
组件不允许直接变更属于 store 实例的 state，而应执行 action 来分发 (dispatch) 事件通知 store 去改变
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210323110345516.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ2MzYzNzkw,size_16,color_FFFFFF,t_70#pic_center)

**Git**

拉取远程分支 git pull origin publish-test
切换分支 git checkout dev-zhangjingjing

基于test分支来建立分支dev-zhangjingjing
1. 将test分支clone到本地
2. 在test分支下执行 git checkout -b dev-zhangjingjing
3. 切换到dev-zhangjingjing分支进行开发 

**CSS**
Height设置100%没用 ：设置 body,html{    height: 100%;    }


**NVM**： 切换node版本
nvm ls   查看现有node版本
nvm install v10.1.0  安装node对应版本
nvm use node v10.1.0  切换node版本为当前版本
报错：zsh: command not found: nvm   解决： source ~/.bash_profile


**Sass Scss区别**
scss是sass的一个升级版本，完全兼容sass之前的功能，又有了些新增能力。语法形式上有些许不同，最主要的就是sass是靠缩进表示嵌套关系，scss是花括号


**面包屑**
 面包屑导航  百度知道>电脑/网络>互联网

      最右端的地址为当前浏览页，最左端的为起始页面，这种结构使得用户对于所访问页的层次结构一目了然。面包屑导航不仅可改善网站的实用性，同时亦可提高网站对搜索引擎的友好性。访客使用面包屑导航可以快速返回上层目录，查看其它需要的内容。在许多关于网站用户使用体验的调查报告中也得出，如果超过3次点击，访客还没有找到需要的信息，那么有大约80%的访客会离开网站。这一点对搜索引擎来说也不例外。提供良好的返回导航连接可帮助搜索引擎更好地检索整个网站。而且，“面包屑型”导航连接中的锚文本还可以增进链接页的权重。

 **组件传值**：
父到子：  子组件中props   父组件通过v-bind为子组件的prop设置函数 
**Vue组件懒加载**
component: resolve => require(['@/view/index.vue'], resolve) 与component: index区别
require: 运行时调用，理论上可以运用在代码的任何地方，
import：编译时调用，必须放在文件开头
懒加载：component: resolve => require(['@/view/index.vue'], resolve)
用require这种方式引入的时候，会将你的component分别打包成不同的js，加载的时候也是按需加载，只用访问这个路由网址时才会加载这个js
非懒加载：component: index
如果用import引入的话，当项目打包时路由里的所有component都会打包在一个js中，造成进入首页时，需要加载的内容过多，时间相对比较长
vue的路由配置文件(routers.js)，一般使用import引入的写法，当项目打包时路由里的所有component都会打包在一个js中，在项目刚进入首页的时候，就会加载所有的组件，所以导致首页加载较慢，
而用require会将component分别打包成不同的js，按需加载，访问此路由时才会加载这个js，所以就避免进入首页时加载内容过多。

**Vue动态组件**
https://cn.vuejs.org/v2/guide/components-dynamic-async.html
一个多标签的界面中使用 is attribute 来切换不同的组件
```bash
<component v-bind:is="currentTabComponent"></component>
```
当在这些组件之间切换的时候，你有时会想保持这些组件的状态，以避免反复重渲染导致的性能问题。   使用keep-alive失活的组件将会被缓存

```bash
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```

**Vue组件中name的作用**
https://www.jb51.net/article/140702.htm
name非必选项
用处：
1. 项目使用keep-alive时，可搭配组件name进行缓存过滤
2. DOM做递归组件时
3. vue-devtools调试工具里显示的组见名称是由vue中组件name决定的 
4. 

**SDK与API**

参考博客[https://www.zhihu.com/question/21691705](https://www.zhihu.com/question/21691705)


**Vue内置组件 keep-alive**

在设置keep-alive缓存的组件中，首次进入组件，会一次调用组件的钩子函数：created --> mounted -->activated 再次进入时，只触发activated钩子函数

**其他：**
1. Vue filter 过滤器
2. Html标签内小于大于号用&lt;&gt;替换
3. 不设置a标签跳转链接（创建元素） 
封装函数 在需要跳转时调用

```javascript
const ele = document.createElement("a");
      document.body.appendChild(ele);
      ele.href = `${url.hemaOrigin}`;
      ele.target = "_blank";
      ele.click();
      document.body.removeChild(ele);
```
**模块内容迁移总结**
1. js文件中抛出的函数 引入时需使用解构  {   }
2. 路径一般后面加/
3. qiankun处理子应用间传参 主应用中定义传参格式
4. element-ui最好按需引入 否则容易造成包体过大 打包失败
5. 
前端项目越来越大，最近在执行serve和build命令时出现了

```bash
CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory
```

错误。这是因为在webapck打包过程中占用的内存堆栈超出了node.js中采用的V8引擎对内存的限制导致的。V8引擎对内存的使用的默认大小限制是1.4G，可以通过node.js命令设置限制来解决这个问题。具体如下。

```bash
"serve": "npx --max_old_space_size=6144 vue-cli-service serve",

"build": "npx --max_old_space_size=6144 vue-cli-service build --modern"
```


注意：数字的大小不是固定的，可以按照电脑内存的大小以及项目编译时需要的大小来设置