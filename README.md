# chat-demo
使用vue2+typescript搭建的单页面应用，该demo模仿QQ设计聊天页面，可添加窗口，可自动识别URL，完成组件的定义和使用。
### 采用技术栈
Vue2.0 + TypeScript + webpack；
### 设计思路
将每个form封装成单独的组件，创建的时候动态创建该组件，删除的时候卸载该组件即可。尤其注意删除的时候也要删除内存中缓存的垃圾数据；
### 使用方法

	a.npm install安装依赖包；
	
	b.npm start开发环境查看，npm run build 生产环境打包，启动后浏览器输入 http://localhost:4200 即可查看效果；

	c.若不安装依赖，直接在dist目录中用chrome浏览器打开index.html即可。
### 效果图预览
 ![image](https://github.com/lylwanan/chat-demo/blob/master/src/assets/img/result.png)
