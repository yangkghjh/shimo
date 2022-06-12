const axios = require('axios');
const Path = require('path');
const download = require('download');
const sleep = require('await-sleep');
const config = require('./config.js');
const headersOptions = {
    Cookie: config.Cookie,
    Referer: 'https://shimo.im/folder/123',
};

getFileList(config.Folder, config.Path);

async function getFileList(folder = '', basePath = '') {
    try {
        const response = await axios.get('https://shimo.im/lizard-api/files', {
            params: { collaboratorCount: 'true', folder: folder },
            headers: headersOptions
        });

        for (let i = 0; i < response.data.length; i++) {
            await sleep(config.Sleep);
            let item = response.data[i];
            let atime = new Date(item.updatedAt).getTime();
            //console.log(atime);
            if (atime > config.Lasttime) {
                //console.log('i love you baby!');
                //if(item.updatedAt == '2021-10-20T09:52:40.000Z'){
                //console.log(item.updatedAt,'chenggonglelelelelelelelelelel');
                //  }
                console.log(item.name, item.type, item.updatedAt);
                if (item.is_folder != 1) {
                    for (let j = 1; j <= config.Retry; j++) {
                        const res = await createExportTask(item, basePath);
                        if (res != 0) {
                            console.error("retry " + j + " times...");
                            await sleep(config.Sleep * 2);
                        } else {
                            break;
                        }
                    }
                } else {
                    if (config.Recursive) {
                        await getFileList(item.guid, Path.join(basePath, item.name));
                    }
                }
                // process.exit();
            } else {
                console.log('the end');
                process.exit();
            }
        }
    } catch (error) {
        console.error(error);
    }
}

async function createExportTask(item, basePath = '') {
    try {
        let type = '';
        const name = replaceBadChar(item.name);
        if (item.type == 'newdoc' || item.type == 'document') {
            type = 'docx';
        } else if (item.type == 'sheet' || item.type == 'mosheet' || item.type == 'spreadsheet') {
            type = 'xlsx';
        } else if (item.type == 'slide') {
            type = 'pptx';
        } else if (item.type == 'mindmap') {
            type = 'xmind';
        } else {
            console.error('unsupport type: ' + item.type);
            return 1;
        }

        const url = 'https://shimo.im/lizard-api/files/' + item.guid + '/export';

        const response = await axios.get(url, {
            params: {
                type: type,
                file: item.guid,
                returnJson: '1',
                name: name,
                isAsync: '0'
            },
            headers: headersOptions
        });

        // console.log(name, response.data)
        // console.log(response.data.redirectUrl, Path.join(config.Path, basePath));
        if (!response.data.redirectUrl) {
            console.error(item.name + ' failed, error: ', response.data);
            return 2;
        }
        const options = {
            headers: headersOptions
        };
        await download(response.data.redirectUrl, basePath, options);
    } catch (error) {
        console.error(item.name + ' failed, error: ' + error.message);
        return 3;
    }
    return 0;
}

function replaceBadChar(fileName) {
    // 去掉文件名中的无效字符,如 \ / : * ? " < > | 
    fileName = fileName.replace(/[\'\"\\\/\b\f\n\r\t]/g, '_');
    return fileName;
}
