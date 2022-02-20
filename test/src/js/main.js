/**
 * 常用JS变量:
 * agentEvent = 代理模式下自动点击模块
 * acEvent= 无障碍模式下自动点击模块
 * device = 设备信息模块
 * file = 文件处理模块
 * http = HTTP网络请求模块
 * shell = shell命令模块
 * thread= 多线程模块
 * image = 图色查找模块
 * utils= 工具类模块
 * global = 全局快捷方式模块
 * 常用java变量：
 *  context : Android的Context对象
 *  javaLoader : java的类加载器对象
 * 导入Java类或者包：
 *  importClass(类名) = 导入java类
 *      例如: importClass(java.io.File) 导入java的 File 类
 *  importPackage(包名) =导入java包名下的所有类
 *      例如: importPackage(java.util) 导入java.util下的类
 *
 */

function main() {
    //开始再这里编写代码了！！
    if (!autoServiceStart(3)) {
        logd("自动化服务启动失败，无法执行脚本")
        exit();
        return;
    }
    logd("开始执行脚本...");
    toast("开始执行脚本");
    logd("正在跳转至微信指定页");
    utils.openAppByName("微信");
    var w = waitExistActivity("com.tencent.mm.plugin.webview.ui.tools.WebviewMpUI",10000);

    var WebView = clz("android.webkit.WebView");
    var WebView_result =  getText(WebView);
    logd("WebView_result:"+WebView_result);

    var HeadTextView = clz("android.widget.TextView");
    var HeadTextView_result = "b" + getText(HeadTextView);
    logd("HeadTextView:"+HeadTextView_result);

    if (WebView_result == "湖南省青年大学习")
    {

        toast("检测到当前页面为——青年大学习 开始执行对应操作");
        logd("检测到当前页面为——青年大学习 开始执行对应操作");
        var page = 1;
        logd("page:"+page);
    }
    else if (HeadTextView_result.search("青年湖南说") != -1)
    {
        toast("检测到当前页面为——青年湖南说 开始执行对应操作");
        logd("检测到当前页面为——青年湖南说 开始执行对应操作");
        var page = 2;
        logd("page:"+page);
    }
    else
    {
        logd("未找到对应页面 脚本已退出");
        toast("未找到对应页面 脚本已退出");
        exit();
    }




    if (page == 1){
        logd("跳转至微信指定页成功");
        logd("获取信息中")


        var selectors = clz("android.widget.TextView");
        var result = getText(selectors);
        logd("result:"+result);
        var result_str = "b,"+result

        var strs= new Array(); //定义一数组
        strs=result_str.split(","); //字符分割
        var ling = "null";
        for (i=0;i<strs.length ;i++ )
        {
            ling = strs[i];

            if(ling.search("积分") != -1){
                var integral = strs[i];
                integral = integral.substr(3);
                logd(integral);
                toast("当前积分："+integral)
            }

            if (ling.search("第") != -1 && ling.search("期") != -1){
                logd("操作："+ling); //分割后的字符输出
                var node = text(ling).getOneNodeInfo(3000);
                if (node){
                    node.click();
                    logd(ling+"操作完成");
                    logd("等待中");
                    sleep(2000);
                    logd("返回上一级");
                    back();
                    logd("等待中");
                    sleep(1000);

                }

            }

            if (ling.search("特辑") != -1){
                logd("操作："+ling); //分割后的字符输出
                var node = text(ling).getOneNodeInfo(3000);
                if (node){
                    node.click();
                    logd(ling+"操作完成");
                    logd("等待中");
                    sleep(2000);
                    logd("返回上一级");
                    back();
                    logd("等待中");
                    sleep(1500);

                }

            }

            var view_data = clz("android.view.View");
            var result2 = getText(view_data);
            var ling2 = result2 + "new";
            if (ling2.search("加载更多") != -1){
                var node = text("加载更多").getOneNodeInfo(3000);
                if (node){
                    node.click();
                    logd("加载更多 操作完成");
                    logd("等待中");
                    sleep(3000);

                }
            }

        }

        var selectors2 = clz("android.widget.TextView");
        var result2 = getText(selectors2);
        var integral = result2 + "new";
        integral2 = integral.substr(3);
        toast("青年大学习操作完毕 当前积分："+integral2);
    }

    if (page == 2){
        logd("跳转至微信指定页成功");
        logd("获取信息中")


        var selectors = clz("android.view.View");
        var result = getText(selectors);
        logd("result:"+result);
        var result_str = "b,"+result

        var strs= new Array(); //定义一数组
        strs=result_str.split(","); //字符分割
        var ling = "null";
        for (i=0;i<strs.length ;i++ ){
            ling = strs[i];
            logd(ling)
            if (ling.search("b") != -1 || ling.search("null") != -1 || ling.search("-") != -1 || ling.search("积分") != -1)
            {
                logd("舍弃无效数据" + ling)

            }
            else
            {
                logd("操作："+ling); //分割后的字符输出
                var node = text(ling).getOneNodeInfo(3000);
                if (node){
                    node.click();
                    logd(ling+"操作完成");
                    logd("等待中");
                    sleep(2000);
                    logd("返回上一级");
                    back();
                    logd("等待中");
                    sleep(1000);

                }
            }

        }
        logd("湖南青年说操作完毕")
        logd("脚本已退出")
        toast("湖南青年说操作完毕")
        toast("脚本已退出")

    }








}

function autoServiceStart(time) {
    for (var i = 0; i < time; i++) {
        if (isServiceOk()) {
            return true;
        }
        var started = startEnv();
        logd("第" + (i + 1) + "次启动服务结果: " + started);
        if (isServiceOk()) {
            return true;
        }
    }
    return isServiceOk();
}

main();