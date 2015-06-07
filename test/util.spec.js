var util = require('../lib/util');

describe('util', function () {
    describe('transverse given dir', function () {
        var basDir = './test/fixtures';

        it('using regexp pattern', function () {
            var result = [];
            util.traverse(basDir, basDir, result, [/^[^\/]*\.json$/]);
            expect(result.length).toBe(1);

            result = [];
            util.traverse(basDir, basDir, result, [/^[^\/]*\.json$/, /\.tpl$/]);
            expect(result.length).toBe(4);
        });

        it('using minimatch pattern', function () {
            var result = [];
            util.traverse(basDir, basDir, result, ['*.json', '*.tpl']);
            expect(result.length).toBe(3);

            result = [];
            util.traverse(basDir, basDir, result, ['**/*.json', '**/*.tpl']);
            expect(result.length).toBe(5);
        });
    });

    describe('get formate time', function () {
        it('return specified format time', function () {
            var date = new Date(2014, 8, 12, 9, 12, 56);
            var formatTime = util.getFormatTime(date, 'YYYY-MM-DD-HH-mm-SS');

            expect(formatTime).toBe('2014-09-12-09-12-56');
        });
    });
});
