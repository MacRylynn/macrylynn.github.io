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
    var angle = Math.random() * 50 - 50;
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
    $('#photo_' + n).addClass("photo_center");
    $('#photo_' + n).css("transform", "rotate(0deg)");
    _div.splice(n - 1, 1);
    var photo_left = _div.splice(0, Math.round(_div.length / 2));
    var photo_right = _div;
    for (i = 0; i < photo_left.length; i++) {
        var photo = photo_left[i];
        photo.style.left = Math.random() * 300 - 80 + 'px';
        photo.style.top = Math.random() * 700 - 100 + 'px';
    }
    for (i = 0; i < photo_right.length; i++) {
        var photo = photo_right[i];
        photo.style.left = Math.random() * 350 + 800 + 'px';
        photo.style.top = Math.random() * 700 - 100 + 'px';
    }
}