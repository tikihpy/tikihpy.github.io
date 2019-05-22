
Mudu.Init(
  // 线上频道id
  // 185053,
  // 测试服频道ID
  10003046,
  // 10003171,
  // 测试服子账号
  // 10003145,


  // 初始化完成的回调函数，无参数
  function () {
    console.log('Mudu Web Sdk 初始化成功')


  // 获取当前webSDK版本，返回string， 如: 1.2.1
    var version = Mudu.GetVersion();
    console.log('当前WebSDK版本：'+version);
    var description = document.createElement('p');
    description.setAttribute('id','version');
    var desctext = document.createTextNode('当前WebSDK版本：'+version);
    description.appendChild(desctext);
    document.getElementsByClassName('websdk-version')[0].appendChild(description);

    Mudu.Room.User.GetUser()
    // 需要在sdk 初始化成功后才能使用
    Mudu.Room.User.Assign('=。=【WebSDK】', 'https://static.mudu.tv/index/avatar.png', '66666', function(){

    })
    // 直播间
    // 返回直播间名字，类型为string
    var roomName = Mudu.Room.GetName()
    // var rName = document.getElementsByClassName('app_header');
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

    // 返回直播间视频地址列表，类型为array
    var roomPlayAddr = Mudu.Room.GetPlayList()
    console.log('直播间视频地址列表'+roomPlayAddr);

    // 返回视频回看配置
    var trailer = Mudu.Room.GetTrailer()
    console.log('视频回看配置'+trailer);

    // 返回直播间自定义菜单, 类型为Array
    var menus = Mudu.Room.GetMenus()
    console.log('直播间自定义菜单'+menus);

    // 返回直播间自定义广告栏, 类型为Array
    var ads = Mudu.Room.GetBanners();
    console.log('直播间自定义广告栏'+ads);

    // 返回直播间主题名称, 类型为string： 目前有两个值(default, tech)
    var activeTheme = Mudu.Room.GetActiveTheme()
    console.log('直播间主题名称'+activeTheme);

    // 返回直播间主题配置，类型为Array
    var themes = Mudu.Room.GetThemes()
    console.log('直播间主题配置'+themes);




    // Room.StreamEvent事件会在直播流状态改变时(通常是后台开始直播或者关闭直播)被触发
    Mudu.MsgBus.On(
      // 事件名，值为Room.StreamEvent
      'Room.StreamEvent',
  
      // 事件处理函数，参数类型为object
      function (data) {
          data = JSON.parse(data)
  
          var msg = data.event == 1 ? '开始直播' : '停止直播'
          console.log(msg)
          console.log(data)
      }
  )

  Mudu.MsgBus.On(
    // 事件名，值为Player.Play
    'Player.Play', 
  
    // 事件处理函数，参数为当前player组件对象
    function (player) {
      console.log('Mudu Player 播放开始')
    }
  )

 
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
  console.log('没有在直播');
 var description = document.createElement('p');
 description.setAttribute('id','act_status');
 var desctext = document.createTextNode('直播状态：暂未开始');
 description.appendChild(desctext);
 document.getElementsByClassName('app_header')[0].appendChild(description);
  
 
 // 返回视频回看配置
  var trailer = Mudu.Room.GetTrailer()

 console.log('回看视频配置：',trailer);

  if(trailer.open ==true){

  
  var livadrr=trailer.m3u8,img = trailer.trailer_img
  console.log('回看视频地址：',livadrr);

 var player = new Mudu.Player(
  {
    // 必须，播放器容器ID，播放器会被添加到该DOM元素中
    containerId: 'J_prismPlayer',

    // 播放器背景图全屏显示，视频的拉伸和背景图的拉伸属性不是分开的，默认配置都是contain，这里是自己手动添加的配置，开发文档里没有这个配置
    stretching: 'cover',

    // 非必需 boolean 控制播放器的ui展示, 默认为false; 根据播放视频的实际情况填写
    // isLive: isChannelLiving,

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
      // isLive: isChannelLiving,
  
      // 必须，播放器视频播放地址
      src: 'https://myun-hw-s3.myun.tv/melj80jz/53rv86a5/0eybmjal/5zzdnnm5_1557998515953928753_480p.m3u8',
  
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

// PPT组件

// IsOpen 获取控制台是否开启显示PPT
// 返回boolean, true为开启, false为关闭
var isOpen = Mudu.Room.PPT.IsOpen()
console.log('是否开启显示PPT:'+isOpen);

if (isOpen==true){
    var description = document.createElement('button');
    description.setAttribute('class','ppt-btn');
    description.setAttribute('onclick','openppt()');
    var desctext = document.createTextNode('ppt-on');
    description.appendChild(desctext);
    document.getElementsByClassName('ppt_wrap')[0].appendChild(description);

}

// PPT.Changed事件会在控制台进行ppt翻页时触发
Mudu.MsgBus.On('PPT.Changed', function (response) {
    response = JSON.parse(response)
    console.log(response)
})

// PPT.IsOpen事件会在控制台切换ppt“观看页显示”时被触发
Mudu.MsgBus.On('PPT.IsOpen', function (response) {
    response = JSON.parse(response)
    console.log('观看页显示:'+response)
})

// PPT.AllowTurnPage事件会在控制台切换ppt“允许用户翻页”时被触发
Mudu.MsgBus.On('PPT.AllowTurnPage', function (response) {
    response = JSON.parse(response)
    console.log('允许用户翻页:'+response)
})

// PPT.Doc.delete事件会在控制台删除当前ppt时被触发
Mudu.MsgBus.On('PPT.Doc.delete', function () {
    // 无参数
    console.log('ppt被删了');
    alert('ppt被删了');
})

// PPT.trailer.changed 事件会在播放器播放回看视频时, 当前视频节点上有ppt时被触发
Mudu.MsgBus.On('PPT.trailer.changed', function (data) {
    var ppt_url = data.currentUrl
    console.log('当前视频节点的ppt图片地址是', ppt_url)
})

//投票组件

Mudu.Room.Vote.Get(function (response) {
  response = JSON.parse(response)
  if (response.status === 'y') {
    console.log('投票获取成功，数据为：', response.data);
  }
  if (response.status === 'n') {
    console.log('投票获取失败');
  }
})


Mudu.MsgBus.On(
  // 事件名，值为Vote.Changed
  "Vote.Changed",

  // 事件处理函数
  function (response) {
    var response = JSON.parse(response)
    console.log('投票状态改变');
    console.log(response.data);
    console.log(response.data.view_enable);


    if(response.data.view_enable=='1'){

      var description = document.createElement('button');
      description.setAttribute('class','vote-btn');
      description.setAttribute('onclick','openvote()');
      var desctext = document.createTextNode('vote-on');
      description.appendChild(desctext);
      document.getElementsByClassName('vote')[0].appendChild(description);


    }else{
      document.getElementsByClassName('vote')[0].removeChild(description);
    }




  })

  Mudu.Room.Vote.Get(function (response) {
    response = JSON.parse(response)
    if (response.status === 'y') {
      console.log('投票获取成功，数据为：', response.data)



      if(response.data.view_enable=='1'){

        var description = document.createElement('button');
        description.setAttribute('class','vote-btn');
        description.setAttribute('onclick','openvote()');
        var desctext = document.createTextNode('vote-on');
        description.appendChild(desctext);
        document.getElementsByClassName('vote')[0].appendChild(description);
  
  
      }
  
    }
    if (response.status === 'n') {
      console.log('获取失败')
    }
  })


// 话题互动组件


// 返回number
var pages = Mudu.Room.Topic.GetPage()
console.log('话题互动总页数：'+pages);
document.getElementsByClassName('allpages')[0].innerHTML="话题互动总页数："+pages;


// 返回boolean, true为允许, false为不允许
var isAllowPublish = Mudu.Room.Topic.GetAllowPublish()
console.log('是否允许发布：'+isAllowPublish);



// 返回boolean, true为允许, false为不允许
var isAllowReply = Mudu.Room.Topic.GetAllowReply()
console.log('是否允许回复：'+isAllowReply);



// 返回boolean, true为需要审核, false为不需要审核
var isNeedsCheck = Mudu.Room.Topic.GetNeedsCheck()
console.log('是否需要审核：'+isNeedsCheck);









// 第一个参数类型为object, 其中topicId为需要回复的话题id, msg为观众的回复内容
Mudu.Room.Topic.SendReply(
  {
      topicId: 4116,
      msg: '听说云导播台能做实时字幕，是真的吗'
  },
  function (response) {
      response = JSON.parse(response)
      console.log(response)
  }
)



// Topic.AllowPublish事件会在控制台话题设置->允许观众发表切换时被触发

Mudu.MsgBus.On(
    // 事件名，值为Topic.AllowPublish
    'Topic.AllowPublish', 

    // 事件处理函数，参数类型为boolean, true表示允许发表, false表示不允许发表
    function (isAllowPublish) {

    }
)


// Topic.AllowReply事件会在控制台话题设置->允许观众回复切换时被触发

Mudu.MsgBus.On(
    // 事件名，值为Topic.AllowReply
    'Topic.AllowReply', 

    // 事件处理函数，参数类型为boolean, true表示允许回复, false表示不允许回复
    function (isAllowReply) {

      isAllowReply = JSON.parse(isAllowReply)

      console.log('----------------------------->'+isAllowReply);

      if(isAllowReply == false){

      alert('不允许回复');


      }else{
        alert('开启回复');

      }

    }
)



// Topic.NeedsCheck事件会在控制台话题设置->发送内容需要审核切换时被触发

Mudu.MsgBus.On(
    // 事件名，值为Topic.NeedsCheck
    'Topic.NeedsCheck', 

    // 事件处理函数，参数类型为boolean, true表示需要审核, false表示不需要审核
    function (isNeedsCheck) {

    }
)


// Topic.New事件会在收到新的话题时被触发

Mudu.MsgBus.On(
    // 事件名，值为Topic.New
    'Topic.New', 

    // 事件处理函数，参数为新收到的topic
    function (topic) {
        topic = JSON.parse(topic)
        console.log(topic)
    }
)


// Topic.Top事件会在话题被置顶或者需要置顶的时候被触发

Mudu.MsgBus.On(
    // 事件名，值为Topic.Top
    'Topic.Top', 

    // 事件处理函数，参数为被置顶或者取消置顶的topic
    function (topic) {
        topic = JSON.parse(topic)
        console.log(topic)
    }
)

// Topic.Reply.New事件会在收到新的回复时被触发

Mudu.MsgBus.On(
    // 事件名，值为Topic.Reply.New
    'Topic.Reply.New', 

    // 事件处理函数，参数为新收到的reply
    function (reply) {
        reply = JSON.parse(reply)
        console.log(reply)
    }
)


















    // 返回评论页数，类型为int
    var commentPage = Mudu.Room.Comment.GetPage()
    console.log('返回评论页：',commentPage);

    var description = document.createElement('span');
    description.setAttribute('class','number');
    var desctext = document.createTextNode('页面总数：'+commentPage + '页');
    description.appendChild(desctext);
    document.getElementsByClassName('allpage')[0].appendChild(description);


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

        var description = document.createElement('p');
        description.setAttribute('class','content');
        var desctext = document.createTextNode(barrage.text);
        description.appendChild(desctext);
        document.getElementsByClassName('barrage')[0].appendChild(description);

        // 获取指定范围的随机数
        function Random(start, end) {
          let num = (Math.random() * (end - start) + start).toString();
          return parseInt(num, 10);
        }
        // 创建弹幕从右到左面的10-15的随机秒数
        const randomTime = Random(10, 20);
        // 创建离上方的距离  百分比 现在是半屏
        const randomTop = Random(0, 70);
        description.style.top = randomTop + "%";
        description.style.animation = "barrage " + randomTime + "s linear";
        // 添加一个定时器 在运行完成之后删除这个DOM
        setTimeout(() => {
          document.getElementsByClassName('barrage')[0].removeChild(description)
      }, randomTime * 1000);
      } 
    )

    // 抽奖组件
    Mudu.Room.LuckyDraw.Get(
      function (response) {
      response = JSON.parse(response)
      if (response.status === 'y') {
        console.log('抽奖获取成功，数据为：', response.data);
      }
      if (response.status === 'n') {
        console.log('抽奖获取失败')
      }
      var lucky = document.getElementById('lucky_award_name')
      var luckytime = document.getElementById('lucky_deadline')
      lucky.innerHTML=response.data.lucky_draw.award_name;
      luckytime.innerHTML=response.data.lucky_draw.deadline;
    }   
    )   

    // 返回null获取报名问卷配置, 类型为object
      var signupConfig = Mudu.Room.Signup.GetConfig()
      console.log('报名问卷数据：',signupConfig);
      console.log(signupConfig.columns);
      for(var i=0;i<signupConfig.columns.length;i++){
        console.log(signupConfig.columns[i].type);

        if(signupConfig.columns[i].type=="nickname"){
          console.log('判断打印nickname');

          
          var listdiv = document.createElement('div');
          listdiv.setAttribute('class','listdiv');
          var description = document.createElement('p');
          description.setAttribute('class','column-content');
          var desctext = document.createTextNode(signupConfig.columns[i].name);
          listdiv.appendChild(description);
          description.appendChild(desctext);
          document.getElementsByClassName('signup-column-box')[0].appendChild(listdiv);

          if (signupConfig.columns[i].type=="nickname"){
          var inputtext = document.createElement('input');
          inputtext.setAttribute('class','nickname');
          listdiv.appendChild(inputtext);
          }else if(signupConfig.columns[i].type=="phone"){
            var inputtext = document.createElement('input');
            inputtext.setAttribute('class','phone');
            listdiv.appendChild(inputtext);
              }else if(signupConfig.columns[i].type=="input"){
                var inputtext = document.createElement('input');
                inputtext.setAttribute('class','input-content');
                listdiv.appendChild(inputtext);
                }else if(signupConfig.columns[i].type=="textarea"){
                  var inputtext = document.createElement('input');
                  inputtext.setAttribute('class','textarea');
                  listdiv.appendChild(inputtext);
                  }else if(signupConfig.columns[i].type=="question"){
                    var inputtext = document.createElement('input');
                    inputtext.setAttribute('class','question');
                    listdiv.appendChild(inputtext);
                    }else if(signupConfig.columns[i].type=="questionAnswer"){
                      var inputtext = document.createElement('input');
                      inputtext.setAttribute('class','questionAnswer');
                      listdiv.appendChild(inputtext);
                      }

        }else if(signupConfig.columns[i].type=="phone"){
          console.log('判断打印phone');

          var listdiv = document.createElement('div');
          listdiv.setAttribute('class','listdiv');
          var description = document.createElement('p');
          description.setAttribute('class','column-content');
          var desctext = document.createTextNode(signupConfig.columns[i].name);
          listdiv.appendChild(description);
          description.appendChild(desctext);
          document.getElementsByClassName('signup-column-box')[0].appendChild(listdiv);

          if (signupConfig.columns[i].type=="nickname"){
            var inputtext = document.createElement('input');
            inputtext.setAttribute('class','nickname');
            listdiv.appendChild(inputtext);
            }else if(signupConfig.columns[i].type=="phone"){
              var inputtext = document.createElement('input');
              inputtext.setAttribute('class','phone');
              listdiv.appendChild(inputtext);


              // 是否发送验证码
              var sendsms = signupConfig.send_sms;
              console.log(sendsms);
              
              if(sendsms == 1){
              // 点击发送验证码按钮
              var outdiv = document.createElement('div');
              outdiv.setAttribute('class','outdiv');
              var yzmbutton = document.createElement('button');
              yzmbutton.setAttribute('class','sendsms-btn');
              yzmbutton.setAttribute('onclick','sendsigndata()');
              var desctext = document.createTextNode('发送验证码');
              outdiv.appendChild(yzmbutton);
              listdiv.appendChild(outdiv);
              yzmbutton.appendChild(desctext);

              // 验证码输入模块
              var outdiv = document.createElement('div');
              outdiv.setAttribute('class','outdiv'); 
              var smstag = document.createElement('p');
              smstag.setAttribute('class','sendsms');
              var desctext = document.createTextNode('验证码');
              outdiv.appendChild(smstag);
              listdiv.appendChild(outdiv);
              smstag.appendChild(desctext);
              var outdiv = document.createElement('div');
              outdiv.setAttribute('class','outdiv');
              var smsinput = document.createElement('input');
              smsinput.setAttribute('class','input-content');
              outdiv.appendChild(smsinput);
              listdiv.appendChild(outdiv);

              }

                }else if(signupConfig.columns[i].type=="input"){
                  var inputtext = document.createElement('input');
                  inputtext.setAttribute('class','input-content');
                  listdiv.appendChild(inputtext);
                  }else if(signupConfig.columns[i].type=="textarea"){
                    var inputtext = document.createElement('input');
                    inputtext.setAttribute('class','textarea');
                    listdiv.appendChild(inputtext);
                    }else if(signupConfig.columns[i].type=="question"){
                      var inputtext = document.createElement('input');
                      inputtext.setAttribute('class','question');
                      listdiv.appendChild(inputtext);
                      }else if(signupConfig.columns[i].type=="questionAnswer"){
                        var inputtext = document.createElement('input');
                        inputtext.setAttribute('class','questionAnswer');
                        listdiv.appendChild(inputtext);
                        }


        }else if(signupConfig.columns[i].type=="input"){
          console.log('判断打印input');

          var listdiv = document.createElement('div');
          listdiv.setAttribute('class','listdiv');
          var description = document.createElement('p');
          description.setAttribute('class','column-content');
          var desctext = document.createTextNode(signupConfig.columns[i].name);
          listdiv.appendChild(description);
          description.appendChild(desctext);
          document.getElementsByClassName('signup-column-box')[0].appendChild(listdiv);

          if (signupConfig.columns[i].type=="nickname"){
            var inputtext = document.createElement('input');
            inputtext.setAttribute('class','nickname');
            listdiv.appendChild(inputtext);
            }else if(signupConfig.columns[i].type=="phone"){
              var inputtext = document.createElement('input');
              inputtext.setAttribute('class','phone');
              listdiv.appendChild(inputtext);
                }else if(signupConfig.columns[i].type=="input"){
                  var inputtext = document.createElement('input');
                  inputtext.setAttribute('class','input-content');
                  listdiv.appendChild(inputtext);
                  }else if(signupConfig.columns[i].type=="textarea"){
                    var inputtext = document.createElement('input');
                    inputtext.setAttribute('class','textarea');
                    listdiv.appendChild(inputtext);
                    }else if(signupConfig.columns[i].type=="question"){
                      var inputtext = document.createElement('input');
                      inputtext.setAttribute('class','question');
                      listdiv.appendChild(inputtext);
                      }else if(signupConfig.columns[i].type=="questionAnswer"){
                        var inputtext = document.createElement('input');
                        inputtext.setAttribute('class','questionAnswer');
                        listdiv.appendChild(inputtext);
                        }


        }else if(signupConfig.columns[i].type=="textarea"){
          console.log('判断打印textarea');

          var listdiv = document.createElement('div');
          listdiv.setAttribute('class','listdiv');
          var description = document.createElement('p');
          description.setAttribute('class','column-content');
          var desctext = document.createTextNode(signupConfig.columns[i].name);
          listdiv.appendChild(description);
          description.appendChild(desctext);
          document.getElementsByClassName('signup-column-box')[0].appendChild(listdiv);

          if (signupConfig.columns[i].type=="nickname"){
            var inputtext = document.createElement('input');
            inputtext.setAttribute('class','nickname');
            listdiv.appendChild(inputtext);
            }else if(signupConfig.columns[i].type=="phone"){
              var inputtext = document.createElement('input');
              inputtext.setAttribute('class','phone');
              listdiv.appendChild(inputtext);
                }else if(signupConfig.columns[i].type=="input"){
                  var inputtext = document.createElement('input');
                  inputtext.setAttribute('class','input-content');
                  listdiv.appendChild(inputtext);
                  }else if(signupConfig.columns[i].type=="textarea"){
                    var inputtext = document.createElement('input');
                    inputtext.setAttribute('class','textarea');
                    listdiv.appendChild(inputtext);
                    }else if(signupConfig.columns[i].type=="question"){
                      var inputtext = document.createElement('input');
                      inputtext.setAttribute('class','question');
                      listdiv.appendChild(inputtext);
                      }else if(signupConfig.columns[i].type=="questionAnswer"){
                        var inputtext = document.createElement('input');
                        inputtext.setAttribute('class','questionAnswer');
                        listdiv.appendChild(inputtext);
                        }


        }else if(signupConfig.columns[i].type=="question"){
          console.log('判断打印question');

          var listdiv = document.createElement('ul');
          listdiv.setAttribute('class','listdiv');
          var description = document.createElement('li');
          description.setAttribute('class','column-content');
          var desctext = document.createTextNode(signupConfig.columns[i].name);
          listdiv.appendChild(description);
          description.appendChild(desctext);
          document.getElementsByClassName('signup-column-box')[0].appendChild(listdiv);

          if (signupConfig.columns[i].type=="nickname"){
            var inputtext = document.createElement('input');
            inputtext.setAttribute('class','nickname');
            listdiv.appendChild(inputtext);
            }else if(signupConfig.columns[i].type=="phone"){
              var inputtext = document.createElement('input');
              inputtext.setAttribute('class','phone');
              listdiv.appendChild(inputtext);
                }else if(signupConfig.columns[i].type=="input"){
                  var inputtext = document.createElement('input');
                  inputtext.setAttribute('class','input-content');
                  listdiv.appendChild(inputtext);
                  }else if(signupConfig.columns[i].type=="textarea"){
                    var inputtext = document.createElement('input');
                    inputtext.setAttribute('class','textarea');
                    listdiv.appendChild(inputtext);
                    }else if(signupConfig.columns[i].type=="question"){

                      var multi_select =signupConfig.columns[i].multi_select
                      console.log(multi_select);
                    if (multi_select==1){
                      //单选项
                      console.log(signupConfig.columns[i].options);
                      var options = signupConfig.columns[i].options;
                      // 遍历返回选项
                      for(var x in options){
                        // 获取返回选项对象及属性
                        var option = x + ':' + options[x];
                        console.log(option);
                        //添加选项栏
                        var opt=document.createElement('div');
                        opt.setAttribute('class','question');
                        // 添加选项按钮
                        var radio =document.createElement('span');
                        var inputtext = document.createElement('input');
                        inputtext.setAttribute('class','input-content-radio');
                        inputtext.setAttribute('type','radio');
                        // 添加name属性，name 属性定义的单选按钮组 (具有相同名称的单选按钮 属于同一组)
                        inputtext.setAttribute('name','radio-'+i);
                        radio.appendChild(inputtext);
                        opt.appendChild(radio);
                        // 添加选项内容
                        var inputoption = document.createElement('span');
                        inputoption.setAttribute('class','inputoption');
                        var optiondata = document.createTextNode(option);
                        inputoption.appendChild(optiondata);
                        opt.appendChild(inputoption);
                        // 添加选项栏目到上级
                        listdiv.appendChild(opt);

                       }
                    }else if (multi_select>1){
                      // 多选
                      for(var x in options){
                        // 获取返回选项对象及属性
                        var option = x + ':' + options[x];
                        console.log(option);
                        //添加选项栏
                        var opt=document.createElement('div');
                        opt.setAttribute('class','opt');
                        // 添加选项按钮
                        var radio =document.createElement('span');
                        var inputtext = document.createElement('input');
                        inputtext.setAttribute('class','input-content-radio');
                        inputtext.setAttribute('type','checkbox');
                        // 添加name属性，name 属性定义的单选按钮组 (具有相同名称的单选按钮 属于同一组)
                        inputtext.setAttribute('name','radio-'+i);
                        radio.appendChild(inputtext);
                        opt.appendChild(radio);
                        // 添加选项内容
                        var inputoption = document.createElement('span');
                        inputoption.setAttribute('class','inputoption');
                        var optiondata = document.createTextNode(option);
                        inputoption.appendChild(optiondata);
                        opt.appendChild(inputoption);
                        // 添加选项栏目到上级
                        listdiv.appendChild(opt);

                       }
                    }

                    // 添加允许填写答案框
                    var allowfill =signupConfig.columns[i].allow_fill_by_self;
                    console.log(allowfill);
                    if(allowfill == true){
                      var optallowfill=document.createElement('div');
                      optallowfill.setAttribute('class','optallowfill');
                      var optallowfillinput = document.createElement('input');
                      optallowfillinput.setAttribute('class','input-content');
                      optallowfill.appendChild(optallowfillinput);
                      listdiv.appendChild(optallowfill);
                    }
                      }else if(signupConfig.columns[i].type=="questionAnswer"){
                        var inputtext = document.createElement('input');
                        inputtext.setAttribute('class','questionAnswer');
                        listdiv.appendChild(inputtext);
                        }


        }else if(signupConfig.columns[i].type=="questionAnswer"){
          console.log('判断打印questionAnswer');

          var listdiv = document.createElement('ul');
          listdiv.setAttribute('class','listdiv');
          var description = document.createElement('li');
          description.setAttribute('class','column-content');
          var desctext = document.createTextNode(signupConfig.columns[i].name);
          listdiv.appendChild(description);
          description.appendChild(desctext);
          document.getElementsByClassName('signup-column-box')[0].appendChild(listdiv);

          if (signupConfig.columns[i].type=="nickname"){
            var inputtext = document.createElement('input');
            inputtext.setAttribute('class','nickname');
            listdiv.appendChild(inputtext);
            }else if(signupConfig.columns[i].type=="phone"){
              var inputtext = document.createElement('input');
              inputtext.setAttribute('class','phone');
              listdiv.appendChild(inputtext);
                }else if(signupConfig.columns[i].type=="input"){
                  var inputtext = document.createElement('input');
                  inputtext.setAttribute('class','input-content');
                  listdiv.appendChild(inputtext);
                  }else if(signupConfig.columns[i].type=="textarea"){
                    var inputtext = document.createElement('input');
                    inputtext.setAttribute('class','textarea');
                    listdiv.appendChild(inputtext);
                    }else if(signupConfig.columns[i].type=="question"){
                      var inputtext = document.createElement('input');
                      inputtext.setAttribute('class','question');
                      listdiv.appendChild(inputtext);
                      }else if(signupConfig.columns[i].type=="questionAnswer"){
                        var inputtext = document.createElement('input');
                        inputtext.setAttribute('class','questionAnswer');
                        listdiv.appendChild(inputtext);
                        }
        }
 
      }
      // 添加报名提交按钮
        var signsubmit = document.createElement('button');
        signsubmit.setAttribute('class','signsubmit-btn');
        signsubmit.setAttribute('onclick','signclose();Submitdata()');
        var desctext = document.createTextNode('提交');
        signsubmit.appendChild(desctext);
        document.getElementsByClassName('signup-column-box')[0].appendChild(signsubmit);
  }
);

// 评论绑定事件
function sendCmt() {
  var value = document.getElementsByClassName('comment_area')[0].value;
  if (value==''){
    alert('内容不能为空！')
  }else{
    Mudu.Room.Comment.Send(
      // 要发送的评论文本，类型为string
      value ,
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
}
// 清空评论输入框内容
function clearcomment(){
  document.getElementsByClassName('comment_area')[0].value='';
}


// 获取指定评论页数
function getPage(){
  var value = document.getElementsByClassName('page_area')[0].value;
  if (value==''){
    alert('请输入页码！')
  }else{
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
}

// 清空页面输入框内容
function clearpage(){
  document.getElementsByClassName('page_area')[0].value='';
}

//切换视频
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

//抽奖报名弹窗
function OpenDiv(){       
  document.getElementById("setdata").style.display="block"; 
}
  
// 给div层中的关闭添加onclick事件：
function CloseDiv(){ 
document.getElementById("setdata").style.display="none";
}

//添加抽奖报名信息
function signuplucky(){
    var uname = document.getElementsByClassName('uname')[0].value;
    var voucher = document.getElementsByClassName('phone')[0].value;
    Mudu.Room.LuckyDraw.SignUp(
      {
        // 观众名，类型为string
        userName: uname,
        // 抽奖唯一凭证，类型为string，推荐使用手机号作为唯一凭证
        voucher: voucher,
      },
      // 回调函数，参数为response
      function (response) {
        response = JSON.parse(response)
        if (response.status === 'y') {
          console.log('抽奖报名成功',response);
          alert(response.info);
        }
        if (response.status === 'n') {
          console.log('抽奖报名失败',response);
          alert(response.info);
        } 
      }
    )
  }

// 获取抽奖结果
function getluckyResult(){
  Mudu.Room.LuckyDraw.Result(
    // 回调函数，参数为response对象
    function (response) {
      response = JSON.parse(response)
      if (response.status === 'y') {
        console.log('抽奖结果获取成功，数据为：', response.data)
          var alllist = document.createElement('ol');
          alllist.setAttribute('class','allluckers');
          for(var i=0;i<response.data.luckers.length;i++){
          var pagelist = document.createElement('li');
          pagelist.setAttribute('class','luckers');
          var description = document.createElement('span');
          description.setAttribute('class','luckersphone');
          var desctext = document.createTextNode(response.data.luckers[i].voucher);
          alllist.appendChild(pagelist);
          pagelist.appendChild(description);
          description.appendChild(desctext);
        }
        document.getElementsByClassName('ollist')[0].appendChild(alllist);
      }
      if (response.status === 'n') {
        console.log('抽奖结果获取失败')
        alert(response.info);
      }
    }
  )
}
//抽奖结果弹窗
function Openresult(){       
  document.getElementsByClassName("resultpage")[0].style.display="block"; 
  // document.getElementById("resultpage").style.display="block"; 
}
function Closeresult(){ 
document.getElementsByClassName("resultpage")[0].style.display="none";
// document.getElementById("resultpage").style.display="none";
document.getElementsByClassName('ollist')[0].innerHTML='';
}

Mudu.MsgBus.On(
    // 事件名，值为LuckyDraw.Open
    "LuckyDraw.Open",
  
    // 事件处理函数
    function (response) {
      var response = JSON.parse(response)
      console.log('开奖啦');
      console.log(response);
      alert('开奖了！！！请点击【结果】按钮获取获奖名单！！！！！');
    })

//榜单报名问卷弹窗开启关闭
function signopen(){
  document.getElementsByClassName('signup-all')[0].style.display="block";
}
function signclose(){
  document.getElementsByClassName('signup-all')[0].style.display="none";
}

// 绑定发送短信验证码
function sendsigndata(){
  var value = document.getElementsByClassName('smsinput')[0].value;
    // 第一个参数为手机号，第二个参数为发送成功或失败的回调函数
    Mudu.Room.Signup.SendSms(
      value,
      function (response) {
          response = JSON.parse(response)
          console.log(response)
      }
    )
  }


// 提交报名问卷资料
function Submitdata(){

  // 第一个参数为一个对象, code为短信验证码(可不填), columns为question及其答案数组.
Mudu.Room.Signup.Submit(
  // {code: 8909, 
    {
    columns: [
      // {type: 'nickname', 'name': '姓名', text: '目睹君'},

      // {type: 'phone', 'name': '手机号', text: '18099998888'},
      
      // {type: 'question', 'name': '你喜欢听哪些歌手', selects: ['A', 'B', 'D'], text: 'Coldplay' }
      {type: "nickname", name: "昵称", text:'目睹君'},
      {type: "phone", name: "手机", text: '18099998888'},
      {type: "input", name: "单行", text: '单行1'},
      {type: "textarea", name: "多行", text: '多行1'},
      {type: "question", name: "选择题", selects: ['A']},
      {type: "questionAnswer", name: "问答题", selects: ['A'], text: 'Coldplay'},
      {type: "question", name: "选择题2", selects: ['A']}

    ]
  },

  function (response) {
      response = JSON.parse(response);
      console.log(response);
      alert('报名提交成功');
  }
)
}

// PPT相关

function openppt(){
  document.getElementsByClassName("ppt-box")[0].style.display="block"; 
  document.getElementsByClassName("ppt-btn")[0].style.display="none";


  var description = document.createElement('button');
  description.setAttribute('class','pptclose-btn');
  description.setAttribute('onclick','closeppt()');
  var desctext = document.createTextNode('ppt-off');
  description.appendChild(desctext);
  document.getElementsByClassName('ppt-content')[0].appendChild(description);



  // GetUrl 获取当前控制台PPT图片地址
  // 返回string, 如果为空字符串, 则表示控制台未选择ppt
  var url = Mudu.Room.PPT.GetUrl()
  console.log('PPT图片地址:'+url);

  // GetName 获取ppt名称
  // 返回string
  var name = Mudu.Room.PPT.GetName()
  console.log('ppt名称:'+name);

  // GetCurrentPage 获取当前控制台ppt所在页数
  // 返回number, 从1开始
  var currentPage = Mudu.Room.PPT.GetCurrentPage()
  console.log('ppt所在页:'+currentPage);

  // GetTotalPage 获取当前ppt总页数
  // 返回number
  var totalPage = Mudu.Room.PPT.GetTotalPage()
  console.log('ppt总页数:'+totalPage);


  // GetAllowTurnPage 获取控制台是否允许用户翻页
  // 返回boolean, true为允许, false为禁止
  var allowTurnPage = Mudu.Room.PPT.GetAllowTurnPage()
  console.log('是否允许用户翻页:'+allowTurnPage);

  var description = document.createElement('p');
  description.setAttribute('class','pptadr');
  var desctext = document.createTextNode('PPT图片地址:'+url);
  description.appendChild(desctext);
  document.getElementsByClassName('ppt-content')[0].appendChild(description);

  var description = document.createElement('p');
  description.setAttribute('class','pptname');
  var desctext = document.createTextNode('ppt名称:'+name);
  description.appendChild(desctext);
  document.getElementsByClassName('ppt-content')[0].appendChild(description);

  var description = document.createElement('p');
  description.setAttribute('class','ppttotal');
  var desctext = document.createTextNode('ppt总页数:'+totalPage);
  description.appendChild(desctext);
  document.getElementsByClassName('ppt-content')[0].appendChild(description);

  var description = document.createElement('p');
  description.setAttribute('class','pptcur');
  var desctext = document.createTextNode('ppt所在页:'+currentPage);
  description.appendChild(desctext);
  document.getElementsByClassName('ppt-content')[0].appendChild(description);

  var description = document.createElement('p');
  description.setAttribute('class','pptturn');
  var desctext = document.createTextNode('是否允许用户翻页:'+allowTurnPage);
  description.appendChild(desctext);
  document.getElementsByClassName('ppt-content')[0].appendChild(description);


// 添加上一页PPT显示
  var description = document.createElement('button');
  description.setAttribute('class','pptpreview-btn');
  description.setAttribute('onclick','pptpreview()');
  var desctext = document.createTextNode('上一页');
  description.appendChild(desctext);
  document.getElementsByClassName('ppt-content')[0].appendChild(description);
// 添加下一页PPT显示
  var description = document.createElement('button');
  description.setAttribute('class','pptnext-btn');
  description.setAttribute('onclick','pptnext()');
  var desctext = document.createTextNode('下一页');
  description.appendChild(desctext);
  document.getElementsByClassName('ppt-content')[0].appendChild(description);
// 添加当前PPT显示
  var description = document.createElement('img');
  description.setAttribute('class','pptcurshow');
  description.setAttribute('src',url);
  document.getElementsByClassName('pptshow')[0].appendChild(description);


}
function closeppt(){
  document.getElementsByClassName("ppt-box")[0].style.display="none"; 
  document.getElementsByClassName('ppt-content')[0].innerHTML='';
  document.getElementsByClassName('pptshow')[0].innerHTML='';
  document.getElementsByClassName("ppt-btn")[0].style.display="block"; 

}




function pptpreview(){

// GetCurrentPage 获取当前控制台ppt所在页数
  // 返回number, 从1开始
  var currentPage = Mudu.Room.PPT.GetCurrentPage()
  console.log('ppt所在页:'+currentPage);

  var page;
  if(0<page<currentPage){
    page = currentPage-1;
  }else{
    page=0;
  }
 

  
  // 第一个参数为页码, 第二个参数为获取后的回调函数
  Mudu.Room.PPT.GetPageImgUrl( page, function (url) {
  console.log('图片地址为: ', url);
  
  
  document.getElementsByClassName('pptshow')[0].innerHTML='';


  // 添加当前PPT显示
  var description = document.createElement('img');
  description.setAttribute('class','pptcurshow');
  description.setAttribute('src',url);
  document.getElementsByClassName('pptshow')[0].appendChild(description);
  
  })
}
 
function pptnext(){


// 返回number
var totalPage = Mudu.Room.PPT.GetTotalPage();


// GetCurrentPage 获取当前控制台ppt所在页数
  // 返回number, 从1开始
  var currentPage = Mudu.Room.PPT.GetCurrentPage()
  console.log('ppt所在页:'+currentPage);

  var page=currentPage;

  page = currentPage+1;

  console.log(page);
 // // 第一个参数为页码, 第二个参数为获取后的回调函数
 Mudu.Room.PPT.GetPageImgUrl( page, function (url) {
  console.log('图片地址为: ', url);


  document.getElementsByClassName('pptshow')[0].innerHTML='';


  // 添加当前PPT显示
  var description = document.createElement('img');
  description.setAttribute('class','pptcurshow');
  description.setAttribute('src',url);
  document.getElementsByClassName('pptshow')[0].appendChild(description);


})

}



function openvote(){

  document.getElementsByClassName("vote-box")[0].style.display="block"; 
  document.getElementsByClassName("vote-btn")[0].style.display="none"; 

  var description = document.createElement('button');
  description.setAttribute('class','voteclose-btn');
  description.setAttribute('onclick','closevote()');
  var desctext = document.createTextNode('vote-off');
  description.appendChild(desctext);
  document.getElementsByClassName('vote-content')[0].appendChild(description);


  Mudu.Room.Vote.Get(function (response) {
    response = JSON.parse(response)
    if (response.status === 'y') {
    console.log('投票数据获取成功，数据为：', response.data)

    var description = document.createElement('p');
    description.setAttribute('class','votename');
    var desctext = document.createTextNode('投票名称：'+response.data.vote_name);
    description.appendChild(desctext);
    document.getElementsByClassName('vote-content')[0].appendChild(description);

    var description = document.createElement('p');
    description.setAttribute('class','votetime');
    var desctext = document.createTextNode('截止时间：'+response.data.end_time);
    description.appendChild(desctext);
    document.getElementsByClassName('vote-content')[0].appendChild(description);

    console.log('问题长度：'+response.data.questions.length);

      for (var i=0;i<response.data.questions.length;i++){

        
      

        var description = document.createElement('ul');
        description.setAttribute('class','voteitem');



        var normalitem = document.createElement('li');
        normalitem.setAttribute('class','normalitem');
        var desctext = document.createTextNode(response.data.questions[i].question_name);
        normalitem.appendChild(desctext);
        description.appendChild(normalitem);

        for (var j=0;j<response.data.questions[i].items.length;j++){

        var item = document.createElement('ul');
        item.setAttribute('class','item');
        normalitem.appendChild(item);


        var itemdata = document.createElement('div');
        itemdata.setAttribute('class','itemdata');
        item.appendChild(itemdata);


        var p = response.data.questions[i].question_multi
          if (p>1){

            var radio =document.createElement('span');
            var inputtext = document.createElement('input');
            inputtext.setAttribute('class','vote-content-checkbox');
            inputtext.setAttribute('type','checkbox');
            // 添加name属性，name 属性定义的单选按钮组 (具有相同名称的单选按钮 属于同一组)
            inputtext.setAttribute('name','checkbox-'+i);
            radio.appendChild(inputtext);
            itemdata.appendChild(radio);
          }else{
            // 添加选项按钮
            var radio =document.createElement('span');
            var inputtext = document.createElement('input');
            inputtext.setAttribute('class','vote-content-radio');
            inputtext.setAttribute('type','radio');
            // 添加name属性，name 属性定义的单选按钮组 (具有相同名称的单选按钮 属于同一组)
            inputtext.setAttribute('name','radio-'+i);
            radio.appendChild(inputtext);
            itemdata.appendChild(radio);
          }

        var itemlist = document.createElement('li');
        itemlist.setAttribute('class','itemlist');
        var desctext = document.createTextNode(response.data.questions[i].items[j].item_name);
        itemlist.appendChild(desctext);
        itemdata.appendChild(itemlist);

        var imgitem = document.createElement('img');
        imgitem.setAttribute('class','voteimg');

        var desctext = response.data.questions[i].items[j].image
        imgitem.setAttribute('src',desctext);
        itemdata.appendChild(imgitem);

        if(response.data.questions[i].items[j].image == ''){
          itemdata.removeChild(imgitem);
          // document.getElementsByClassName('voteimg')[0].style.display='none';
        }

        var percent = document.createElement('div');
        percent.setAttribute('class','percent');
        var desctext = document.createTextNode(response.data.questions[i].items[j].percent);
        percent.appendChild(desctext);
        item.appendChild(percent);

        }
        document.getElementsByClassName('vote-content')[0].appendChild(description);

      }

      var description = document.createElement('button');
      description.setAttribute('class','votesub-btn');
      description.setAttribute('onclick','closevote();vote()');
      var desctext = document.createTextNode('提交');
      description.appendChild(desctext);
      document.getElementsByClassName('vote-content')[0].appendChild(description);

    }
    if (response.status === 'n') {
      console.log('获取失败')
    }
  })
}
function closevote(){
  document.getElementsByClassName("vote-box")[0].style.display="none"; 
  document.getElementsByClassName('vote-content')[0].innerHTML='';
  document.getElementsByClassName('voteshow')[0].innerHTML='';
  document.getElementsByClassName("vote-btn")[0].style.display="block"; 

}

function vote(){


 
  Mudu.Room.Vote.Get(function (response) {
    response = JSON.parse(response)
    if (response.status === 'y') {
      console.log('投票数据获取成功，数据为：', response.data)
    }
    if (response.status === 'n') {
      console.log('投票数据获取失败')
    }

    var id = response.data.id

    console.log(id)


  })
    

  Mudu.Room.Vote.Vote(



  
    
    
    // 问题及答案(数组)
    [
      {
        // 4265为vote_id
        // "1|1" 表示第一个问题，用户的答案是第一个选项
        // "4265":"1|1"
        "11078":"1|1"
      },
      {
        // 4265为vote_id
        // "2|2,3" 表示第二个问题，用户的答案是第二个选项和第三个选项
        "11078":"2|1"
      },
      {
        // 4265为vote_id
        // "2|2,3" 表示第二个问题，用户的答案是第二个选项和第三个选项
        "11078":"3|2"
      }
  
    ],
  
    // 回调函数，参数为response
    function (response) {
      response = JSON.parse(response)
      if (response.status === 'y') {
        console.log('投票成功')
      }
      if (response.status === 'n') {
        console.log('投票失败');
        console.log(response);
        alert(response.info);
      }
    }
  )
}



function sendtopic(){

// // 返回boolean, true为允许, false为不允许
// var isAllowPublish = Mudu.Room.Topic.GetAllowPublish()
// console.log('是否允许发布话题'+isAllowPublish);

// if(isAllowPublish == true){


// // 返回boolean, true为需要审核, false为不需要审核
// var isNeedsCheck = Mudu.Room.Topic.GetNeedsCheck()
// console.log('是否允许需要审核'+isNeedsCheck);

//   if(isNeedsCheck == false){
  
var text = document.getElementsByClassName('topic_area')[0].value;


// 第一个参数为观众发送的内容, 其中msg为文字内容, images为图片列表, msg和images两者必须有一个不为空
// 第二个参数为发送成功或失败的回调函数
Mudu.Room.Topic.SendTopic(
  {
      msg: text,
      images: [
        'https://cdn13.mudu.tv/assets/upload/155840728477365.gif',
        'https://cdn13.mudu.tv/assets/upload/155840730569339.gif',
        'https://cdn13.mudu.tv/assets/upload/155840730554900.gif',
        'https://cdn13.mudu.tv/assets/upload/155840728477365.gif',
        'https://cdn13.mudu.tv/assets/upload/155840730569339.gif',
        'https://cdn13.mudu.tv/assets/upload/155840730554900.gif',
        'https://cdn13.mudu.tv/assets/upload/155840728477365.gif',
        'https://cdn13.mudu.tv/assets/upload/155840730569339.gif',
        'https://cdn13.mudu.tv/assets/upload/155840730554900.gif'
      ]
  },
  function (response) {
      response = JSON.parse(response)
      console.log(response);
      alert(response.info);

        // 添加话题记录
        var huatidata = document.createElement('li');
        huatidata.setAttribute('class','huatidata');

        var list = document.createElement('div');
        list.setAttribute('class','huatimsg_area');
        
        var alertcmt = document.createElement("img");
        alertcmt.setAttribute('class','img');
        alertcmt.setAttribute('src','https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2866492045,1432640156&fm=26&gp=0.jpg');
        var description = document.createElement('span');
        description.setAttribute('class','huatimsg');
        var desctext = document.createTextNode(text);
        description.appendChild(desctext);
        list.appendChild(alertcmt);
        list.appendChild(description);

        var alertimgs = document.createElement("div");
        alertimgs.setAttribute('class','allimgs');

        var alertimg1 = document.createElement("img");
        alertimg1.setAttribute('src','https://cdn13.mudu.tv/assets/upload/155840728477365.gif');
        alertimg1.setAttribute('class','huatiimg');
        
        var alertimg2 = document.createElement("img");
        alertimg2.setAttribute('src','https://cdn13.mudu.tv/assets/upload/155840730569339.gif');
        alertimg2.setAttribute('class','huatiimg');

        var alertimg3 = document.createElement("img");
        alertimg3.setAttribute('src','https://cdn13.mudu.tv/assets/upload/155840730554900.gif');
        alertimg3.setAttribute('class','huatiimg');
        alertimgs.appendChild(alertimg1);
        alertimgs.appendChild(alertimg2);
        alertimgs.appendChild(alertimg3);


        var alertimgs2 = document.createElement("div");
        alertimgs2.setAttribute('class','allimgs');

        var alertimg1 = document.createElement("img");
        alertimg1.setAttribute('src','https://cdn13.mudu.tv/assets/upload/155840728477365.gif');
        alertimg1.setAttribute('class','huatiimg');
        
        var alertimg2 = document.createElement("img");
        alertimg2.setAttribute('src','https://cdn13.mudu.tv/assets/upload/155840730569339.gif');
        alertimg2.setAttribute('class','huatiimg');

        var alertimg3 = document.createElement("img");
        alertimg3.setAttribute('src','https://cdn13.mudu.tv/assets/upload/155840730554900.gif');
        alertimg3.setAttribute('class','huatiimg');
        alertimgs2.appendChild(alertimg1);
        alertimgs2.appendChild(alertimg2);
        alertimgs2.appendChild(alertimg3);



        var alertimgs3 = document.createElement("div");
        alertimgs3.setAttribute('class','allimgs');

        var alertimg1 = document.createElement("img");
        alertimg1.setAttribute('src','https://cdn13.mudu.tv/assets/upload/155840728477365.gif');
        alertimg1.setAttribute('class','huatiimg');
        
        var alertimg2 = document.createElement("img");
        alertimg2.setAttribute('src','https://cdn13.mudu.tv/assets/upload/155840730569339.gif');
        alertimg2.setAttribute('class','huatiimg');

        var alertimg3 = document.createElement("img");
        alertimg3.setAttribute('src','https://cdn13.mudu.tv/assets/upload/155840730554900.gif');
        alertimg3.setAttribute('class','huatiimg');
        alertimgs3.appendChild(alertimg1);
        alertimgs3.appendChild(alertimg2);
        alertimgs3.appendChild(alertimg3);


        list.appendChild(alertimgs3);
        list.appendChild(alertimgs2);
        list.appendChild(alertimgs);


        // 添加回复
        var reply = document.createElement("div");
        reply.setAttribute('class','reply');
       
        var replyin = document.createElement('textarea');
        replyin.setAttribute('class','replyin');

        var replybtn = document.createElement('button');
        replybtn.setAttribute('class','reply-btn');
        replybtn.setAttribute('onclick','reply()');
        var desctext = document.createTextNode('回复');
        replybtn.appendChild(desctext);

        reply.appendChild(replyin);
        reply.appendChild(replybtn);
        list.appendChild(reply);

        huatidata.appendChild(list);
        // document.getElementsByClassName('topic-page')[0].appendChild(huatidata);



        // 返回boolean, true为允许, false为不允许
        var isAllowReply = Mudu.Room.Topic.GetAllowReply()
        if(isAllowReply==false){
          list.removeChild(reply);

        }



      if(response.flag == 100){
        
       
        if (response.topicNeedsChecked==1){
            // document.getElementsByClassName('topic_history')[0].appendChild(huatidata);

            var firstLi = document.getElementsByClassName('huatidata')[0]
            if (firstLi) {
              document.getElementsByClassName("topic_history")[0].insertBefore(huatidata, firstLi);
            } else {
              document.getElementsByClassName('topic_history')[0].appendChild(huatidata);
            }  



        }else if(response.topicNeedsChecked==0){
          alert('话题等待审核');
          
        }
      }

  }
)

document.getElementsByClassName('topic_area')[0].value='';
// }else{
//   alert("话题需要审核");
// }
// }else{
//   alert("不允许发布话题");
// }

}

function getpage(){

var page=document.getElementsByClassName('topic_pageget')[0].value

console.log('获取话题互动第'+ page +'页数据');

// 第一个参数为页码，第二个参数为回调函数
Mudu.Room.Topic.Get(
  +page,
  function (response) {
      // response格式为: {status: 'y', flag: 100, topics: [topicItem1, topicItem2, ...]}
      response = JSON.parse(response)
      console.log(response);
      console.log(response.topics);

      for(var i=response.topics.length-1;0<=i;i--){

        
        var pagelist = document.createElement('li');
        pagelist.setAttribute('class','gethuatipage');
        var alertcmt = document.createElement("img");
        alertcmt.setAttribute('class','gethuatiavatar');
        alertcmt.setAttribute('src',response.topics[i].avatar);
        var description = document.createElement('span');
        description.setAttribute('class','gethuatimsg');
        var desctext = document.createTextNode(response.topics[i].message);
        pagelist.appendChild(alertcmt);
        pagelist.appendChild(description);
        description.appendChild(desctext);

        var br = document.createElement('br');
        pagelist.appendChild(br);

        for(var j=0;j<response.topics[i].images.length;j++){

        var alertimgdiv = document.createElement("div");
        alertimgdiv.setAttribute('class','gethuatiimgs');

        var alertimg = document.createElement("img");
        alertimg.setAttribute('class','imgsigle');
        alertimg.setAttribute('src',response.topics[i].images[j]);

        alertimgdiv.appendChild(alertimg);
        pagelist.appendChild(alertimgdiv);


        }

        // document.getElementsByTagName('ol')[1].appendChild(pagelist);
        var firstLi = document.getElementsByClassName('gethuatipage')[0]
              if (firstLi) {
                document.getElementsByClassName("page-history")[0].insertBefore(pagelist, firstLi);
              } else {
                document.getElementsByClassName('page-history')[0].appendChild(pagelist);
              }   
      }







      
  }
)

}

function reply(){




        // 回复显示
        var replyout = document.createElement('div');
        replyout.setAttribute('class','replyout');
        
        var alertcmt = document.createElement("img");
        alertcmt.setAttribute('class','img');
        alertcmt.setAttribute('src','https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2866492045,1432640156&fm=26&gp=0.jpg');
        var description = document.createElement('span');
        description.setAttribute('class','huatimsg');

        var text = document.getElementsByClassName('replyin')[0].value;
        var desctext = document.createTextNode(text);

        description.appendChild(desctext);
        replyout.appendChild(alertcmt);
        replyout.appendChild(description);

        var firstLi = document.getElementsByClassName('reply')[0]

        document.getElementsByClassName("huatimsg_area")[0].insertBefore(replyout, firstLi);

        document.getElementsByClassName('replyin')[0].value=''





}