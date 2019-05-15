window.onload = function(){
    var oBtn = document.getElementById("btn");
    var oText = document.getElementById("txt");
    var oScreen = document.getElementById("mainScreen");
    oBtn.onclick = sendMessage;
    // 每次点击清空输入框
    oText.onclick = function(){
        oText.value = "";
    };
    //添加回车提交事件
    document.onkeydown = function(evt){
        var event = evt || window.event;//兼容IE
        if(event.keyCode == 13){
            sendMessage();
        }
    };

    function sendMessage(){
        //如果输入为空则弹出对话框
        if(oText.value.trim() == ""){
            alert("请正确输入");
        }
        else{
        //如果有输入则动态创建span并将内容添加到span中，然后再将span添加到mainScreen中
            var oDan1 = document.createElement("span");
            oDan1.innerText = oText.value;
            
            // 定义随机字体大小
            var oFontSize  = parseInt(Math.random()*16+16);
            // 创建随机颜色
            var oFontColor =  '#'+Math.floor(Math.random()*16777215).toString(16);
            // 随机高度
            var oMax = oScreen.offsetHeight - oFontSize;
            var oMin = oScreen.offsetTop;
            var oHeight = Math.floor(Math.random() * (oMax-oMin) + oMin);

            oDan1.style.color = oFontColor;
            oDan1.style.fontSize = oFontSize + "px";
            oDan1.style.marginTop = oHeight + "px";

            // Move
            var variable = 800; //800是mainScreen的宽度，也可写成：oDan1.offsetLeft
             var timer = setInterval(function () {
                oDan1.style.marginLeft = variable + "px";
            //如果没有超出边界就将span动态添加到oScreen
                if (variable > -oDan1.offsetWidth){
                    variable-=2;
                    oScreen.appendChild(oDan1);
                }
                else {
                    clearInterval(timer);
                    // 当显示超出范围就删除节点，这里我之前用display:none不管用
                    oDan1.parentNode.removeChild(oDan1);
                }
            }, 1);
        }
    }
}