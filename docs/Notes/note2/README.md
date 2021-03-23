## Nodejs
> 2021-02-05 20:11:46 
<br>分类专栏：nodejs



es6 ——  export -> import
node —— module.exports ->  require

抛出
require方能看到的只有module.exports这个对象
Import要写在最前面 （编译时加载）

引入

		 import		        reqiure
 		es6				node
		可用解构			不可用解构
		路径加.js			不用加.js（node 默认加）
		



根据当前菜单id获取“相关文档”的列表来显示可跳转的标题



Navicat

mysql 

mysql密码  ab123456

连接mysql服务器
mysql -u root -pab123456


QA:
问题： node服务运行在localhost:3000端口，vue运行在localhost:8080端口，不同端口存在跨域
解决：使用反向代理处理。

在src同级目录下创建文件vue.config.js 

```javascript
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '' : './',
    devServer: {
        proxy:
        {
            '/': {
                // 此处的写法，目的是为了 将 /api 替换成 http://localhost:3000
                target: 'http://127.0.0.1:3000',
                // 允许跨域
                changeOrigin: true,
                ws: true,
            }
        }
    }
}
```

注意： mac下 target: 'http://localhost:3000',不可以 需使用 target: 'http://127.0.0.1:3000',
