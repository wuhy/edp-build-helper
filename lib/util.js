/**
 * @file 工具方法定义
 * @author sparklewhy@gmail.com
 */

var fs = require('fs');
var pathUtil = require('path');
var minimatch = require('minimatch');
var _ = require('lodash');

/**
 * 递归遍历给定的目录，收集指定 pattern 的文件
 *
 * @param {string} baseDir 初始基准目录
 * @param {string} dir 要遍历的目录
 * @param {Array.<{absolutePath: string, data: Object}>} collectFiles 收集的文件
 * @param {Array.<string|RegExp>} collectFilePatterns 要收集的文件 pattern，
 *        pattern 可以是正则表达式 或者符合 `minimatch` 的 pattern
 */
exports.traverse = function (baseDir, dir, collectFiles, collectFilePatterns) {
    var fileList = fs.readdirSync(dir);

    for (var f = 0, fLen = fileList.length; f < fLen; f++) {
        var fileName = fileList[f];
        var filePath = pathUtil.resolve(dir, fileName);
        var stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            exports.traverse(baseDir, filePath, collectFiles, collectFilePatterns);
        }
        else {
            var relativePath = pathUtil.relative(baseDir, filePath);
            for (var i = 0, len = collectFilePatterns.length; i < len; i++) {
                var pattern = collectFilePatterns[i];
                if ((pattern instanceof RegExp && pattern.test(relativePath))
                    || (typeof pattern === 'string' && minimatch(relativePath, collectFilePatterns[i]))) {
                    collectFiles.push({
                        absolutePath: filePath,
                        data: fs.readFileSync(filePath, 'utf8')
                    });
                    break;
                }
            }
        }
    }
};

/**
 * 提取链接元素正则
 *
 * @const
 * @type {RegExp}
 */
var LINK_STYLE_REGEXP = /<link\s+[^>]*?>/ig;
var STYLESHEET_REGEXP = /\s+rel\s*=\s*('|")stylesheet('|")\s*/i;

/**
 * 提取链接属性值正则
 *
 * @const
 * @type {RegExp}
 */
var HREF_REGEXP = /\s+href\s*=\s*('|")([^'"]+)('|")\s*/i;

/**
 * 提取链接的样式文件
 *
 * @param {string} content 要提取的文件内容
 * @return {Array.<string>}
 */
exports.extractLinkStyleFile = function (content) {
    var linkFiles = [];
    var result;

    while (result = LINK_STYLE_REGEXP.exec(content)) {
        var linkElem = result[0];
        if (!STYLESHEET_REGEXP.test(linkElem)) {
            continue;
        }

        var linkHref = HREF_REGEXP.exec(linkElem);

        if (linkHref) {
            linkFiles.push(linkHref[2]);
        }
    }

    return linkFiles;
};

/**
 * 入口模块 require 正则定义
 *
 * @const
 * @type {RegExp}
 */
var ENTRY_REQUIRE_REGEXP = /\brequire\s*\(\s*\[([^\]]+)\]\s*[\)|,]/g;

/**
 * 提取入口模块 id
 *
 * @param {string} content 要提取的文件内容
 * @return {Array.<string>}
 */
exports.extractEntryModuleIds = function (content) {
    var entryModuleIds = [];

    var result;
    while (result = ENTRY_REQUIRE_REGEXP.exec(content)) {
        var requireModuleStr = result[1];
        var moduleIdArr = requireModuleStr.split(',');

        for (var i = 0, len = moduleIdArr.length; i < len; i++) {
            var id = moduleIdArr[i];
            id = id.trim();

            // 去掉首尾引号
            var moduleId = id.substr(1, id.length - 2);
            if (moduleId && !_.includes(entryModuleIds, moduleId)) {
                entryModuleIds.push(moduleId);
            }
        }
    }

    return entryModuleIds;
};


/**
 * 给定数字补零，凑齐指定长度位数
 *
 * @param {number} num 要补零的数
 * @param {number=} length 要凑齐的长度，可选，默认2
 * @return {string}
 */
function paddingZero(num, length) {
    length || (length = 2);

    var paddingStr = '';
    var i = length;
    while (i > 0) {
        paddingStr += '0';
        i--;
    }

    return (paddingStr + num).slice(-1 * length);
}

/**
 * 获取格式化时间
 *
 * @param {Date=} date 要格式化日期，可选，默认当前时间
 * @param {string=} format 时间格式化格式，可选，默认 YYYYMMDDHHMM
 * @return {string}
 */
exports.getFormatTime = function (date, format) {
    if (arguments.length === 1 && typeof date === 'string') {
        format = date;
        date = null;
    }

    date || (date = new Date());
    var result = format || 'YYYYMMDDHHmm';

    var fullYear = date.getFullYear();
    result = result.replace(/YYYY/i, fullYear).replace(/YY/i, fullYear % 100);

    var month = date.getMonth() + 1;
    result = result.replace(/MM/, paddingZero(month)).replace(/M/, month);

    var day = date.getDate();
    result = result.replace(/DD/i, paddingZero(day)).replace(/D/i, day);

    var hour = date.getHours();
    result = result.replace(/HH/i, paddingZero(hour)).replace(/H/i, hour);

    var minute = date.getMinutes();
    result = result.replace(/mm/, paddingZero(minute)).replace(/m/, minute);

    var seconds = date.getSeconds();
    return result.replace(/SS/i, paddingZero(seconds)).replace(/S/i, seconds);
};
