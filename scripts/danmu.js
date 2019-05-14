/**
 * 获取指定范围的随机数
 * @param {*开始} start 
 * @param {*技术} end 
 */
function Random(start, end) {
    let num = (Math.random() * (end - start) + start).toString();
    return parseInt(num, 10);
}


/**
 * 添加一个弹幕
 * @param {*内容} text 
 */
function SetBarrage(text) {
    // 创建dom并添加class 和各种数据
    var barrage = document.createElement('span');
    barrage.className = "content-barrage-single";
    barrage.innerText = text;
    document.getElementById('content-barrage').appendChild(barrage);
    // 创建弹幕从右到左面的10-15的随机秒数
    const randomTime = Random(20, 40);
    // 创建离上方的距离  百分比 现在是半屏
    const randomTop = Random(0, 50);
    barrage.style.top = randomTop + "%";
    barrage.style.animation = "barrage " + randomTime + "s linear";
    // 添加一个定时器 在运行完成之后删除这个DOM
    setTimeout(() => {
        document.getElementById('content-barrage').removeChild(barrage)
    }, randomTime * 1000);
}

// 绑定发送弹幕按钮
document.getElementById("send").onclick = function (e) {
    SetBarrage(document.getElementById("send_text").value);
}