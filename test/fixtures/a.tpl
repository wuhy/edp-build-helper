{extends file='file:../common/index_base.tpl'}

{block name="title"}
<title>Test</title>
{/block}

{block name="css"}
<link href="{$course_host}/src/css/course/course-index-1200.less" rel="stylesheet" />
{/block}

{block name="navigation"}
{include file='../common/nav.tpl' need_category=false active_menu="course"}
{/block}
{block name="category"}
{include file='../common/category.tpl' category_title_name='全部课程分类'}
{/block}
{block name="index_content"}
{include file='./index/course_index_content.tpl'}
{/block}

{block name="index_script"}
{include file='../common/script.tpl' ubs_edu_cat='course' ubs_edu_page='home'}
<script>
    require(['course/course_index'], function (courseIdxPage) {
        courseIdxPage.init();
    });
</script>
{/block}
