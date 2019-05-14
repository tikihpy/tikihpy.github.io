Mudu.Init(
  // 线上频道id
  // 185053,
  // 测试服频道ID
  10003046,

  // 初始化完成的回调函数，无参数
  function () {
    console.log('Mudu Web Sdk 初始化成功')
    


    Mudu.Room.User.GetUser()
    // 需要在sdk 初始化成功后才能使用
    Mudu.Room.User.Assign('name', 'https://static.mudu.tv/index/avatar.png', '66666', function(){

    })
    // 直播间
    // 返回直播间名字，类型为string
    var roomName = Mudu.Room.GetName()

    var rName = document.getElementsByClassName('app_header');

    var description = document.createElement('p');
    description.setAttribute('id','act_name');
    var desctext = document.createTextNode('直播间：'+roomName);
    description.appendChild(desctext);
    document.getElementsByClassName('app_header')[0].appendChild(description);

   




    // 返回直播间浏览量，类型为number整数
    var roomViewNum = Mudu.Room.GetViewNum()

    var description = document.createElement('p');
    description.setAttribute('id','act_viewnum');
    var desctext = document.createTextNode('浏览量：'+roomViewNum);
    description.appendChild(desctext);
    document.getElementsByClassName('app_header')[0].appendChild(description);



    // 返回直播间视频地址，类型为string
    var roomPlayAddr = Mudu.Room.GetPlayAddr()

    var description = document.createElement('p');
    description.setAttribute('id','roomPlayAddr');
    var desctext = document.createTextNode('直播地址：'+'['+roomPlayAddr+']');
    description.appendChild(desctext);
    document.getElementsByClassName('app_header')[0].appendChild(description);





    var isChannelLiving = !!Mudu.Room.GetLiveStatus() // Mudu.Room.GetLiveStatus() 获取当前的直播状态 类型为number: `1`为正在直播，`0`为不在直播 


    // 返回直播状态，类型为number: `1`为正在直播，`0`为不在直播
    var roomLiveStatus = Mudu.Room.GetLiveStatus()
    console.log('直播间状态：',roomLiveStatus);

    if(roomLiveStatus==1){
    var description = document.createElement('p');
    description.setAttribute('id','act_status');
    var desctext = document.createTextNode('直播状态：live');
    description.appendChild(desctext);
    document.getElementsByClassName('app_header')[0].appendChild(description);



 var player = new Mudu.Player(
  {
    // 必须，播放器容器ID，播放器会被添加到该DOM元素中
    containerId: 'J_prismPlayer',

    // 播放器背景图全屏显示，视频的拉伸和背景图的拉伸属性不是分开的，默认配置都是contain，这里是自己手动添加的配置，开发文档里没有这个配置
    stretching: 'cover',

    // 非必需 boolean 控制播放器的ui展示, 默认为false; 根据播放视频的实际情况填写
    isLive: isChannelLiving,

    // 必须，播放器视频播放地址
    src: Mudu.Room.GetPlayAddr(),

    // 非必须，播放器海报图 string
    image: Mudu.Room.GetLiveImage(),

    // 已废弃该参数，请勿使用
    type: 'live',

    // 非必须，播放器是否自动播放，默认false
    autoplay: false,

    // 非必须，播放器是否显示控制条，默认true
    controls: true,

    // 非必须，播放器是否循环播放, 默认false
    // repeat: false,
    repeat: true,

    // 非必须，播放器宽度，单位为像素，默认为480
    width: 640,

    // 非必须，播放器高度，单位为像素，默认为270
    height: 360,

    // 以下x5Layer和x5Inline两个参数用于解决安卓微信、QQ、QQ浏览器的只能全屏播放的问题。参数仅对安装过tbs(腾讯浏览服务，一般安装过QQ浏览器后手机上会存在)手机生效(由于tbs的api限制，部分低版本的微信、QQ、QQ浏览器可能不会生效)，未安装tbs的安卓手机不会有只能全屏播放的问题。
    // x5Layer和x5Inline只能有一个被设置为true

    // 非必须，播放器在安卓微信、QQ、QQ浏览器中是否同层播放, 默认false  （注：同层播放时，页面document无法滚动(内部的dom元素可以)，如果播放器宽度小于浏览器宽度，两边将出现黑边）
    x5Layer: false,

    // 非必须，播放器在安卓微信、QQ、QQ浏览器中是否inline播放，默认false  （注：inline播放时，播放器始终处于z-index的最上层，因此无法在播放器上叠加元素）
    x5Inline: false,

    // 非必须 isLive为false时展示在时间进度条上的高亮点，hover时可展示text字段内容 （视频为回看视频时，会默认添加高亮信息，设置为[]可覆盖）
    highlights: [{
      time: 1, // int,
      text: '大会开始' // string
    }]
  }
);

window.player = player;





}else {
 var description = document.createElement('p');
 description.setAttribute('id','act_status');
 var desctext = document.createTextNode('直播状态：暂未开始');
 description.appendChild(desctext);
 document.getElementsByClassName('app_header')[0].appendChild(description);

 // 返回视频回看配置
 var trailer = Mudu.Room.GetTrailer()

 console.log('回看视频配置：',trailer);

var livadrr=trailer.m3u8,img = trailer.trailer_img

 if(trailer.open == true){
  
 var player = new Mudu.Player(
  {
    // 必须，播放器容器ID，播放器会被添加到该DOM元素中
    containerId: 'J_prismPlayer',

    // 播放器背景图全屏显示，视频的拉伸和背景图的拉伸属性不是分开的，默认配置都是contain，这里是自己手动添加的配置，开发文档里没有这个配置
    stretching: 'cover',

    // 非必需 boolean 控制播放器的ui展示, 默认为false; 根据播放视频的实际情况填写
    isLive: isChannelLiving,

    // 必须，播放器视频播放地址
    src: livadrr,

    // 非必须，播放器海报图 string
    image: img,

    // 已废弃该参数，请勿使用
    type: 'live',

    // 非必须，播放器是否自动播放，默认false
    autoplay: false,

    // 非必须，播放器是否显示控制条，默认true
    controls: true,

    // 非必须，播放器是否循环播放, 默认false
    // repeat: false,
    repeat: true,

    // 非必须，播放器宽度，单位为像素，默认为480
    width: 640,

    // 非必须，播放器高度，单位为像素，默认为270
    height: 360,

    // 以下x5Layer和x5Inline两个参数用于解决安卓微信、QQ、QQ浏览器的只能全屏播放的问题。参数仅对安装过tbs(腾讯浏览服务，一般安装过QQ浏览器后手机上会存在)手机生效(由于tbs的api限制，部分低版本的微信、QQ、QQ浏览器可能不会生效)，未安装tbs的安卓手机不会有只能全屏播放的问题。
    // x5Layer和x5Inline只能有一个被设置为true

    // 非必须，播放器在安卓微信、QQ、QQ浏览器中是否同层播放, 默认false  （注：同层播放时，页面document无法滚动(内部的dom元素可以)，如果播放器宽度小于浏览器宽度，两边将出现黑边）
    x5Layer: false,

    // 非必须，播放器在安卓微信、QQ、QQ浏览器中是否inline播放，默认false  （注：inline播放时，播放器始终处于z-index的最上层，因此无法在播放器上叠加元素）
    x5Inline: false,

    // 非必须 isLive为false时展示在时间进度条上的高亮点，hover时可展示text字段内容 （视频为回看视频时，会默认添加高亮信息，设置为[]可覆盖）
    highlights: [{
      time: 1, // int,
      text: '大会开始' // string
    }]
  }
);
window.player = player;



 }else{
  
  var player = new Mudu.Player(
    {
      // 必须，播放器容器ID，播放器会被添加到该DOM元素中
      containerId: 'J_prismPlayer',
  
      // 播放器背景图全屏显示，视频的拉伸和背景图的拉伸属性不是分开的，默认配置都是contain，这里是自己手动添加的配置，开发文档里没有这个配置
      stretching: 'cover',
  
      // 非必需 boolean 控制播放器的ui展示, 默认为false; 根据播放视频的实际情况填写
      isLive: isChannelLiving,
  
      // 必须，播放器视频播放地址
      src: livadrr,
  
      // 非必须，播放器海报图 string
      image: 'https://cdn13.mudu.tv/assets/upload/155646148686924.jpeg',
  
      // 已废弃该参数，请勿使用
      type: 'live',
  
      // 非必须，播放器是否自动播放，默认false
      autoplay: false,
  
      // 非必须，播放器是否显示控制条，默认true
      controls: false,
  
      // 非必须，播放器是否循环播放, 默认false
      // repeat: false,
      repeat: false,
  
      // 非必须，播放器宽度，单位为像素，默认为480
      width: 640,
  
      // 非必须，播放器高度，单位为像素，默认为270
      height: 360,
  
      // 以下x5Layer和x5Inline两个参数用于解决安卓微信、QQ、QQ浏览器的只能全屏播放的问题。参数仅对安装过tbs(腾讯浏览服务，一般安装过QQ浏览器后手机上会存在)手机生效(由于tbs的api限制，部分低版本的微信、QQ、QQ浏览器可能不会生效)，未安装tbs的安卓手机不会有只能全屏播放的问题。
      // x5Layer和x5Inline只能有一个被设置为true
  
      // 非必须，播放器在安卓微信、QQ、QQ浏览器中是否同层播放, 默认false  （注：同层播放时，页面document无法滚动(内部的dom元素可以)，如果播放器宽度小于浏览器宽度，两边将出现黑边）
      x5Layer: false,
  
      // 非必须，播放器在安卓微信、QQ、QQ浏览器中是否inline播放，默认false  （注：inline播放时，播放器始终处于z-index的最上层，因此无法在播放器上叠加元素）
      x5Inline: false,
  
      // 非必须 isLive为false时展示在时间进度条上的高亮点，hover时可展示text字段内容 （视频为回看视频时，会默认添加高亮信息，设置为[]可覆盖）
      highlights: [{
        time: 1, // int,
        text: '大会开始' // string
      }]
    }
  );
  window.player = player;
  
 }

}

    // 返回评论页数，类型为int
    var commentPage = Mudu.Room.Comment.GetPage()
    console.log('返回评论页：',commentPage);


    Mudu.Room.Comment.Send(
        // 要发送的评论文本，类型为string
        '活动很赞很给力',
      
        // 发送完成的回调函数，参数为response对象
        function (response) {
          response = JSON.parse(response)
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
      5012,

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
        console.log('新评论内容：',newComment);
        console.log(newComment.username + '发送了一条新评论: ' + newComment.message);
        

        // 添加聊天记录
        var list = document.createElement('li');
        list.setAttribute('class','msg_area');
        
        var alertcmt = document.createElement("img");
        alertcmt.setAttribute('class','img');
        alertcmt.setAttribute('src','https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2866492045,1432640156&fm=26&gp=0.jpg');
        var description = document.createElement('span');
        description.setAttribute('class','msg');
        var desctext = document.createTextNode(newComment.message);

        list.appendChild(alertcmt);
        list.appendChild(description);
        description.appendChild(desctext);

        // document.getElementsByTagName('ol')[0].appendChild(list);
        var firstLi = document.getElementsByClassName('msg_area')[0]
        if (newComment.checked==1){
            if (firstLi) {
              document.getElementsByTagName("ol")[0].insertBefore(list, firstLi);

            } else {
              document.getElementsByTagName('ol')[0].appendChild(list);
            }
        }else{
          alert('评论等待审核');
        }
      }
    );

    // 弹幕组件
    Mudu.MsgBus.On(
      // 事件名，值为"Barrage.New"
      "Barrage.New",
    
      // 事件处理函数，参数为弹幕对象
      function (barrage) {
        barrage = JSON.parse(barrage)
        // console.log('收到新的弹幕，内容为: ', barrage.text)
        console.log('收到新的弹幕，内容为: ', barrage)


        var pli = document.getElementsByClassName('barrage');

        var description = document.createElement('p');
        description.setAttribute('id','content');
        var desctext = document.createTextNode(barrage.text);
        description.appendChild(desctext);
        document.getElementsByClassName('barrage')[0].appendChild(description);

      }
      
    )




    // 抽奖组件
    Mudu.Room.LuckyDraw.Get(function (response) {
      response = JSON.parse(response)
      if (response.status === 'y') {
        console.log('获取成功，数据为：', response.data)
      }
      if (response.status === 'n') {
        console.log('获取失败')
      }
    })




    Mudu.Room.LuckyDraw.SignUp(
      {
        // 观众名，类型为string
        userName: 'xiaobaitu23',
    
        // 抽奖唯一凭证，类型为string，推荐使用手机号作为唯一凭证
        voucher: '13155818359',
      },
    
      // 回调函数，参数为response
      function (response) {
        response = JSON.parse(response)
        if (response.status === 'y') {
          console.log('抽奖报名成功')
        }
        if (response.status === 'n') {
          console.log('抽奖报名失败')
        }
      }
    )





    Mudu.Room.LuckyDraw.Result(
      // 回调函数，参数为response对象
      function (response) {
        response = JSON.parse(response)
        if (response.status === 'y') {
          console.log('获取成功，数据为：', response.data)
        }
        if (response.status === 'n') {
          console.log('获取失败')
        }
      }
    )




    Mudu.MsgBus.On(
      // 事件名，值为LuckyDraw.Open
      "LuckyDraw.Open",
    
      // 事件处理函数
      function (response) {
        var response = JSON.parse(response)
        console.log('开奖啦')
      })
      
      var signupConfig = Mudu.Room.Signup.GetConfig()
      console.log('报名问卷数据：',signupConfig);



  }
  
);

