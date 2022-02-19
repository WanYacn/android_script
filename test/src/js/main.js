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
    toast("开始执行脚本 期间请勿进行操作！");
    logd("正在打开微信");
    utils.openAppByName("微信");
    var w = waitExistActivity("com.tencent.mm.plugin.webview.ui.tools.WebviewMpUI",10000);
    logd("微信打开成功");
    if(!w){
        toast("打开失败");
        logd("打开微信失败");
        return;
    }

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

        var selectors2 = clz("android.widget.TextView");
        var result2 = getText(selectors2);
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