var _ = require('lodash');
var extrator = require('../lib/extractor');

describe('extract link style file', function () {
    it('return link file from current directory', function () {
        var result = extrator.extractLinkStyleFileSync();

        var expectResult = [
            '{$course_host}/src/css/course/course-index-1200.less',
            'dep/normalize/2.1.0/normalize.css',
            'dep/font-awesome/3.1.0/less/font-awesome.less',
            'dep/animate/animate.css',
            'dep/esui/3.0.1/src/css/main.less',
            'src/common/css/main.less',
            'dep/font-awesome/3.1.0/less/font-awesome-ie7.less'
        ];

        expect(expectResult.length).toEqual(result.length);
        expect(_.difference(expectResult, result).length).toBe(0);
    });

    it('return link file from specified directory', function () {
        var result = extrator.extractLinkStyleFileSync({
            scanDir: './test/fixtures/empty'
        });

        expect(result.length).toBe(0);

        result = extrator.extractLinkStyleFileSync({
            scanDir: [
                './test/fixtures/templates',
                './test/fixtures/empty'
            ]
        });

        var expectResult = [
            'src/common/css/main.less',
            'dep/font-awesome/3.1.0/less/font-awesome-ie7.less'
        ];

        expect(expectResult.length).toEqual(result.length);
        expect(_.difference(expectResult, result).length).toBe(0);
    });

    it('get the specified files link files', function () {
        var result = extrator.extractLinkStyleFileSync({
            files: ['*/*/*.html']
        });
        var expectResult = [
            'src/common/css/main.less'
        ];
        expect(expectResult.length).toEqual(result.length);
        expect(_.difference(expectResult, result).length).toBe(0);

        result = extrator.extractLinkStyleFileSync({
            files: ['*/*/*.html', /a\.tpl$/]
        });
        expectResult = [
            'src/common/css/main.less',
            '{$course_host}/src/css/course/course-index-1200.less'
        ];
        expect(expectResult.length).toEqual(result.length);
        expect(_.difference(expectResult, result).length).toBe(0);
    });

    it('filter link style file', function () {
        var result = extrator.extractLinkStyleFileSync({
            filter: function (path) {
                return !/^dep\//.test(path);
            }
        });

        var expectResult = [
            '{$course_host}/src/css/course/course-index-1200.less',
            'src/common/css/main.less'
        ];

        expect(expectResult.length).toEqual(result.length);
        expect(_.difference(expectResult, result).length).toBe(0);
    });

    it('preprocess link style file', function () {
        var result = extrator.extractLinkStyleFileSync({
            preprocess: function (path) {
                return path.replace(/\{\$course_host\}\//, '');
            }
        });

        var expectResult = [
            'src/css/course/course-index-1200.less',
            'src/common/css/main.less',
            'dep/normalize/2.1.0/normalize.css',
            'dep/font-awesome/3.1.0/less/font-awesome.less',
            'dep/animate/animate.css',
            'dep/esui/3.0.1/src/css/main.less',
            'dep/font-awesome/3.1.0/less/font-awesome-ie7.less'
        ];

        expect(expectResult.length).toEqual(result.length);
        expect(_.difference(expectResult, result).length).toBe(0);
    });

});

describe('extract entry module ids', function () {
    it('get entry module ids from current directory', function () {
        var result = extrator.extractPageEntryModules();
        var expectResult = [
            'main',
            'abroad/abroad_college',
            'common/data',
            'echarts',
            'echarts/chart/pie',
            'course/course_index'
        ];
        expect(expectResult.length).toEqual(result.length);
        expect(_.difference(expectResult, result).length).toBe(0);
    });

    it('filter not wanted module id', function () {
        var result = extrator.extractPageEntryModules({
            filter: function (id) {
                return id !== 'common/data';
            }
        });
        var expectResult = [
            'main',
            'abroad/abroad_college',
            'echarts',
            'echarts/chart/pie',
            'course/course_index'
        ];
        expect(expectResult.length).toEqual(result.length);
        expect(_.difference(expectResult, result).length).toBe(0);
    });
});
