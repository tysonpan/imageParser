/*
 * Project: imageParser类
 * Comments: 本地图片粘贴和拖放读取，兼容FF和Chrome
 * author:  Tysonpan
 * blog: tysonpan.com
 */

var imageParser = {

    editor : null,
    imgList : null,

    /* 初始化 */
    init : function(editorId,imgListId){
        //获取操作元素
        this.editor = document.getElementById(editorId);
        this.imgList = document.getElementById(imgListId);

        //绑定事件
        this.extendElementClassMethod();
        this.setPasteImg();
        this.setDragAndDropImg();
        this.setDeleteThumbImg();
    },

    /* 编辑区域接收粘贴图片 */
    setPasteImg : function(){
        //浏览器判断
        var ua = navigator.userAgent.toLowerCase();
        var rFirefox = /.*(firefox)\/([\w.]+).*/;

        //FF
        if(rFirefox.exec(ua)){
            window.setInterval(function(){
                var childs= imageParser.editor.childNodes;
                for(var i=0;i<childs.length;i++){
                    var childNode = childs[i];
                    if(childNode.nodeName.toLowerCase() == 'img'){
                        var dataStr = childNode.getAttribute('src');
                        imageParser.appendThumbImg(dataStr);
                        imageParser.editor.removeChild(childNode);
                    }
                }
            },20);
        }

        //other，目前只有chrome支持
        else{
            this.editor.addEventListener('paste',function(e){
                var items = e.clipboardData.items;
                for (var i = 0; i < items.length; ++i) {
                    if (items[i].kind == 'file' && items[i].type.match(/image/gi)) {
                        //创建fileReader
                        var fileReader = new FileReader();
                        fileReader.addEventListener('loadend', function(e){
                            imageParser.appendThumbImg(this.result);
                        }, false);

                        //读取文件
                        var blob = items[i].getAsFile();
                        fileReader.readAsDataURL(blob);
                    }
                }

                return false;
            });
        }
    },

    /* 编辑区域接收拖放图片 */
    setDragAndDropImg : function(){
        this.editor.addEventListener('dragenter',function(){
            this.addClass('hover');
            return false;
        });
        this.editor.addEventListener('dragleave',function(){
            this.removeClass('hover');
            return false;
        });
        this.editor.addEventListener('dragover',function(e){
            this.addClass('hover');
            return false;
        });
        this.editor.addEventListener('drop', function(e){
            this.removeClass('hover');
            //获取文件引用对象
            var files = e.dataTransfer.files;
            for (var i = 0; i<files.length; i++) {
                var file = files[i];

                //检查是否为图片
                var isimage = (file.type.match(/image/gi)!=null);
                if(!isimage){
                    console.log('文件格式不对');
                    return false;
                }

                if(window.FileReader) {
                    //创建readFileer
                    var fileReader = new FileReader();
                    //绑定文件读取完成事件
                    fileReader.addEventListener('loadend',function(e){
                        if(this.readyState == 2) {
                            imageParser.appendThumbImg(this.result);
                        }
                    });
                    //读取文件
                    fileReader.readAsDataURL(file);

                }
                else{
                    console.log('你的浏览器不支持FileReader');
                    return false;
                }
            }

            e.preventDefault();
            return false;
        });



    },

    /* 删除预览图 */
    setDeleteThumbImg : function(){
        this.imgList.addEventListener('click',function(e){
            if(e.target.className == 'delete-img'){
                this.removeChild(e.target.parentNode);
            }

            return false;
        });
    },

    /* 添加显示预览图 */
    appendThumbImg : function(dataStr){
        this.imgList.innerHTML += '<li><img src="'+dataStr+'" class="thumb-img"><a class="delete-img"></a></li>';
    },

    /* 扩展元素的操作类名方法 */
    extendElementClassMethod : function(){
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
    }

};