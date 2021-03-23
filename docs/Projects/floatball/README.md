## 项目--小驴悬浮球
> 2021-1-21 20:21:48 
<br>分类专栏：vue  

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210323105539941.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ2MzYzNzkw,size_16,color_FFFFFF,t_70#pic_center)
在这里看操作效果哦~[演示视频地址](https://blog.csdn.net/qq_46363790/article/details/115110112)


**项目描述**：小驴平台下帮助悬浮球，扫码入群
**技术栈**：vue 
**项目反思与总结**：
1. 悬浮球拖拽使用mousedown mousemove mpuseup 实现                                    注： mousedown 和mouseup是优先于click事件执行
为了在移动元素的操作中不执行click事件，在执行click事件时不调用mousedown和mouseup方法、设置全局标志值判断是否移动了（mousedown时标志位置1，mousemove时标志位置0）来仿click事件<在mouseup中判断>（不移动也就是没有mousemove事件（flag == 1））移动则置回0
2. 拖拽过快导致拖拽停止 ：在拖拽时若脱离拖拽元素则选中window.event
3. 拖拽元素中的图片或文字导致拖拽失效：投机取巧解决法（图片设置为背景图片 文字使用template v-if控制显隐）
4. 拖拽时文字和弹窗被选中： 使用css取消文字默认被选中效果
 `  -moz-user-select: none;
        -o-user-select: none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;`
   
5. 点击目标元素之外的区域时隐藏弹窗： 在mounted监听document click事件             

```bash
document.onclick = (e) => {
      if (!e.target.className || !e.target.className.includes("floatBall")) {
        this.isFloatWindowShow = false;
      }
    };
```

6. hover时显示弹窗 移出隐藏 ： 点击使弹窗关闭后再次移入移出有hover效果 点击使弹窗打开后 在移出时不隐藏弹窗（无hover效果）                                                                                                                          设置标志位  (isClick默认为false)        
在mouseover时且 !hasMove时触发hover显示弹窗
在点击事件中设定标志位（点击且弹窗显示时设为false 点击且弹窗隐藏时设为true） 
在mouseout中根据标志位(!isClick)隐藏弹窗                                                    
若只需要悬浮球变换样式 而不显示弹窗 则需添加悬浮球样式标志位                                                                                                  
7. 决策定位：离默认定位近的方位 （默认定位到右下 用right bottom）
8. 注意：ui图使用二倍图更清晰
9. 更换二维码  使用postman工具 更换二维码的线上地址  使用xml提交  
[参考博客](https://blog.csdn.net/fxbin123/article/details/80428216)
10. 不设置a标签跳转链接（创建元素）                                                                                           封装函数 在需要跳转时调用
```javascript
 const ele = document.createElement("a");
      document.body.appendChild(ele);
      ele.href = `${url.hemaOrigin}`;
      ele.target = "_blank";
      ele.click();
      document.body.removeChild(ele);
```            
12. 利用vue中的过滤器filter实现文字超出指定长度显示省略号
```bash
<span class="icon">{{item.hashName | ellipsis}}</span>
```
```javascript
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
