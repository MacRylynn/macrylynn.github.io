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
/*用json里面的数据替换模板里面的数据*/
function displayImage(data, index, div) {
    $('p.caption', div).text(data.caption);
    $('p.desc', div).text(data.desc);
    $('p.image img', div).attr('src', 'photos/' + data.img);
    div.attr('id', 'photo_' + index);
}
/*得到模板，创建模板内容，添加内容，并且删除模板*/
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
        rsort(data.length);
        wrap[0].removeChild(originalDiv[0]);
    });
});
/*随机得到一个div，并向其添加photo_center的类*/
function rsort(max) {
    var n = Math.round(Math.random() * (max - 1) + 1);
    $('#photo_' + n).addClass("photo_center");
}