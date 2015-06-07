var _ = require('lodash');
var moduleConfUtil = require('../lib/moduleConfUtil');

describe('module config file utils', function () {
    it('read module config', function () {
        var conf = moduleConfUtil.readModuleConfSync({
            baseDir: './test/fixtures/'
        });
        expect(conf).not.toBeNull();
        expect(typeof conf).toBe('object');
    });
});
