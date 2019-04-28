function convertToGS(img){
    // 存储原始的彩色图
    img.color = img.src;
    // 创建灰度版
    img.grayscale = createGSCanvas(img);
    // 在mouseover/out事件发生时切换图片
    img.onmouseover = function(){
        this.src = this.color;
    }
    img.onmouseout = function(){
        this.src = this.grayscale;
    }
    img.onmouseout();
}

function createGSCanvas(img){
    // 新建canvas元素
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    // 描边
    var ctx = canvas.getContext('2d');
    //图片放画布上坐标位置
    ctx.drawImage(img,0,0);
    // 复制画布上指定矩形的像素数据
    var c = ctx.getImageData(0,0,img.width,img.height);
    for (i=0;i<c.height;i++){
        for (j=0;j<c.width;j++){
            var x = (i*4)*c.width+(j*4);
            var r = c.data[x];
            var g = c.data[x+1];
            var b = c.data[x+2];
            c.data[x] = c.data[x+1] = c.data[x+2] = (r+g+b)/3 ;
            console.log("x="+x,"r="+r,"g="+g,"b="+b);
        }
    }
    // 将图像数据放回画布
    ctx.putImageData(c,0,0,0,0,c.width,c.height);
    return canvas.toDataURL();

}
window.onload = function(){
    convertToGS(document.getElementById('avatar'));
}