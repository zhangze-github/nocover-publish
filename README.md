
```js
npm install nocover-publish --save -dev
```

### 适用于前端静态资源的非覆盖式发布

自定义配置静态资源的本地路径和远程机器的存储路径，脚本递归处理文件夹下的所有文件，首先上传不包含根目录下的index.html文件，待所有静态资源上传完毕后，再替换根目录下的index.html。

### 非覆盖式发布的意义

单页面应用当首页的index.html资源被加载后，其余的js，css等静态资源的路径就已经国定，如果这时进行覆盖式发布，影响正在使用中的用户链接其他静态资源。

### DEMO

```js
const main = require("nocover-publish");

const config = {
    host: '100.93.1.***',
    port: 22,
    username: 'root',
    password: '*****',
    staticPath: '/root/web/dist',
    type: 'dir',
    localPath: '../dist',
    remotePath: '/root/web/dist',
    coverPublish: false
};

main(config).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
});
```