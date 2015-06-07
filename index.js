/**
 * @file edp-build-helper 工具主模块
 * @author sparklewhy@gmail.com
 */

var _ = require('lodash');
var util = require('./lib/util');
var extractor = require('./lib/extractor');
var moduleConfUtil = require('./lib/moduleConfUtil');

module.exports = exports = _.assign({}, util, extractor, moduleConfUtil);
