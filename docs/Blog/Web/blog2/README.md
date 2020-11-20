## 解决第一个子元素设置margin-top父元素会跟着移动
> 2019-12-21 17:21:14 
<br>分类专栏：css 


**问题：**
当我们设置子元素的margin-top，但是却发现子元素没有出现上外边距的效果，反而是父元素出现了上外边距的效果。
**原因：**
边距重叠：一个盒子和其子孙的边距重叠。根据规范，一个盒子如果没有上补白和上边框，那么它的上边距应该和其文档流中的第一个孩子元素的上边距重叠。
**解决：**
1. 为父元素设置padding。

```c
#father {
    width: 300px;
    height: 300px;
    background: orange;
    padding: 1px;
}
#son {
    width: 100px;
    height: 100px;
    margin: 50px;
    background: red;
}
```

3. 为父元素设置border。

```c
#father {
	    width: 300px;
	    height: 300px;
	    background: orange;
	    border: 1px solid #000;
	}
	#son {
	    width: 100px;
	    height: 100px;
	    margin: 50px;
	    background: red;
	}

```

4. 为父元素设置 overflow: hidden 。

```cpp
#father {
    width: 300px;
    height: 300px;
    background: orange;
    overflow: hidden;
}
#son {
    width: 100px;
    height: 100px;
    margin: 50px;
    background: red;
}

```

5. 父级或子元素使用浮动或者绝对定位absolute

```c
#father {
    width: 300px;
    height: 300px;
    background: orange;
    position:absolute;
}
#son {
    width: 100px;
    height: 100px;
    margin: 50px;
    background: red;
}
```
