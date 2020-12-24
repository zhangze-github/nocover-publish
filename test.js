const main = require('./index.js');

const config = {
    host: '100.93.1.114',
    port: 22,
    username: 'root',
    password: '********',
    staticPath: '/root/web/dist',
    type: 'dir',
    localPath: '../dist',
    remotePath: '/root/web/dist',
    coverPublish: false
};

main(config).then(res => {
    console.log(res);
}).catch(err => {
    console.log(('error!', err));
});