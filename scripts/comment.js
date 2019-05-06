// 返回评论页数，类型为int
var commentPage = Mudu.Room.Comment.GetPage()
Mudu.Room.Comment.Send(
    // 要发送的评论文本，类型为string
    '活动很赞很给力',
  
    // 发送完成的回调函数，参数为response对象
    function (response) {
      if (response.status === 'y') {
        console.log('发送成功')
      }
      if (response.status === 'n') {
        console.log('发送失败，错误码为：' + response.flag)
      }
    }
  )

  Mudu.Room.Comment.Get(
    // 要获取评论的页码，类型为int
    2,
  
    // 评论获取成功的回调函数，参数为response对象
    function (response) {
      response = JSON.parse(response)
      if (response.status === 'y') {
        console.log('获取评论成功，数据为：', response.data)
      } 
      if (response.status === 'n'){
        console.log('获取评论失败')
      }
    }
  )

  Mudu.MsgBus.On(
    // 事件名，值为Comment.New
    'Comment.New', 
  
    // 事件处理函数，参数为新的评论，类型为object
    function (newComment) {
      newComment = JSON.parse(newComment)
      console.log(newComent.username + '发送了一条新评论: ' + newComment.message)
    }
  )

    //元素添加点击事件
    $(".comment_btn").bind('click', () => {
    var $dom = $(".comment_area");
    if ($.trim($dom.val()) == "") {
        return;
    }
    //发送评论
    Mudu.Room.Comment.Send($dom.val(), () => {
        $dom.val('');
    });
});