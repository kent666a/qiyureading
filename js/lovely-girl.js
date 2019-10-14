let t1 = new Date().getTime();
let browser = {
	versions: function () {
		var u = navigator.userAgent, app = navigator.appVersion;
		return {//移动终端浏览器版本信息
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
			iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
		};
	}(),
	language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
let flag = false;
//1.是否mobile，否，肯定不是。
if (browser.versions.mobile) {
	//2.是否ios或android终端，有一个是
	if (browser.versions.android || browser.versions.ios) {
		flag = true;
	}
}

function loadJS(url, callback) {
	let script = document.createElement('script'),
	fn = callback || function () {
	};
	script.type = 'text/javascript';
	//IE
	if (script.readyState) {
		script.onreadystatechange = function () {
			if (script.readyState == 'loaded' || script.readyState == 'complete') {
				script.onreadystatechange = null;
				fn();
			}
		};
	} else {
		//其他浏览器
		script.onload = function () {
			fn();
		};

	}
	script.src = url;
	document.getElementsByTagName('head')[0].appendChild(script);

}

if (!flag) {
	let url = "https://cdn.jsdelivr.net/npm/live2d-widget@3.0.4/lib/L2Dwidget.min.js";
	loadJS(url, function () {
		L2Dwidget.init();
		setTimeout(removeBorder, 1000);
	})

	function removeBorder() {
		document.getElementById("live2dcanvas").style.border = "";
	}
}
