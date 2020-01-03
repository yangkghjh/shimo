export const config = {
    Cookie: 'xxx', // 从浏览器中获取石墨文档的 Cookie
    Path: 'files', // 存放导出文档的位置
    Folder: '', // 需要导出的文件夹 ID，从浏览器地址栏获取，https://shimo.im/folder/xxx 中 xxx，全部导出则留空
    Recursive: false, // 是否导出子目录
    Sleep: 1000 // 导出两个文档间的时间间隔，必须设置，否则会服务器忙，单位 ms
};
