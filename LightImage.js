var timer;
var isEnable;

init();
hide();

function createStyleSheet() {
    var style = document.createElement("style");
    style.setAttribute('id', 'myImgStyle');
    document.getElementsByTagName("head")[0].appendChild(style);
}

function setStyleSheet() {
    var style = document.getElementById('myImgStyle');
    style.innerHTML  = "img { opacity: 0.3 } ";
    style.innerHTML += "img:hover { opacity: 1 } ";
    style.innerHTML += ".myImg { opacity: 0.6 } ";
    style.innerHTML += ".myImg:hover { opacity: 1 } ";
    // 右側のサイドバー
    style.innerHTML += "div[componentid] { opacity: 0.8 }";
    style.innerHTML += "div[componentid]:hover { opacity: 1 }";
}

function resetStyleSheet() {
    var style = document.getElementById('myImgStyle');
    style.innerHTML = '';
    style.innerHTML += ".myImg { opacity: 1 } ";
    style.innerHTML += ".myImg:hover { opacity: 1 } ";
}

chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        if (request.doDisable) { show(); }
        else { hide(); }
        sendResponse({});
    }
);

function init() {
    createStyleSheet();
    setStyleSheet();
}

function hide() {
    setStyleSheet();
    timer = setInterval(myImage, 500);
    isEnable = true;
}

function show() {
    clearInterval(timer);
    var img = document.querySelectorAll('.myImg');
    resetStyleSheet();
    for (var i=0; i<img.length; i++) {
        img[i].style.height = img[i].getAttribute('height');
        img[i].onmouseover = undefined;
        img[i].onmouseout = undefined;
        // img[i].classList.remove('myImg');
    }
    isEnable = false;
}

// 画像関係を目立たなく
function myImage() {
    var img = document.querySelectorAll('.dv:not(.myImg)');
    for (i=0; i<img.length; i++) {
        var h = img[i].style.height;
        img[i].onmouseover = function() {
            this.style.height = h;
        };
        img[i].onmouseout = function() {
            this.setAttribute('height', h);
            this.style.height = '130px';
        };
        img[i].classList.add('myImg');
        img[i].style.height = '130px';
    }
};

// uキーで最上部へスクロールアップ
function myGoTop() {
    var goTopMove = 10;
    var yPos = document.body.scrollTop || document.documentElement.scrollTop;
    myMove(yPos, goTopMove);
    return false;
}

function myMove(yPos, goTopMove) {
    var goTopPos;
    goTopPos = parseInt(yPos - yPos * 2 / goTopMove);
    scrollTo(0, goTopPos);
    if (goTopPos > 0) setTimeout(function () {
        myMove(goTopPos, goTopMove);
    }, 1);
}

document.addEventListener('keypress', function(e) {
    var name = e.target.tagName;
    if (name == 'TEXTAREA' || name == 'INPUT' || e.target.contentEditable == 'plaintext-only') { return; }
    var k = String.fromCharCode(e.keyCode);
    if (k == 'u' && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        myGoTop();
    }
    if (k == 'h' && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
    		if (isEnable) { show(); }
        else { hide(); }
        chrome.extension.sendRequest({}, function(response) {});
    }
}, false);
