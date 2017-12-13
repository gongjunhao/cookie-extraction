// Copyright (c) 2017 HejinOnline. All rights reserved.
// Junhao - v0.3 (2017-09-06)
// http://www.hejinonline.com/ | Released under MIT license
var curDomain = null;
var cookies = null;
//更新cookie接口
var ufindServerAPI = "http://localhost:8080/assistant";


//域名正则匹配
var regStr = '(\\w*:\/\/)?((\\w*\\-)*\\w*\.(com.cn|com|net.cn|net|org.cn|name|org|gov.cn|gov|cn|com.hk|mobi|me|info|name|biz|cc|tv|asia|hk|网络|公司|中国|ac.cn|bj.cn|sh.cn|tj.cn|cq.cn|he.cn|sx.cn|nm.cn|ln.cn|jl.cn|hl.cn|js.cn|zj.cn|ah.cn|fj.cn|jx.cn|sd.cn|ha.cn|hb.cn|hn.cn|gd.cn|gx.cn|hi.cn|sc.cn|gz.cn|yn.cn|xz.cn|sn.cn|gs.cn|qh.cn|nx.cn|xj.cn|tw.cn|hk.cn|mo.cn|travel|tw|com.tw|sh|ac|io|ws|us|tm|vc|ag|bz|in|mn|me|sc|co|org.tw|jobs|tel))';
var regx = new RegExp(regStr,'gi');

/**
 * 文档加载完毕
 * 获取当前激活tab
 */
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	if (changeInfo.status == 'complete') {
		var result = tab.url.match(regx);
		curDomain = result[0].replace("/","");

        if (!chrome.cookies) {
            chrome.cookies = chrome.experimental.cookies;
        }

        chrome.cookies.getAll({},function (cookie) {
            for (i = 0; i < cookie.length; i++) {
                var domainResult = cookie[i].domain.match(regx);
                if (domainResult != null && domainResult.length > 0 && curDomain.toLowerCase() == domainResult[0].replace("/", "").toLowerCase()) {
                    cookies += cookie[i].name + "=" + cookie[i].value + "; ";
                }
            }
            if (cookies != "") {
                cookies = cookies.substr(0, cookies.length - 2);
            }
        });
	}
});

/**
 * 获取该域名下的cookie
 * 上传Ufind服务器
 */
function updateCookies(info, tab) {
	chrome.storage.local.get('ufindServerAPI', function(result) {
			if(result.ufindServerAPI != undefined) {
				ufindServerAPI = result.ufindServerAPI;
			}
	});

    var json = {
        "domain": curDomain,
        "cookies": cookies
    };

    $.ajax({
        type: "POST",
        url: ufindServerAPI,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(json),
        dataType: "json",
        success: function(data) {
            if (data.status == "1" && data.successful) {
                var opt = {
                      type: "basic",
                      title: "Cookie提取助手提醒",
                      message: "服务器Cookies信息更新成功！",
                      iconUrl: "success.png"
                    };
                chrome.notifications.create("1", opt, function(){});
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            var opt = {
                      type: "basic",
                      title: "Cookie提取助手提醒",
                      message: "服务器Cookies信息更新失败！错误码："+XMLHttpRequest.status,
                      iconUrl: "error.png"
                    };
                chrome.notifications.create("2", opt, function(){});
        }
    });
}

function copyCookies(info, tab) {
    const input = document.createElement('input');
    input.style.position = 'fixed';
    input.style.opacity = 0;
    input.value = cookies;
    document.body.appendChild(input);
    input.select();
    document.execCommand('Copy');
    document.body.removeChild(input);
}


var parent = chrome.contextMenus.create({"title": "Cookie提取助手", "contexts": ["page"]});
var upload = chrome.contextMenus.create(
    {"title": "提取Cookies更新服务器", "parentId": parent, "contexts": ["page"], "onclick": updateCookies});
var copyCookie = chrome.contextMenus.create(
    {"title": "提取Cookies至剪切板", "parentId": parent, "contexts": ["page"], "onclick": copyCookies});