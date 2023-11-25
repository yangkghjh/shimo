# 石墨文档批量导出

支持类型

- 文档
- 表格
- 思维导图
- 幻灯片

## Usage with exe

1. 下载 shimoExporter.exe
2. 下载 config.example.json, 并重命名为 config.json
3. 在浏览器中登录石墨文档, 并使用 F12(开发者模式) 获取网页 Cookie
4. 将网页 Cookie 粘贴到 config.json 的"Cookie"字段中
5. 修改 config.json 的"Path"字段为导出文档的保存路径
6. 运行 shimoExporter.exe

## Usage with NodeJS

填写配置文件

```shell
cp config.example.json config.json
```

```config.json
{
    "@Cookie": "从浏览器中获取石墨文档的 Cookie",
    "@Path": "存放导出文档的位置",
    "@Folder": "需要导出的文件夹 ID，从浏览器地址栏获取，https://shimo.im/folder/xxx 中 xxx，全部导出则留空",
    "@Recursive": "是否导出子目录",
    "@Sleep": "导出两个文档间的时间间隔，必须设置，否则会服务器忙，单位 ms",
    "@Lasttime": "timeship you copy file(run this tool) last time, default 0 means to copy all files this time.",
    "@Retry": "重试次数",
}
```

安装依赖

```shell
yarn // or npm install
```

运行

```shell
node index.js
```

导出可执行文件

```shell
npm run build
```

## 依赖

```
node ^13
```