// 评论绑定事件
function sendCmt() {
  var value = document.getElementsByClassName('comment_area')[0].value;
  
  Mudu.Room.Comment.Send(
    // 要发送的评论文本，类型为string
    value || 'neirongweikong',

  
    // 发送完成的回调函数，参数为response对象
    function (response) {
      response = JSON.parse(response)
      if (response.status === 'y') {
        console.log('发送成功')
      }
      if (response.status === 'n') {
        console.log('发送失败，错误码为：' + response.flag)
      }
    }
  )
}


// 获取指定评论页数
function getPage(){
  var value = document.getElementsByClassName('page_area')[0].value;

  Mudu.Room.Comment.Get(
    // 要获取评论的页码，类型为int
    value,
    // 评论获取成功的回调函数，参数为response对象
    function (response) {
      response = JSON.parse(response)
      if (response.status === 'y') {
        // console.log('获取评论成功，数据为：', response.data)
        console.log('获取评论成功，数据为：', response)
      } 
      if (response.status === 'n'){
        console.log('获取评论失败')
      }

    // 添加自定义获取某一页聊天记录
    // for(var i=0;i<response.data.comments.length;i++){
    for(var i=response.data.comments.length-1;0<=i;i--){
      var pagelist = document.createElement('li');
      pagelist.setAttribute('class','getpage');
      var alertcmt = document.createElement("img");
      alertcmt.setAttribute('class','getavatar');
      alertcmt.setAttribute('src',response.data.comments[i].avatar);
      var description = document.createElement('span');
      description.setAttribute('class','getmsg');
      var desctext = document.createTextNode(response.data.comments[i].message);
      pagelist.appendChild(alertcmt);
      pagelist.appendChild(description);
      description.appendChild(desctext);
      // document.getElementsByTagName('ol')[1].appendChild(pagelist);
      var firstLi = document.getElementsByClassName('getpage')[0]
            if (firstLi) {
              document.getElementsByTagName("ol")[1].insertBefore(pagelist, firstLi);
            } else {
              document.getElementsByTagName('ol')[1].appendChild(pagelist);
            }   
     }
    }
  )
}

