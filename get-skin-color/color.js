//各DOM元素
var canvas_container = document.getElementById('canvas-container');
var canvas = document.getElementById("color-canvas");
var ctx = canvas.getContext("2d");
var info = document.getElementById('output-color');
var progress_info = document.getElementById('progress-info-list');
var output_file = document.getElementById('output-file');
var count = 0;

//配色文件的数据结构
var skin_data = [
    ['文件名','0'],
    ['ID','%SKIN:ID%'],
    ['配色名','%留空%'],
    ['链接色','%T1%'],
    ['链接色 RGB表示','%T1:RGB%'],
    ['正文色','%T2%'],
    ['正文色 RGB表示','%T2:RGB%'],
    ['弱文本色','%T3%'],
    ['弱文本色 RGB表示','%T3:RGB%'],
    ['文字反色','%T4%'],
    ['文字反色 RGB表示','%T4:RGB%'],
    ['顶部条文字','%T6%'],
    ['顶部条文字 RGB表示','%T6:RGB%'],
    ['强线条色','%L1%'],
    ['强线条色 RGB表示','%L1:RGB%'],
    ['弱线条色','%L2%'],
    ['弱线条色 RGB表示','%L2:RGB%'],
    ['顶部条分隔线颜色','%L4%'],
    ['顶部条分隔线颜色 RGB表示','%L4:RGB%'],
    ['阴影线','%L5%'],
    ['阴影线 RGB表示','%L5:RGB%'],
    ['应用页导航线','%L6%'],
    ['应用页导航线 RGB表示','%L6:RGB%'],
    ['背景色','%B0%'],
    ['背景色 RGB表示','%B0:RGB%'],
    ['弱色块','%B3%'],
    ['弱色块 RGB表示','%B3:RGB%'],
    ['底色块','%B1%'],
    ['底色块 RGB表示','%B1:RGB%'],
    ['反色块','%B4%'],
    ['反色块 RGB表示','%B4:RGB%'],
    ['HOVER背景色','%B2%'],
    ['HOVER背景色 RGB表示','%B2:RGB%'],
    ['顶部条背景色','%B6%'],
    ['顶部条背景色 RGB表示','%B6:RGB%'],
    ['顶部条hover色','%B7%'],
    ['顶部条hover色 RGB表示','%B7:RGB%'],
    ['说说底色','%S1%'],
    ['说说底色 RGB表示','%S1:RGB%'],
    ['说说右侧底色','%S5%'],
    ['说说右侧底色 RGB表示','%S5:RGB%'],
    ['ICON正常色','%I1%'],
    ['ICON正常色 RGB表示','%I1:RGB%'],
    ['ICON链接色','%I2%'],
    ['ICON链接色 RGB表示','%I2:RGB%'],
    ['强按钮常态 背景','%A1%'],
    ['强按钮常态 背景 RGB表示','%A1:RGB%'],
    ['强按钮所有态 边框','%A2%'],
    ['强按钮所有态 边框 RGB表示','%A2:RGB%'],
    ['强按钮_HOVER 背景','%A3%'],
    ['强按钮_HOVER 背景 RGB表示','%A3:RGB%'],
    ['强按钮_CLICK 背景','%A4%'],
    ['强按钮_CLICK 背景 RGB表示','%A4:RGB%'],
    ['弱按钮常态 背景','%A5%'],
    ['弱按钮常态 背景 RGB表示','%A5:RGB%'],
    ['弱按钮所有态 边框','%A6%'],
    ['弱按钮所有态 边框 RGB表示','%A6:RGB%'],
    ['弱按钮_HOVER 背景','%A7%'],
    ['弱按钮_HOVER 背景 RGB表示','%A7:RGB%'],
    ['弱按钮_CLICK 背景','%A8%'],
    ['弱按钮_CLICK 背景 RGB表示','%A8:RGB%']
];

