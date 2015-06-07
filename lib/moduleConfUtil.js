/**
 * @file edp 模块配置文件 `module.conf` 处理工具方法
 * @author sparklewhy@gmail.com
 */

var fs = require('fs');
var pathUtil = require('path');
var _ = require('lodash');
var jsonFormater = require('format-json');
var extractor = require('./extractor');

/**
 * 模块配置文件
 *
 * @const
 * @type {string}
 */
var MODULE_CONFIG_FILE = 'module.conf';

/**
 * 获取模块配置的路径
 *
 * @param {string=} baseDir 读取该配置文件所在的目录
 * @return {string}
 */
exports.getModuleConfPath = function (baseDir) {
    return pathUtil.resolve(baseDir || process.cwd(), MODULE_CONFIG_FILE);
};

/**
 * 读取模块配置
 *
 * @param {Object=} options 选项
 * @param {string} options.baseDir 读取该配置文件所在的目录
 * @return {Object}
 */
exports.readModuleConfSync = function (options) {
    var filePath = exports.getModuleConfPath(options && options.baseDir);
    var data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
};

/**
 * 保存模块配置文件到本地文件
 *
 * @param {string|Object} moduleConf 要保存的模块配置
 * @param {Object=} options 选项
 * @param {string} options.baseDir 读取该配置文件所在的目录
 */
exports.writeModuleConfSync = function (moduleConf, options) {
    var filePath = exports.getModuleConfPath(options && options.baseDir);

    if (typeof moduleConf === 'object') {
        moduleConf = JSON.stringify(moduleConf);
    }
    fs.writeFileSync(filePath, moduleConf, {encoding: 'utf8'});
};

/**
 * 保存提取的模块合并的配置信息
 *
 * @param {Object} customCombineConf 自定义的要覆盖的提取的模块合并配置信息
 * @param {Object=} options 选项，更多选项定义参见{@link lib/extractor#extractPageEntryModules}
 * @param {string} options.baseDir 读取该配置文件所在的目录
 */
exports.saveExtractModuleCombineConf = function (customCombineConf, options) {
    var entryModuleIds = extractor.extractPageEntryModules(options);
    var combineConf = {};
    entryModuleIds.forEach(function (id) {
        combineConf[id] = 1;
    });
    combineConf = _.assign(
        {}, combineConf, customCombineConf || {}
    );

    var moduleConf = exports.readModuleConfSync(options);
    moduleConf.combine = combineConf;
    exports.writeModuleConfSync(jsonFormater.plain(moduleConf), options);
};


