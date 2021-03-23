## 项目--看板外化
> 2021-3-20 15:13:32 
<br>分类专栏：vue antd vue 

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210323105632616.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ2MzYzNzkw,size_16,color_FFFFFF,t_70#pic_center)
在这里看操作效果哦~[演示视频地址](https://blog.csdn.net/qq_46363790/article/details/115082425)

**项目描述**：新建需求全景模块，将各个业务老师给产研提的需求进行外化。
**技术栈**：vue、ant design vue
**项目反思与总结**：
1. 嵌套路由：`<router-view>`  
router/index.js
```javascript
{
    path: '/demand/',
    name: 'demand',
    component: () => import('@c/demand/index.vue'),
    children: [
      {
        path: '',
        component: () => import('@c/demand/demand.vue')
      },
      {
        path: 'createDemand/',
        name: 'createDemand',
        component: () => import('@c/demand/createDemand.vue'),
      }
    ]
  }
```

Demand/idnex.vue

```javascript
<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
                                                                                     
</style>
```

2. 使用this.$set 修改数组中对象可更新视图 
3. tab栏吸顶：类似导航栏置顶                                                                                                         方法：钩子mounted 时取到tab距离页面顶部距离（offsetTop）                                                                                             监听window滚动事件并实时计算滚动条滚动距离                                                                       
`scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;`
   当scrollTop >= tab距离页面顶部距离  设置tab position: fixed
   注： 1. 当tab置fixed时 tab脱离文档流 下面元素会挤上来（突然上前）  
           解决：1. 给tab一个高度 2. 当tab fixed时给下面元素一个大小为tab高度的margin-top         
           2. 在mounted中使用window.onload增加滚动监听 在destoryed钩子中移除监听                          问题：第一次进入时调用了window.onload 再次进入时不调用 导致未监听                                               解决：使用this.$nextTick() 在下次dom更新循环后执行回调
	   3. 问题：使用echarts图表 导致累加的offsetTop变小
		解决： 在this.$nextTick()中绑定滚动事件（dom渲染好之后）
注意：只有元素show（渲染完成）才会计算入offsetTop，若是中间有元素数据需要异步获取，会导致最终获取的offsetTop值偏小
        
补充：offsetTop获取元素到顶部的距离(累加)：  为什么要累加？
　　 因为offsetTop返回的是当前对象距离上一层父级节点(offsetParent)的距离；
　　 如果元素有多个父级，则必须要累加
          *  offsetParent：距离元素最近的一个具有定位的祖宗元素（relative，absolute，fixed），若祖宗都不符合条件，offsetParent为body。
￼
   封装函数：

```javascript
getElementTop (el) {
          let actualTop = el.offsetTop
          let current = el.offsetParent
          while (current !== null) {
            actualTop += current.offsetTop
            current = current.offsetParent
          }
          return actualTop
        }
```
                                                              
4. position   fixed层级高于relative 但仍未覆盖relative元素 解决：寻找父元素层级（若relative的父元素层级高 则不会覆盖）

5. chorme字体最小限制为12px 解决： 使用css transform 缩小                                                           例9px:   `font-size:90px; transform: scale(0.1) translate(-930px, -380px);`                                                                 注：transform: scale 除了缩小 font-size，也会缩小其他一些属性，例如整个字体的长宽，需要进一步调整它的位置等属性
6. css中图片顶对齐 文字底对齐： 若想让文字与图片底对齐 文字样式：vertical-align : bottom
7. 制作遮罩层 使用opacity及background 问题：遮罩层上的元素背景色也变成透明色了               解决：使用background: rgba()                                                                                                  问题：显示遮罩层 下面层级还可以滚动                                                                                        解决：遮罩层显示时 给body加类名      `document.getElementsByTagName("body")[0].className = “hidden”          .hidden{ height: 100%; overfloe:hidden;  }` 
(注:.hidden要与body并列编写)
 8. vue如何使容器内不定高的元素垂直居中 父容器设置display: flex;
```css
justify-content: center;
  align-items: center;
```
9. 取消双击选中文本CSS设置       

```css
 -moz-user-select:none;/*火狐*/
-webkit-user-select:none;/*webkit浏览器*/
-ms-user-select:none;/*IE10*/
-khtml-user-select:none;/*早期浏览器*/
user-select:none;
```

10. 如何让外层div宽度由内层div宽度撑开  外层div display:inline-block;
11. 元素水平垂直居中：

方法一：
```css
width: 40px;
height: 40px;
position: absolute;
top: 0;
right: 0;
bottom: 0;
left: 0;
margin: auto;
```
方法二： 

```css
display: flex;
align-items: center;
justify-content: center;
```


12. 动态设置img 地址src 方法一：导入地址 `:src=“home”`  `import home from '../static/icon/home.png'` 方法二:拼接字符串
13. 为元素增加class `this.$refs.classList.add('className')`
14. 设置元素不可见 但保留占有位置 `visibility: hidden;`
15. 父组件通过ref选择子组件 通过调用子组件内的函数控制显隐
16. POST 参数data: params   GET 参数 params : params