//各DOM元素
var canvas_container = document.getElementById('canvas-container');
var canvas = document.getElementById("color-canvas");
var ctx = canvas.getContext("2d");
var input_color = document.getElementById('input_color');
var submit_button = document.getElementById('submit_button');

//绑定拖放事件
canvas_container.addEventListener('dragenter', function (e) {
    e.preventDefault();
    this.addClass('canvas-container-hover');
});
canvas_container.addEventListener('dragleave', function (e) {
    e.preventDefault();
    this.removeClass('canvas-container-hover');
});
canvas_container.addEventListener('dragover', function (e) {
    e.preventDefault();
    this.addClass('canvas-container-hover');
});

canvas_container.addEventListener('drop', function (e) {
    e.preventDefault();
    this.removeClass('canvas-container-hover');
    //获取文件引用对象
    var files = e.dataTransfer.files;
    var file = files[0];
    //检查是否为图片
    var isimage = (file.type.match(/image/gi) != null);
    if (!isimage) {
        console.log('文件格式不对');
        return false;
    }

    //读取图片
    if (window.FileReader) {
        //创建readFileer
        var fileReader = new FileReader();
        //绑定文件读取完成事件
        fileReader.addEventListener('loadend', function (e) {
            if (this.readyState == 2) {
                //用image加载图片数据，放入canvas处理
                var image = new Image();
                image.onload = function (e) {
                    canvas.width = this.width;
                    canvas.height = this.height;
                    ctx.drawImage(this, 0, 0);
                };
                image.src = this.result;
            }
        });
        //读取文件
        fileReader.readAsDataURL(file);

    }
    else {
        console.log('你的浏览器不支持FileReader');
    }

    return false;
});

//RGB转HEX
function hex(x) {
    return ("0" + parseInt(x).toString(16)).slice(-2);
}

/* 扩展元素的操作类名方法 */
Element.prototype.hasClass = function (cls) {
    return this.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
};
Element.prototype.addClass = function (cls) {
    if (!this.hasClass(cls)) this.className += " " + cls;
};
Element.prototype.removeClass = function (cls) {
    if (this.hasClass(cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        this.className = this.className.replace(reg, ' ');
    }
};

/* 替换颜色 */
input_color.addEventListener('change', function () {
    //要替换的颜色值
    var color_hex = this.value;
    console.log(color_hex);
    var bigint = parseInt(color_hex, 16);
    var replace_r = (bigint >> 16) & 255;
    var replace_g = (bigint >> 8) & 255;
    var replace_b = bigint & 255;
    //原始颜色数据
    var image_data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = image_data.data;
    //遍历数据，替换颜色
    for (var i = 0; i < data.length; i += 4) {
        data[i] = replace_r;
        data[i + 1] = replace_g;
        data[i + 2] = replace_b;
    }
    ctx.putImageData(image_data, 0, 0);
});