function switchVedio() {
      
  player.load([
    {
        // isLive 非必需 boolean 控制播放器的ui展示,默认为false; 根据播放视频的实际情况填写
        isLive: false,
        // file: 'https://myun-hw-s3.myun.tv/258x6zl7/5rnb4rz0/lg394145/09o8dza0_1557373313144322954_480p.m3u8',
        file: 'https://myun-hw-s3.myun.tv/melj80jz/5p3yv7x0/lxzk3kd5/lnyogj65_1557724163000226304_origin.m3u8',
        image: 'https://cdn13.mudu.tv/assets/upload/155646148686924.jpeg',
        // 非必须 isLive为false时展示在时间进度条上的高亮点，hover时可展示text字段内容 （视频为回看视频时，会默认添加高亮信息，设置为[]可覆盖）
        highlights: [{
          time: 2, // int
          text: '舞会开始' // string
        }]
      }
  ])

}

// 开始播放
function playVedio(){
  player.play();
 
}
// 暂停播放
function pauseVedio(){
  player.pause();
  
}
// 停止播放
function stopVedio(){
  player.stop();
  
}
// 直播状态
function state(){
  var state = player.getState()
  alert(state);
}
// 返回直播
function live(){
  Mudu.Room.User.GetUser()
  // 需要在sdk 初始化成功后才能使用
  Mudu.Room.User.Assign('name', 'https://static.mudu.tv/index/avatar.png', '66666', function(){})
  var isChannelLiving = !!Mudu.Room.GetLiveStatus() // Mudu.Room.GetLiveStatus() 获取当前的直播状态 类型为number: `1`为正在直播，`0`为不在直播 
  var player = new Mudu.Player(
    {
      // 必须，播放器容器ID，播放器会被添加到该DOM元素中
      containerId: 'J_prismPlayer',

      // 播放器背景图全屏显示，视频的拉伸和背景图的拉伸属性不是分开的，默认配置都是contain，这里是自己手动添加的配置，开发文档里没有这个配置
      stretching: 'cover',
  
      // 非必需 boolean 控制播放器的ui展示, 默认为false; 根据播放视频的实际情况填写
      isLive: isChannelLiving,
  
      // 必须，播放器视频播放地址
      src: Mudu.Room.GetPlayAddr(),
  
      // 非必须，播放器海报图 string
      image: Mudu.Room.GetLiveImage(),
  
      // 已废弃该参数，请勿使用
      type: 'live',
  
      // 非必须，播放器是否自动播放，默认false
      autoplay: false,
  
      // 非必须，播放器是否显示控制条，默认true
      controls: true,
  
      // 非必须，播放器是否循环播放, 默认false
      // repeat: false,
      repeat: true,
  
      // 非必须，播放器宽度，单位为像素，默认为480
      width: 640,
  
      // 非必须，播放器高度，单位为像素，默认为270
      height: 360,
  
      // 以下x5Layer和x5Inline两个参数用于解决安卓微信、QQ、QQ浏览器的只能全屏播放的问题。参数仅对安装过tbs(腾讯浏览服务，一般安装过QQ浏览器后手机上会存在)手机生效(由于tbs的api限制，部分低版本的微信、QQ、QQ浏览器可能不会生效)，未安装tbs的安卓手机不会有只能全屏播放的问题。
      // x5Layer和x5Inline只能有一个被设置为true
  
      // 非必须，播放器在安卓微信、QQ、QQ浏览器中是否同层播放, 默认false  （注：同层播放时，页面document无法滚动(内部的dom元素可以)，如果播放器宽度小于浏览器宽度，两边将出现黑边）
      x5Layer: false,
  
      // 非必须，播放器在安卓微信、QQ、QQ浏览器中是否inline播放，默认false  （注：inline播放时，播放器始终处于z-index的最上层，因此无法在播放器上叠加元素）
      x5Inline: false,
  
      // 非必须 isLive为false时展示在时间进度条上的高亮点，hover时可展示text字段内容 （视频为回看视频时，会默认添加高亮信息，设置为[]可覆盖）
      highlights: [{
        time: 1, // int,
        text: '大会开始' // string
      }]
    }
  );

  window.player = player;
}
