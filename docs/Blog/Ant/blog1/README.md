## Antd Vue tree-select 选择框一行显示 支持搜索
> 2021-3-15 15:34:08 
<br>分类专栏：Ant Design Vue 



实现选择框一行显示 不换行
```javascript
.ant-select-selection--multiple {
  overflow-x: auto;
  overflow-y: hidden;
  max-height: 33px;
}
// 重要两行
.ant-select-selection--multiple .ant-select-selection__rendered {
  white-space: nowrap; 
  display: inline-flex;
}
```
自定义滚动条（下拉菜单的滚动条也一起美化了）
```javascript
.ant-select-selection--multiple::-webkit-scrollbar,
.ant-select-dropdown::-webkit-scrollbar {
  /*滚动条整体样式*/
  height: 5px;
}
.ant-select-selection--multiple::-webkit-scrollbar-thumb,
.ant-select-dropdown::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: lightskyblue;
}
.ant-select-selection--multiple::-webkit-scrollbar-track,
.ant-select-dropdown::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: #ededed;
}
```
自定义checkbox样式

```javascript
.ant-select-tree-checkbox-checked .ant-select-tree-checkbox-inner {
  background-color: #36b8e0;
  border-color: #36b8e0;
}
```

效果如图：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210321151049199.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ2MzYzNzkw,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210321151142144.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ2MzYzNzkw,size_16,color_FFFFFF,t_70)
