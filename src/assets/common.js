/**
 *
 * 通用js方法
 *
**/
import imgApi from '../api/imgApi'

// 给编辑器添加事件监听
var editorEvent = function editorEvent (el) {
    // 为 <textarea> 元素绑定粘贴事件事件 ,程序将粘贴事件绑定到 pasteTarget 上
    el.addEventListener('paste', function(e) {
        // 添加到事件对象中的访问系统剪贴板的接口
        var elChildTEXT = this.children.innerTEXT;
        var cbd = e.clipboardData;
        var ua = window.navigator.userAgent;
        // 如果是 Safari 直接 return
        if (!(e.clipboardData && e.clipboardData.items)) {
            return;
        }

        // Mac平台下Chrome49版本以下 复制Finder中的文件的Bug Hack掉
        if (cbd.items && cbd.items.length === 2 && cbd.items[0].kind === "string" && cbd.items[1].kind === "file" &&
            cbd.types && cbd.types.length === 2 && cbd.types[0] === "text/plain" && cbd.types[1] === "Files" &&
            ua.match(/Macintosh/i) && Number(ua.match(/Chrome\/(\d{2})/i)[1]) < 49) {
            return;
        }

        var blob = null;
        for (var i = 0; i < cbd.items.length; i++) {
            var item = cbd.items[i];

            // 判断是否为图片数据
            if (item && item.kind === 'file' && item.type.match(/^image\//i)) {
                blob = item.getAsFile();
                if (blob.size === 0) {
                    return;
                }
            }
        }

        if (blob !== null && blob != undefined) {
            var extension = blob.type.match(/\/([a-z0-9]+)/i)[1].toLowerCase(); // 后缀名

            // 利用FormData对象模拟一个完整的表单,然后送这个"表单".
            var fd = new FormData();
            fd.append('file', blob, "paste." + extension);

            var _this = this
            imgApi.addMdImgs(fd)
              .then(function (res) {
                if (res.data.code == 1) {
                  console.log(elChildTEXT + res.data.result.wmdImgUrl)
                  _this.children.innerTEXT = elChildTEXT + res.data.result.wmdImgUrl
                }
              })
        }
    }, false);

    //  当拖拽元素进入放置区域时由放置元素频繁触发的事件
    el.addEventListener('dragover', function(e) {
        // 阻止默认事件的触发
        e.preventDefault();
    }, false);

    // 当拖拽元素在放置区域放置时由放置元素触发的事件
    el.addEventListener('drop', function(e) {
        // 阻止默认事件的触发
        e.preventDefault();

        // 获取文件对象
        var fileList = e.dataTransfer.files;
        // 检测是否是拖拽文件到页面的操作
        if (fileList.length == 0) {
            return false;
        }

        // 检测文件是不是图片
        if (fileList[0].type.indexOf('image') === -1) {
            // toastr.warning('您拖放的不是图片 ');
            return false;
        }

        var fd = new FormData();
        fd.append('files', fileList[0]);

    }, false);
}

export default {
  editorEvent
}
