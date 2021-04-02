## 项目--移动多媒体
> 2020-5-13 20:03:23 
<br>分类专栏：vue app

项目简介： 
1. 集电视剧集、音乐播放、书籍浏览和智能机器人闲聊功能的移动端APP
2. 采用vue-cli脚手架搭建，并结合vue-router、vuex
3. 异步请求服务器代理axios和get来抓取豆瓣及网易云接口获取数据，实现功能
4. 音乐播放使用vue-aplayer音频播放器 数据取自jsonbird接口https://bird.ioliu.cn/netease<br>
智能机器人聊天使用腾讯AI开放平台智能闲聊API接口 通过对部分请求参数进行字符串处理及MD5计算得出签名信息 也作为请求参数进行请求数据 （MD5加密使用工具包blueimp-md5）


项目收获： 对vue-router及vuex的用法加深了理解，使用第三方代理等方法解决基本的跨域问题

页面展示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210329174013339.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ2MzYzNzkw,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210329173913517.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ2MzYzNzkw,size_16,color_FFFFFF,t_70)

![请添加图片描述](https://img-blog.csdnimg.cn/20210329173815443.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ2MzYzNzkw,size_16,color_FFFFFF,t_70)
![请添加图片描述](https://img-blog.csdnimg.cn/20210329173815551.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ2MzYzNzkw,size_16,color_FFFFFF,t_70)