//取色的各坐标值
var color_coordinate = [
    {name:'T1',x:410,y:108},                                  //T1
    {name:'T2',x:410,y:130},                                  //T2
    {name:'T3',x:410,y:157},                                  //T3
    {name:'T4',x:410,y:180},                                  //T4
    {name:'T6',x:410,y:226},                                  //T6
    {name:'L1',x:575,y:111},                                  //L1
    {name:'L2',x:575,y:134},                                  //L2
    {name:'L4',x:575,y:180},                                  //L4
    {name:'L5',x:575,y:205},                                  //L5
    {name:'L6',x:575,y:230},                                  //L6
    {name:'B0',x:730,y:108},                                  //B0
    {name:'B3',x:730,y:132},                                  //B3
    {name:'B1',x:730,y:151},                                  //B1
    {name:'B4',x:730,y:178},                                  //B4
    {name:'B2',x:730,y:228},                                  //B2
    {name:'B6',x:1061,y:155},                                 //B6
    {name:'B7',x:1061,y:182},                                 //B7
    {name:'S1',x:900,y:108},                                  //S1
    {name:'S5',x:900,y:202},                                  //S5
    {name:'I1',x:1062,y:108},                                 //I1
    {name:'I2',x:1062,y:133},                                 //I2
    {name:'A1',x:1220,y:105},                                 //A1
    {name:'A2',x:1220,y:127},                                 //A2
    {name:'A3',x:1220,y:150},                                 //A3
    {name:'A4',x:1220,y:175},                                 //A4
    {name:'A5',x:1360,y:105},                                 //A5
    {name:'A6',x:1360,y:127},                                 //A6
    {name:'A7',x:1360,y:150},                                 //A7
    {name:'A8',x:1360,y:175}                                  //A8
];


//重复配色
var repeat_color_arr = [];
repeat_color_arr['1'] = ['1','14','50','82','100','151'];       //湖底蓝
repeat_color_arr['35'] = ['35','51','88','16','52','85'];       //简约蓝
repeat_color_arr['12'] = ['12','83','17','30','81'];            //蕾丝黑
repeat_color_arr['33'] = ['33','37'];                            //淡染黄
repeat_color_arr['31'] = ['31'];                                 //极致黑
repeat_color_arr['21'] = ['21','26','36'];                      //熏衣紫
repeat_color_arr['9'] = ['9'];                                    //松石绿
repeat_color_arr['5'] = ['5'];                                    //酒吧紫
repeat_color_arr['18'] = ['18'];                                  //番茄红
repeat_color_arr['8'] = ['8','27','34'];                         //糖霜粉
repeat_color_arr['25'] = ['25','7'];                             //油画蓝
repeat_color_arr['3'] = ['3','28'];                               //可可棕
repeat_color_arr['10'] = ['10','11'];                            //动感红
repeat_color_arr['6'] = ['6','29'];                              //军人绿
repeat_color_arr['2'] = ['2','15'];                              //空间黄
repeat_color_arr['19'] = ['19','23','32','70'];                 //抹茶绿
repeat_color_arr['101'] = ['101'];                               //紫蓝
repeat_color_arr['102'] = ['102'];                               //米白

//列偏移量，初始为2，因为第一列是变量描述，第二列是变量
var increase_index = 2;

//绑定拖放事件
canvas_container.addEventListener('dragenter',function(e){
    e.preventDefault();
    this.addClass('canvas-container-hover');
});
canvas_container.addEventListener('dragleave',function(e){
    e.preventDefault();
    this.removeClass('canvas-container-hover');
});
canvas_container.addEventListener('dragover',function(e){
    e.preventDefault();
    this.addClass('canvas-container-hover');
});

