<!DOCTYPE html>

<html lang="zh-CN">

<head>

    <meta charset="utf-8" />


    <title>Test5552</title>

    <link href="" rel="shortcut icon" />

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
{block name="abroad_script"}
{include file='../common/script.tpl' ubs_edu_cat='abroad' ubs_edu_page='yuanxiaoresult'}
<script>
    require(['abroad/abroad_college', 'common/data', 'echarts', 'echarts/chart/pie'], function (abroad, data) {
        abroad.init(
            {
                reject: '{$reject}',
                enroll: '{$enroll}'
            }
        );
    });
</script>
{/block}
</body>

</html>
