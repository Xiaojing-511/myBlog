## 项目--小驴悬浮球

> 2021-1-21 20:21:48
> <br>分类专栏：vue

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210323105539941.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ2MzYzNzkw,size_16,color_FFFFFF,t_70#pic_center)
在这里看操作效果哦~[演示视频地址](https://blog.csdn.net/qq_46363790/article/details/115110112)

**项目描述**：小驴平台下帮助悬浮球，扫码入群
**技术栈**：vue
**项目反思与总结**：

1. 悬浮球拖拽使用 mousedown mousemove mpuseup 实现 注： mousedown 和 mouseup 是优先于 click 事件执行
   为了在移动元素的操作中不执行 click 事件，在执行 click 事件时不调用 mousedown 和 mouseup 方法、设置全局标志值判断是否移动了（mousedown 时标志位置 1，mousemove 时标志位置 0）来仿 click 事件<在 mouseup 中判断>（不移动也就是没有 mousemove 事件（flag == 1））移动则置回 0
2. 拖拽过快导致拖拽停止 ：在拖拽时若脱离拖拽元素则选中 window.event
3. 拖拽元素中的图片或文字导致拖拽失效：投机取巧解决法（图片设置为背景图片 文字使用 template v-if 控制显隐）
4. 拖拽时文字和弹窗被选中： 使用 css 取消文字默认被选中效果
   `  -moz-user-select: none;
       -o-user-select: none;
       -khtml-user-select: none;
       -webkit-user-select: none;
       -ms-user-select: none;`
5. 点击目标元素之外的区域时隐藏弹窗： 在 mounted 监听 document click 事件

```bash
document.onclick = (e) => {
      if (!e.target.className || !e.target.className.includes("floatBall")) {
        this.isFloatWindowShow = false;
      }
    };
```

6. hover 时显示弹窗 移出隐藏 ： 点击使弹窗关闭后再次移入移出有 hover 效果 点击使弹窗打开后 在移出时不隐藏弹窗（无 hover 效果） 设置标志位 (isClick 默认为 false)  
   在 mouseover 时且 !hasMove 时触发 hover 显示弹窗
   在点击事件中设定标志位（点击且弹窗显示时设为 false 点击且弹窗隐藏时设为 true）
   在 mouseout 中根据标志位(!isClick)隐藏弹窗  
   若只需要悬浮球变换样式 而不显示弹窗 则需添加悬浮球样式标志位
7. 决策定位：离默认定位近的方位 （默认定位到右下 用 right bottom）
8. 注意：ui 图使用二倍图更清晰
9. 更换二维码 使用 postman 工具 更换二维码的线上地址 使用 xml 提交  
   [参考博客](https://blog.csdn.net/fxbin123/article/details/80428216)
10. 不设置 a 标签跳转链接（创建元素） 封装函数 在需要跳转时调用

```javascript
const ele = document.createElement("a");
document.body.appendChild(ele);
ele.href = `${url.hemaOrigin}`;
ele.target = "_blank";
ele.click();
document.body.removeChild(ele);
```

11. 利用 vue 中的过滤器 filter 实现文字超出指定长度显示省略号

```bash
<span class="icon">{{item.hashName | ellipsis}}</span>
```

````javascript
filters: {
    //超过20位显示 ...
    ellipsis: function (value) {
      if (!value) return "";
      if (value.length > 10) {
        return value.slice(0, 10) + "...";
      }
      return value;
    },
  },```
````