canvas_container.addEventListener('drop',function(e){
    e.preventDefault();
    this.removeClass('canvas-container-hover');
    //获取文件引用对象
    var files = e.dataTransfer.files;

    //闭包函数
    var ca = function(i,index){
        var file = files[i];
        //检查是否为图片
        var isimage = (file.type.match(/image/gi)!=null);
        if(!isimage){
            console.log('文件格式不对');
            return false;
        }

        //文件名和id
        var filename = file.name.split('.')[0];      //去掉后缀名之后的文件名
        var filename_arr = filename.split('_');
        var file_id = filename_arr[0];
        var skin_name = filename_arr[1];
        var repeat_color = repeat_color_arr[file_id];
        //检查配色是否存在
        if(!repeat_color){
            console.log('配色'+file_id+'不存在');
            return false;
        }
        //写入配色的文件名、ID、配色名
        skin_data[0][i+index] = repeat_color.join('|');
        skin_data[1][i+index] = file_id;
        skin_data[2][i+index] = skin_name;

        //显示进度条
        var progress_bar = '<p id="progress'+file_id+'"><span>第'+file_id+'套皮肤：</span><b class="progress-bar-outer"><b class="progress-bar-inner" id="progress-bar-inner'+file_id+'"></b></b></p>';
        progress_info.innerHTML += progress_bar;

        //读取图片
        if(window.FileReader) {
            //创建readFileer
            var fileReader = new FileReader();
            //绑定文件读取完成事件
            fileReader.addEventListener('loadend',function(e){
                if(this.readyState == 2) {
                    //去掉进度条
                    var element_p = document.getElementById('progress'+file_id);
                    element_p.parentNode.removeChild(element_p);
                    //用image加载图片数据，放入canvas处理
                    var image = new Image();
                    image.onload = function(e){
                        canvas.width = this.width;

                        canvas.height = this.height;
                        ctx.drawImage(this, 0, 0);
                        color_output(i+index);

                        //最后一套配色完成后，提供csv下载
                        /*if(++count == files.length){
                            var csv_data = [];
                            for(var i=0;i<skin_data.length;i++){
                                csv_data[i] = skin_data[i].join(',');
                            }
                            csv_data = csv_data.join('\r\n');
                            var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);      //加BOM
                            var blob = new Blob([bom,csv_data],{type:'text/csv'});
                            window.saveAs(blob,'skin.csv');
                        }*/
                    };
                    image.src = this.result;
                }
            });
            //监听文件读取过程
            fileReader.addEventListener('progress',function(e){
                if (e.lengthComputable) {
                    var percentage = Math.round((e.loaded * 100) / e.total);
                    document.getElementById('progress-bar-inner'+file_id).style.width = percentage+'%';
                }
            });
            //读取文件
            fileReader.readAsDataURL(file);

        }
        else{
            console.log('你的浏览器不支持FileReader');
        }

        return i;
    };

    //处理所有配色文件
    for (var i = 0; i<files.length; i++) {
        ca(i,increase_index);
    }

    //列偏移量增加，增加值为上次拖入的文件数量
    increase_index += files.length;

    return false;
});

//返回点击的坐标值，用于获取相应的色值坐标
canvas.addEventListener('click',function(e){
 console.log(e.layerX+','+ e.layerY);
});

//输出一套皮肤的各色值
function color_output(index){
    var color_str = '';
    for(var i=0;i<color_coordinate.length;i++){
        //颜色数据结构的偏移量映射
        var skin_data_i = i*2+3;
        //颜色变量
        var color_arr = ctx.getImageData(color_coordinate[i].x,color_coordinate[i].y,1,1).data;   //颜色数据（RGBA）
        var color_name = color_coordinate[i].name;            //颜色名
        var color_hex = '#' + hex(color_arr[0]) + hex(color_arr[1]) + hex(color_arr[2]);      //颜色值（十六进制）
        var color_rgb = '"' + color_arr[0] + ',' + color_arr[1] + ',' + color_arr[2] + '"';        //颜色值（RGB）
        //输出的信息
        color_str += color_name + ':' + color_hex + '\r';
        //实际保存的数据
        skin_data[skin_data_i][index] = color_hex;
        skin_data[skin_data_i+1][index] = color_rgb;
    }
    info.value += color_str + '---------------------------\r';
    console.log('1');
}

//RGB转HEX
function hex(x) {
    return ("0" + parseInt(x).toString(16)).slice(-2);
}


/* 扩展元素的操作类名方法 */
Element.prototype.hasClass = function(cls){
    return this.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
};
Element.prototype.addClass = function(cls){
    if (!this.hasClass(cls)) this.className += " "+cls;
};
Element.prototype.removeClass = function(cls){
    if (this.hasClass(cls)) {
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        this.className = this.className.replace(reg,' ');
    }
};

/* 下载文件 */
function saveAs(blob, filename) {
    var URL = URL || webkitURL;
    var url = URL.createObjectURL(blob);
    var save_link = document.createElement('a');
    save_link.href = url;
    save_link.download = filename;
    save_link.click();
//    URL.revokeObjectURL(url);
}

/* 输出csv */
output_file.addEventListener('click', function(){
    var csv_data = [];
    for(var i=0;i<skin_data.length;i++){
        csv_data[i] = skin_data[i].join(',');
    }
    csv_data = csv_data.join('\r\n');
    var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);      //加BOM
    var blob = new Blob([bom,csv_data],{type:'text/csv'});
    window.saveAs(blob,'skin.csv');
});