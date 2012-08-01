// 画像関係を目立たなく
function myImage() {
    var img = document.querySelectorAll('.dv:not(.myImg)');
    for (i=0; i<img.length; i++) {
        var h = img[i].style.height;
        img[i].onmouseover = function() {
            this.style.height = h;
        };
        img[i].onmouseout = function() {
            this.style.height = '130px';
        };
        img[i].classList.add('myImg');
        img[i].style.height = '130px';
    }
}

var style = document.createElement("style");
style.innerHTML  = "img { opacity: 0.3 } ";
style.innerHTML += "img:hover { opacity: 1 } ";
style.innerHTML += ".myImg { opacity: 0.6 } ";
style.innerHTML += ".myImg:hover { opacity: 1 } ";
document.getElementsByTagName("head")[0].appendChild(style);

setInterval(myImage, 500);

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
}, false);
