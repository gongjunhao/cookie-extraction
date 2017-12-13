# Cookies提取助手（cookie-extraction）
> 很多人在入门爬虫的时候，基本上都会遇到的环节---“验证码”（防止程序自动化）。
就是这个东西使得很多程序的自动化工作止步，让人懊恼不已。

Cookies提取助手的出现，可以实现手工输入验证码，免去程序实现验证码识别的繁琐实现，
提取有效可用的Cookies，提供给爬虫抓取程序，实现免验证码爬取。

### 功能特点
* 自定义服务器地址（API）
* 操作简单，页面右键菜单提取
* 可将Cookies上传至服务器，长期使用
* 可将Cookies拷贝至剪切板，调试快捷使用

### 注意事项
* 适用场景:验证码登录才能爬取的网站，手动输入验证码获取有效Cookies使用，且网站未针对Cookies进行反爬虫处理。

### 安装
* chrome浏览器，设置 --> 更多工具 --> 扩展程序
* 勾选开发者模式
* 拖拽*.crx包至此扩展页面释放，确认安装即可
* 详细操作步骤，参考：http://www.jianshu.com/p/12ca04c61fc6

### 使用
* 点击浏览器“Cookies提取助手”扩展程序按钮，弹框里输入HTTP服务器接口地址
* 登录需要爬取的网站成功后，在页面点击鼠标右键
* 选择“Cookies提取助手”
* 选择“提取Cookies更新服务器”
* 选择“提取Cookies至剪切板”

![usage](https://github.com/gongjunhao/cookie-extraction/blob/master/doc/usage.gif)

### 服务器接口说明
目前仅支付HTTP接口：
```javascript
$.ajax({
        type: "POST",
        url: ufindServerAPI,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(json),
        dataType: "json",
        success: function(data) {
            if (data.status == "1" && data.successful) {
                console.log("服务器Cookies信息更新成功！");
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("服务器Cookies信息更新失败！错误码："+XMLHttpRequest.status);
        }
    });
```

### 引用资源
* Logo http://www.easyicon.net/1185943-Extract_object_icon.html

### 问题反馈
* https://github.com/gongjunhao/cookie-extraction/issues

### LICENSE
    
MIT License
