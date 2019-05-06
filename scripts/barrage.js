Mudu.MsgBus.On(
    // 事件名，值为"Barrage.New"
    "Barrage.New",
  
    // 事件处理函数，参数为弹幕对象
    function (barrage) {
      barrage = JSON.parse(barrage)
      console.log('收到新的弹幕，内容为: ', barrage.text)
    }
  )