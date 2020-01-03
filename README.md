# 石墨文档批量导出

支持类型

- 文档
- 表格
- 思维导图
- 幻灯片

## Usage

填写配置文件

```shell
cp config.example.js config.js
```

```js
export const config = {
    Cookie: 'xxx', // 从浏览器中获取石墨文档的 Cookie
    Path: 'files', // 存放导出文档的位置
    Folder: '', // 需要导出的文件夹 ID，从浏览器地址栏获取，https://shimo.im/folder/xxx 中 xxx，全部导出则留空
    Recursive: false, // 是否导出子目录
    Sleep: 1000 // 导出两个文档间的时间间隔，必须设置，否则会服务器忙，单位 ms
};
```

安装依赖

```shell
yarn // or npm install
```

运行

```shell
node index.js
```

## 依赖

```
node ^13
```
