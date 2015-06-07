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
});
