
Mudu.Init(
  // 线上频道id
  // 185053,
  // 测试服频道ID
  10003046,


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
          inputtext.setAttribute('class','input-content');
          listdiv.appendChild(inputtext);
          }else if(signupConfig.columns[i].type=="phone"){
            var inputtext = document.createElement('input');
            inputtext.setAttribute('class','input-content');
            listdiv.appendChild(inputtext);
              }else if(signupConfig.columns[i].type=="input"){
                var inputtext = document.createElement('input');
                inputtext.setAttribute('class','input-content');
                listdiv.appendChild(inputtext);
                }else if(signupConfig.columns[i].type=="textarea"){
                  var inputtext = document.createElement('input');
                  inputtext.setAttribute('class','input-content');
                  listdiv.appendChild(inputtext);
                  }else if(signupConfig.columns[i].type=="question"){
                    var inputtext = document.createElement('input');
                    inputtext.setAttribute('class','input-content');
                    listdiv.appendChild(inputtext);
                    }else if(signupConfig.columns[i].type=="questionAnswer"){
                      var inputtext = document.createElement('input');
                      inputtext.setAttribute('class','input-content');
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
            inputtext.setAttribute('class','input-content');
            listdiv.appendChild(inputtext);
            }else if(signupConfig.columns[i].type=="phone"){
              var inputtext = document.createElement('input');
              inputtext.setAttribute('class','input-content');
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
                    inputtext.setAttribute('class','input-content');
                    listdiv.appendChild(inputtext);
                    }else if(signupConfig.columns[i].type=="question"){
                      var inputtext = document.createElement('input');
                      inputtext.setAttribute('class','input-content');
                      listdiv.appendChild(inputtext);
                      }else if(signupConfig.columns[i].type=="questionAnswer"){
                        var inputtext = document.createElement('input');
                        inputtext.setAttribute('class','input-content');
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
            inputtext.setAttribute('class','input-content');
            listdiv.appendChild(inputtext);
            }else if(signupConfig.columns[i].type=="phone"){
              var inputtext = document.createElement('input');
              inputtext.setAttribute('class','input-content');
              listdiv.appendChild(inputtext);
                }else if(signupConfig.columns[i].type=="input"){
                  var inputtext = document.createElement('input');
                  inputtext.setAttribute('class','input-content');
                  listdiv.appendChild(inputtext);
                  }else if(signupConfig.columns[i].type=="textarea"){
                    var inputtext = document.createElement('input');
                    inputtext.setAttribute('class','input-content');
                    listdiv.appendChild(inputtext);
                    }else if(signupConfig.columns[i].type=="question"){
                      var inputtext = document.createElement('input');
                      inputtext.setAttribute('class','input-content');
                      listdiv.appendChild(inputtext);
                      }else if(signupConfig.columns[i].type=="questionAnswer"){
                        var inputtext = document.createElement('input');
                        inputtext.setAttribute('class','input-content');
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
            inputtext.setAttribute('class','input-content');
            listdiv.appendChild(inputtext);
            }else if(signupConfig.columns[i].type=="phone"){
              var inputtext = document.createElement('input');
              inputtext.setAttribute('class','input-content');
              listdiv.appendChild(inputtext);
                }else if(signupConfig.columns[i].type=="input"){
                  var inputtext = document.createElement('input');
                  inputtext.setAttribute('class','input-content');
                  listdiv.appendChild(inputtext);
                  }else if(signupConfig.columns[i].type=="textarea"){
                    var inputtext = document.createElement('input');
                    inputtext.setAttribute('class','input-content');
                    listdiv.appendChild(inputtext);
                    }else if(signupConfig.columns[i].type=="question"){
                      var inputtext = document.createElement('input');
                      inputtext.setAttribute('class','input-content');
                      listdiv.appendChild(inputtext);
                      }else if(signupConfig.columns[i].type=="questionAnswer"){
                        var inputtext = document.createElement('input');
                        inputtext.setAttribute('class','input-content');
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
            inputtext.setAttribute('class','input-content');
            listdiv.appendChild(inputtext);
            }else if(signupConfig.columns[i].type=="phone"){
              var inputtext = document.createElement('input');
              inputtext.setAttribute('class','input-content');
              listdiv.appendChild(inputtext);
                }else if(signupConfig.columns[i].type=="input"){
                  var inputtext = document.createElement('input');
                  inputtext.setAttribute('class','input-content');
                  listdiv.appendChild(inputtext);
                  }else if(signupConfig.columns[i].type=="textarea"){
                    var inputtext = document.createElement('input');
                    inputtext.setAttribute('class','input-content');
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
                        opt.setAttribute('class','opt');
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
                        inputtext.setAttribute('class','input-content');
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
            inputtext.setAttribute('class','input-content');
            listdiv.appendChild(inputtext);
            }else if(signupConfig.columns[i].type=="phone"){
              var inputtext = document.createElement('input');
              inputtext.setAttribute('class','input-content');
              listdiv.appendChild(inputtext);
                }else if(signupConfig.columns[i].type=="input"){
                  var inputtext = document.createElement('input');
                  inputtext.setAttribute('class','input-content');
                  listdiv.appendChild(inputtext);
                  }else if(signupConfig.columns[i].type=="textarea"){
                    var inputtext = document.createElement('input');
                    inputtext.setAttribute('class','input-content');
                    listdiv.appendChild(inputtext);
                    }else if(signupConfig.columns[i].type=="question"){
                      var inputtext = document.createElement('input');
                      inputtext.setAttribute('class','input-content');
                      listdiv.appendChild(inputtext);
                      }else if(signupConfig.columns[i].type=="questionAnswer"){
                        var inputtext = document.createElement('input');
                        inputtext.setAttribute('class','input-content');
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

  var radio=document.getElementsByClassName("input-content-radio");
  var arr = new Array();
  for(var i=0;i<radio.length;i++){
          if(radio[i].checked==true) {
            arr[i]=radio[i].value;
        }
    };
  alert(arr);

  var columns = document.getElementsByClassName("input-content");
  var arr = new Array();
  for (var i=0; i<columns.length;i++){
    arr[i]=columns[i].value;
  };
  alert(arr);

  var columnsoptions = document.getElementsByClassName("inputoption");
  var arr = new Array();
  for (var i=0; i<columnsoptions.length;i++){
    arr[i]=columnsoptions[i].innerHTML;
  };
  alert(arr);

// 获取昵称
// var nickname = document.getElementsByClassName()


  // 第一个参数为一个对象, code为短信验证码(可不填), columns为question及其答案数组.
Mudu.Room.Signup.Submit(
  {code: 8909, 
    columns: [
      {type: 'nickname', 'name': '姓名', text: '目睹君'},

      {type: 'phone', 'name': '手机号', text: '18099998888'},
      
      {type: 'question', 'name': '你喜欢听哪些歌手', selects: ['A', 'B', 'D'], text: 'Coldplay' }
    ]
  },

  function (response) {
      response = JSON.parse(response);
      console.log(response);
      alert('报名提交成功');
  }
)
}

// 判断必填项
function notmust(){

}






