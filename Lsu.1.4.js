//变量的作用域 js

/*改变类的名称实现翻页的效果*/
function turn(elem) {
    var clc = elem.className;
    if (/photo_front/.test(clc)) {
        clc = clc.replace(/photo_front/, 'photo_back')
    } else {
        clc = clc.replace(/photo_back/, 'photo_front')
    }
    return elem.className = clc;
}
/*用json里面的数据替换模板里面的数据。并且旋转任意度数*/
function displayImage(data, index, div) {
    $('p.caption', div).text(data.caption);
    $('p.desc', div).text(data.desc);
    $('p.image img', div).attr('src', 'photos/' + data.img);
    div.attr('id', 'photo_' + index);
    var angle = Math.random() * 50 - 25;
    div.css("transform", "rotate(" + angle + "deg)");
}
/*得到模板，创建模板内容，添加内容(displayImage)，并且删除模板*/
$(function () {
    $.get("photos/data.json", function (data) {
        var originalDiv = $('.photo');
        var wrap = $("#wrap");
        var d = data.length;
        for (var i = 0; i < d; i++) {
            var div = $(
                '<div id="photo_n" class="photo photo_front" onclick="turn(this)">' + originalDiv.html() +
                '</div>'
            );
            displayImage(data[i], i + 1, div);
            wrap.append(div);
        }
        wrap[0].removeChild(originalDiv[0]);
        rsort(data.length);
    });
});
/*随机得到一个div，并向其添加photo_center的类,并且使旋转的角度变为0*/
function rsort(max) {
    var n = Math.round(Math.random() * (max - 1) + 1);
    var _div = $('div.photo');
    _div.removeClass('photo_center');

    //    for (var i = 0; i < _div.length; i++) {
    //        var _div = _div[i];
    //        _div.className = _div.className.replace(/\s*photo_center\s*/, ' ');
    //    }

    $('#photo_' + n).addClass("photo_center");
    $('#photo_' + n).css("transform", "rotate(0deg)");
    _div.splice(n - 1, 1);
    setImage();
    //    console.log(_div[0]);

    function setImage() {
        for (var i = 0; i < _div.length; i++) {
            var h = Math.random() * 600 - 100;
            var w = Math.random() * 1200 - 100;
            var allw = $('#wrap').width();
            var allh = $('#wrap').height();
            $(_div[i]).css("margin-top", h + 'px');
            $(_div[i]).css("margin-left", w + 'px');
        }

    }

}



//Left - photo.width, (wrap.width / 2 - photo.width / 2)
//right(wrap.width / 2 + photo.width / 2), (wrap.width + photo.width / 2)
//height    -photo.height,(wrap.height+photo.height)