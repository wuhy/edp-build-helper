<!DOCTYPE html>

<html lang="zh-CN">

<head>

    <meta charset="utf-8" />


    <title>Test2</title>

    <link href="" rel="shortcut icon" />

    <link href="dep/normalize/2.1.0/normalize.css" rel="stylesheet" />
    <link href="dep/font-awesome/3.1.0/less/font-awesome.less" rel="stylesheet" />
    <link href="dep/animate/animate.css" rel="stylesheet" />
    <link href="dep/esui/3.0.1/src/css/main.less" rel="stylesheet" />
    <link href="src/common/css/main.less" rel="stylesheet" />

    <!--[if IE 7]>
    <link href="dep/font-awesome/3.1.0/less/font-awesome-ie7.less" rel="stylesheet" />
    <![endif]-->

</head>


<body>

<div id="header"></div>

<div id="wrapper">
</div>

<div id="footer">

</div>

<script src="http://libs.baidu.com/jquery/1.10.2/jquery.min.js"></script>
<script src="http://s1.bdstatic.com/r/www/cache/ecom/esl/2-0-4/esl.js"></script>
<script>

    require.config({
        'baseUrl': 'src',
        'packages': [
            {
                'name': 'er',
                'location': '../dep/er/3.0.2/src',
                'main': 'main'
            }
        ],
        'paths': {}
    });

    require([ 'main' ]);
</script>
<script src="http://api.map.baidu.com/api?v=2.0&ak=MQO1mC5CX9fKHtbkNmGwzcsz"></script>

</body>

</html>
