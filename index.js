
let Client = require('ssh2-sftp-client');
const fs = require("fs");
let client = new Client();
async function copy(src, target, client, coverPublish, isRoot) {
    //判断目标文件夹是否存在，不存在创建
    const state = await client.exists(target);
    if (!state) {
        await client.mkdir(target, true);
    }
    // 如果是覆盖式发布  先删除 再创建
    if ((state == "d") && coverPublish) {
        await client.rmdir(target, true);
        await client.mkdir(target, true);
    }
    //读取当前文件夹下所有的文件，如果是 文件夹进行递归拷贝，如果是文件，直接拷贝
    let data = fs.readdirSync(src);
    for (const item of data) {
        // 根文件夹下的index.html 先不发布 待所有静态资源发布完成后 再覆盖index.html
        if (!coverPublish && (item.toLowerCase() === 'index.html') && isRoot) {
            return
        }
        console.log(item);
        let paths = src + "/" + item;
        let targetPaths = target + "/" + item;
        if (fs.statSync(paths).isDirectory()) {
            await copy(paths, targetPaths, client, coverPublish, false)
        } else {
            await client.fastPut(paths, targetPaths);
        }
    }
}

module.exports = async function main(config) {
    let {host, port = 22, username = 'root', password, type = 'dir', localPath, remotePath, coverPublish = false} = config;
    await client.connect({host, port, username, password});
    if (type == "dir") {
        await copy(localPath, remotePath, client, coverPublish, true);
        if (!coverPublish) {
            await client.fastPut(localPath + '/index.html', remotePath + '/index.html');
        }
    } else {
        await client.fastPut(localPath, remotePath);
    }
    await client.end();
    return `Success!!!`
}

