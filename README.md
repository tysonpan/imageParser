imageParser
=========

本项目是一个javascript类，用于在富文本编辑框上绑定拖拽和粘贴图片事件，然后解析显示出来。基于drag&drop、fileReader、onpaste、getAsFile等技术，目前仅支持Chrome和Firefox浏览器。


如何使用
-------

* 在你的页面中引入imageParser.js
* 调用imageParser.init(editorId,imgListId)方法，该方法接受两个参数：editorId是编辑框的id，imgListId是用于显示图片列表的容器id，通常是一个ul标签。
* 修改类里面的appendThumbImg方法，可以自定义显示图片的方式

  just try it!


查看demo
-------

* 请访问 [tysonpan.github.io/imageParser](http://tysonpan.github.io/imageParser)


Licence
-------

* 版权所有 @tysonpan