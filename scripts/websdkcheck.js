
Mudu.Init(
    // 线上频道id
    // 185053,
    // 测试服频道ID
    10003046,
    // 10003171,
    // 测试服子账号
    // 10003145,
    // 线上预告回看带PPT
    // 164614,
  
  
    // 初始化完成的回调函数，无参数
    function () {
      console.log('Mudu Web Sdk 初始化成功')
      document.getElementsByClassName('init_0_1')[0].innerHTML='Mudu Web Sdk 初始化成功';

    // 获取当前webSDK版本，返回string， 如: 1.2.1
    var version = Mudu.GetVersion();
    console.log('WebSDK_Version:'+version);
    document.getElementsByClassName('version')[0].innerHTML='WebSDK_Version:'+version;
    



    // 在sdk 初始化成功后才可以获取当前的用户信息
      var userdata = Mudu.Room.User.GetUser()
      console.log(userdata);
      var name=userdata.name
      var id=userdata.id
      var assign_id=userdata.assign_id
      var avatar=userdata.avatar
      document.getElementsByClassName('name')[0].innerHTML='name:'+name;
      document.getElementsByClassName('id')[0].innerHTML='id:'+id;
      document.getElementsByClassName('assign_id')[0].innerHTML='assign_id:'+assign_id;
      document.getElementsByClassName('avatar')[0].innerHTML='avatar:'+avatar;

    // 情景一： 在调用sdk的init方法之前，希望设置默认的用户昵称和头像 （仅对初次进入的用户有效） 注：该观众仍为匿名观众，不能参与投票
    // 在cookie中设置muduapi_user、muduapi_avatar，这两项的值必须使用encodeURIComponent方法encode key | value ---|--- 
    // muduapi_user | encodeURIComponent(用户名)
    // muduapi_avatar | encodeURIComponent(头像网络地址)
    // 情景二： 希望给匿名用户赋予身份 或 更新当前用户的头像、昵称等信息
    // 需要在sdk 初始化成功后才能使用

    //   var name = document.getElementsByClassName('set_name')[0].value
    //   var avatar = document.getElementsByClassName('set_avatar')[0].value
    //   var assignId = document.getElementsByClassName('set_assign_id')[0].value
    //   var Callback = 'function(){}'
    //   Mudu.Room.User.Assign(name, avatar, assignId, Callback)
    //   console.log()
// =======================================================================================================================================


    var isChannelLiving = !!Mudu.Room.GetLiveStatus() // Mudu.Room.GetLiveStatus() 获取当前的直播状态 类型为number: `1`为正在直播，`0`为不在直播 
    var player = new Mudu.Player(
    {
        // 必须，播放器容器ID，播放器会被添加到该DOM元素中
        containerId: 'J_prismPlayer',

        // 非必需 boolean 控制播放器的ui展示, 默认为false; 根据播放视频的实际情况填写
        isLive: isChannelLiving,

        // 必须，播放器视频播放地址
        src: Mudu.Room.GetPlayAddr(),

        // 非必须，播放器海报图 string
        image: Mudu.Room.GetLiveImage(),

        // 播放器背景图全屏显示，视频的拉伸和背景图的拉伸属性不是分开的，默认配置都是contain，这里是自己手动添加的配置，开发文档里没有这个配置
        stretching: 'cover',


        // 已废弃该参数，请勿使用
        type: 'live',

        // 非必须，播放器是否自动播放，默认false
        autoplay: false,

        // 非必须，播放器是否显示控制条，默认true
        controls: true,

        // 非必须，播放器是否循环播放, 默认false
        repeat: false,

        // 非必须，播放器宽度，单位为像素，默认为480
        width: 320,

        // 非必须，播放器高度，单位为像素，默认为270
        height: 180,

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
    
    )
    window.player = player;
// =======================================================================================================================================

    // 返回直播间名字，类型为string
    var roomName = Mudu.Room.GetName()
    console.log(roomName);
    document.getElementsByClassName('room_0_1')[0].innerHTML="直播间名字:"+roomName;


    // 返回直播状态，类型为number: `1`为正在直播，`0`为不在直播
    var roomLiveStatus = Mudu.Room.GetLiveStatus()
    console.log(roomLiveStatus);
    document.getElementsByClassName('room_1_1')[0].innerHTML="直播状态:"+roomLiveStatus;


    // 返回直播间浏览量，类型为number整数
    var roomViewNum = Mudu.Room.GetViewNum()
    console.log(roomViewNum);
    document.getElementsByClassName('room_2_1')[0].innerHTML="直播间浏览量:"+roomViewNum;


    // 返回直播间视频地址，类型为string
    var roomPlayAddr = Mudu.Room.GetPlayAddr()
    console.log(roomPlayAddr);
    document.getElementsByClassName('room_3_1')[0].innerHTML="直播间视频地址:"+roomPlayAddr;


    // 返回直播间视频地址列表，类型为array
    var roomPlayAddr = Mudu.Room.GetPlayList()
    console.log(roomPlayAddr);
    document.getElementsByClassName('room_4_1')[0].innerHTML="直播间视频地址列表如下：";

    for(var i=0; i<roomPlayAddr.length;i++){

        var description = document.createElement('div');
        description.setAttribute('class','roomPlayAddrs');
        var desctext = document.createTextNode('地址序列'+'['+ i +']'+':'+roomPlayAddr[i].address);
        description.appendChild(desctext);
        document.getElementsByClassName('room_4_1')[0].appendChild(description);
    }
// =======================================================================================================================================

    // 返回视频回看配置
    var trailer = Mudu.Room.GetTrailer()
    console.log(trailer);
    document.getElementsByClassName('room_5_1')[0].innerHTML="视频回看配置如下：";

        var m3u8=trailer.m3u8
        var state=trailer.open
        var imge =trailer.trailer_img

        var description1 = document.createElement('div');
        description1.setAttribute('class','trailer');

        var description2= document.createElement('p');
        description2.setAttribute('class','trailer_m3u8');
        var desctext = document.createTextNode('1.地址序列:'+m3u8);
        description2.appendChild(desctext);

        var description3= document.createElement('p');
        description3.setAttribute('class','trailer_state');
        var desctext = document.createTextNode('2.是否开启回看:'+state);
        description3.appendChild(desctext);

        var description4= document.createElement('p');
        description4.setAttribute('class','trailer_img');
        var desctext = document.createTextNode('3.回看背景图:'+imge);
        description4.appendChild(desctext);
        
        description1.appendChild(description2);
        description1.appendChild(description3);
        description1.appendChild(description4);

        document.getElementsByClassName('room_5_1')[0].appendChild(description1);
// =======================================================================================================================================

    // 返回直播间自定义菜单, 类型为Array
    var menus = Mudu.Room.GetMenus()
    console.log(menus);
    document.getElementsByClassName('room_6_1')[0].innerHTML="自定义菜单如下，具体开F12查看菜单参数:";

    for(var i=0;i<menus.length;i++){
        var menusdescription = document.createElement('div');
        menusdescription.setAttribute('class','menus');
        var desctext = document.createTextNode('菜单名称'+i+":"+menus[i].menu_name);
        menusdescription.appendChild(desctext);
        document.getElementsByClassName('room_6_1')[0].appendChild(menusdescription);

    }

// =======================================================================================================================================

    // 返回直播间自定义广告栏, 类型为Array
    var ads = Mudu.Room.GetBanners();
    console.log(ads);
    document.getElementsByClassName('room_7_1')[0].innerHTML="自定义广告栏如下，具体开F12查看菜单参数:";

        var adsdescription = document.createElement('div');
        adsdescription.setAttribute('class','ads');
        for(var j=0;j<ads.length;j++){
        
            var imgads = document.createElement('p');
            imgads.setAttribute('class','imgads');
            var desctext = document.createTextNode('广告栏'+j+":"+ads[j].img+ads[j].text);
            imgads.appendChild(desctext);
            adsdescription.appendChild(imgads);
            document.getElementsByClassName('room_7_1')[0].appendChild(adsdescription); 
    }

// =======================================================================================================================================

    // 返回直播间主题名称, 类型为string： 目前有两个值(default, tech)
    var activeTheme = Mudu.Room.GetActiveTheme()
    console.log(activeTheme);
    document.getElementsByClassName('room_8_1')[0].innerHTML="直播间主题名称:"+activeTheme;


    // 返回直播间主题配置，类型为Array
    var themes = Mudu.Room.GetThemes()
    console.log(themes);
    document.getElementsByClassName('room_9_1')[0].innerHTML="直播间主题配置名称如下:";

    var themesdiv = document.createElement('div');
    themesdiv.setAttribute('class','themes');
    for(var n=0;n<themes.length;n++){
        var Themes = document.createElement('p');
        Themes.setAttribute('class','theme');
        var desctext = document.createTextNode('主题配置'+n+":"+themes[n].name);
        Themes.appendChild(desctext);
        themesdiv.appendChild(Themes);
        document.getElementsByClassName('room_9_1')[0].appendChild(themesdiv); 
    }


    // Room.StreamEvent事件会在直播流状态改变时(通常是后台开始直播或者关闭直播)被触发

    Mudu.MsgBus.On(
        // 事件名，值为Room.StreamEvent
        'Room.StreamEvent',

        // 事件处理函数，参数类型为object
        function (data) {
            data = JSON.parse(data)

            var msg = data.event == 1 ? '开始直播' : '停止直播'
            console.log(msg)

            document.getElementsByClassName('room_10_1')[0].innerHTML="Room.StreamEvent事件:"+msg;
            timer=setTimeout(function () {
                document.getElementsByClassName('room_10_1')[0].innerHTML="Room.StreamEvent事件";
            }, 5000); 

        }
    )

// =======================================================================================================================================

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
            const randomTime = Random(8, 30);
            // 创建离上方的距离  百分比 现在是半屏
            const randomTop = Random(0, 80);
            description.style.top = randomTop + "%";
            description.style.animation = "barrage " + randomTime + "s linear";
            // 添加一个定时器 在运行完成之后删除这个DOM
            setTimeout(() => {
            document.getElementsByClassName('barrage')[0].removeChild(description)
        }, randomTime * 1000);
        } 
        )
    // Barrage.New事件会在收到新的弹幕时被触发
    Mudu.MsgBus.On(
        // 事件名，值为"Barrage.New"
        "Barrage.New",
        
        // 事件处理函数，参数为弹幕对象
        function (barrage) {
            barrage = JSON.parse(barrage)
            console.log('收到新的弹幕，内容为: ', barrage.text)
            document.getElementsByClassName('danmu_1_1')[0].innerHTML='收到新的弹幕: ';
            timer=setTimeout(function () {
                document.getElementsByClassName('danmu_1_1')[0].innerHTML='Barrage.New事件';   
            }, 5000); 


            var description = document.createElement('p');
            description.setAttribute('class','barrage_text');
            var desctext = document.createTextNode('内容：'+barrage.text);
            description.appendChild(desctext);
            document.getElementsByClassName('danmu_1_1')[0].appendChild(description);

            var description = document.createElement('p');
            description.setAttribute('class','barrage_stime');
            var desctext = document.createTextNode('时间戳：'+barrage.stime);
            description.appendChild(desctext);
            document.getElementsByClassName('danmu_1_1')[0].appendChild(description);


    }
    )
// =======================================================================================================================================

    // 返回评论页数，类型为int
    var commentPage = Mudu.Room.Comment.GetPage()
    document.getElementsByClassName('commit_0_1')[0].innerHTML='评论总页数：'+commentPage; 


    Mudu.MsgBus.On(
        // 事件名，值为Comment.New
        'Comment.New', 
      
        // 事件处理函数，参数为新的评论，类型为object
        function (newComment) {
          newComment = JSON.parse(newComment)
          console.log(newComment.username + '发送了一条新评论: ' + newComment.message)

          document.getElementsByClassName('commit_3_2')[0].innerHTML='观众名：'+newComment.username;
          document.getElementsByClassName('commit_3_3')[0].innerHTML='观众头像url：'+newComment.avatar;
          document.getElementsByClassName('commit_3_4')[0].innerHTML='评论内容：'+newComment.message;

        }
      )
  
// =======================================================================================================================================


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
        var ucky_join_type=document.getElementById('lucky_join_type')
        var lucky_auto_open=document.getElementById('lucky_auto_open')
        var lucky_lucy_count=document.getElementById('lucky_lucky_count')


        lucky.innerHTML=response.data.lucky_draw.award_name;
        luckytime.innerHTML=response.data.lucky_draw.deadline;
        ucky_join_type.innerHTML=response.data.lucky_draw.join_type;
        lucky_auto_open.innerHTML=response.data.lucky_draw.auto_open;
        lucky_lucy_count.innerHTML=response.data.lucky_draw.lucky_count;
      }   
      )  

      Mudu.MsgBus.On(
        // 事件名，值为LuckyDraw.Open
        "LuckyDraw.Open",
      
        // 事件处理函数
        function (response) {
          var response = JSON.parse(response)
          console.log('开奖啦')
          document.getElementsByClassName('lucky_3_1')[0].innerHTML='LuckyDraw.Open事件：开奖了，成功被触发！';
          timer=setTimeout(function () {
            document.getElementsByClassName('lucky_3_1')[0].innerHTML='LuckyDraw.Open事件';   
        }, 10000); 


        })




}
);

// =======================================================================================================================================
// 播放器组件事件类

// 判断播放是否初始化成功，Player.Ready事件会在播放器初始化完成被触发
Mudu.MsgBus.On(
    // 事件名，值为Player.Ready
    'Player.Ready',  
    // 事件处理函数，参数为当前player组件对象
    function (player) {
        console.log('Mudu Player 播放器初始化完成')
        document.getElementsByClassName('play_0_1')[0].innerHTML='Mudu Player 播放器初始化完成';
    }
    )
// ---------------------------------------------------------------------------------------------------------------------------------------
// Player.Ready事件会在播放器初始化完成被触发
Mudu.MsgBus.On(
    // 事件名，值为Player.Ready
    'Player.Ready',

    // 事件处理函数，参数为当前player组件对象
    function (player) {
    console.log('Mudu Player 播放器初始化完成')
    document.getElementsByClassName('play_8_1')[0].innerHTML='Player.Ready事件：播放器初始化完成，成功被触发';
    timer=setTimeout(function () {
        document.getElementsByClassName('play_8_1')[0].innerHTML='Player.Ready事件';   
    }, 5000); 
    }
)    

// Player.Play事件会在播放器开始播放时被触发
Mudu.MsgBus.On(
  // 事件名，值为Player.Play
  'Player.Play', 

  // 事件处理函数，参数为当前player组件对象
  function (player) {
    console.log('Mudu Player 播放开始')
    document.getElementsByClassName('play_9_1')[0].innerHTML='Player.Play事件：播放器开始播放，成功被触发';
    timer=setTimeout(function () {
        document.getElementsByClassName('play_9_1')[0].innerHTML='Player.Play事件';   
    }, 5000); 
  }
)

// Player.Stoped事件会在播放器停止播放时被触发
Mudu.MsgBus.On(
  // 事件名，值为Player.Play
  "Player.Stoped",

  // 事件处理函数，参数为当前player组件对象
  function (player) {
    console.log('Mudu Player 停止播放')
    document.getElementsByClassName('play_10_1')[0].innerHTML='Player.Stoped事件：播放器停止播放，成功被触发';
    timer=setTimeout(function () {
        document.getElementsByClassName('play_10_1')[0].innerHTML='Player.Stoped事件';   
    }, 5000); 
  }
)

// Player.Waiting事件会在播放器缓冲时被触发
Mudu.MsgBus.On(
  // 事件名，值为Player.Waiting
  "Player.Waiting",

  // 事件处理函数，参数为当前player组件对象
  function (player) {
    console.log('Mudu Player 缓冲中')
    document.getElementsByClassName('play_11_1')[0].innerHTML='Player.Waiting事件：播放器缓冲，成功被触发';
    timer=setTimeout(function () {
        document.getElementsByClassName('play_11_1')[0].innerHTML='Player.Waiting事件';   
    }, 5000); 
  }
)

// =======================================================================================================================================





























// =======================================================================================================================================

// function类
// 重新设置用户信息
function setUser(){

    // 情景一： 在调用sdk的init方法之前，希望设置默认的用户昵称和头像 （仅对初次进入的用户有效） 注：该观众仍为匿名观众，不能参与投票
    // 在cookie中设置muduapi_user、muduapi_avatar，这两项的值必须使用encodeURIComponent方法encode key | value ---|--- 
    // muduapi_user | encodeURIComponent(用户名)
    // muduapi_avatar | encodeURIComponent(头像网络地址)
    // 情景二： 希望给匿名用户赋予身份 或 更新当前用户的头像、昵称等信息
    // 需要在sdk 初始化成功后才能使用

    var set_name = document.getElementsByClassName('set_name')[0].value
    var set_avatar = document.getElementsByClassName('set_avatar')[0].value
    var set_assign_id = document.getElementsByClassName('set_assign_id')[0].value
    var Callback = 'function(){}'
    Mudu.Room.User.Assign(set_name, set_avatar, set_assign_id, Callback)
    alert('设置成功');
    location.reload();

}
// =======================================================================================================================================

// 操作播放器

// 开始播放
function playVedio(){
    player.play();
    document.getElementsByClassName('play_1_1')[0].innerHTML='播放成功';
    timer=setTimeout(function () {
        document.getElementsByClassName('play_1_1')[0].innerHTML='开始播放';   
    }, 2000); 
  }
  // 暂停播放
function pauseVedio(){
    player.pause();
    document.getElementsByClassName('play_2_1')[0].innerHTML='暂停成功';
    timer=setTimeout(function () {
        document.getElementsByClassName('play_2_1')[0].innerHTML='暂停播放';   
    }, 2000);  
  }
  // 停止播放
function stopVedio(){
    player.stop();
    document.getElementsByClassName('play_3_1')[0].innerHTML='停止成功';
    timer=setTimeout(function () {
        document.getElementsByClassName('play_3_1')[0].innerHTML='停止播放';   
    }, 2000); 
  }
// 设置进度条消失3秒后恢复
function setControls(){
    player.setControls(
        // true设置显示, false设置不显示
        false
    )
    timer=setTimeout(function () {
        player.setControls(
            // true设置显示, false设置不显示
            true
        ) 
    }, 3000); 
}
// 设置窗口缩小3秒后恢复
function setPlayerSize(){
    player.setPlayerSize(
        // 宽度，单位为像素
        160,
      
        // 高度，单位为像素
        90
      )
      timer=setTimeout(function () {
        player.setPlayerSize(
            // 宽度，单位为像素
            320,
          
            // 高度，单位为像素
            180
          )
    }, 3000); 
}
// idle表示播放器空闲(未开始播放), buffering表示播放器正在缓冲, playing表示播放器正在播放, paused表示播放器处于暂停播放状态。
function getstate(){
    var state = player.getState()
    console.log(state)
    if(state == 'idle'){
        alert('idle:未开始播放')
    }else if(state == 'buffering'){
        alert('buffering:正在缓冲')
    }else if(state == 'playing'){
        alert('playing:正在播放')
    }else if(state == 'paused'){
        alert('paused:暂停播放')
    }
}
// 加载新的播放地址
function loadnew(){
    var newadrr = 'https://myun-hw-s3.myun.tv/melj80jz/093kxja0/n0d9kvbl/zlxzxkk5_1553080329105012847_480p.m3u8'
    var newimage = 'https://cdn13.mudu.tv/assets/upload/155646148686924.jpeg'

    player.load([
        {
            // isLive 非必需 boolean 控制播放器的ui展示,默认为false; 根据播放视频的实际情况填写
            isLive: false,
            file: newadrr,
            image: newimage,
            // 非必须 isLive为false时展示在时间进度条上的高亮点，hover时可展示text字段内容 （视频为回看视频时，会默认添加高亮信息，设置为[]可覆盖）
            highlights: [{
              time: 10, // int
              text: '播放节点' // string
            }]
        }
    ])

    var description1 = document.createElement('div');
    description1.setAttribute('class','newadrr');
    var desctext = document.createTextNode('新播放地址：'+newadrr);
    description1.appendChild(desctext);
    document.getElementsByClassName('play_7')[0].appendChild(description1);

    var description2 = document.createElement('div');
    description2.setAttribute('class','newimage');
    var desctext = document.createTextNode('新封面：'+newimage);
    description2.appendChild(desctext);
    document.getElementsByClassName('play_7')[0].appendChild(description2);

    timer=setTimeout(function () {
        document.getElementsByClassName('play_7')[0].removeChild(description1);
        document.getElementsByClassName('play_7')[0].removeChild(description2);
    }, 5000); 

}
// =======================================================================================================================================

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
            console.log('发送成功');
            alert('发送成功');
        }
        if (response.status === 'n') {
            console.log('发送失败，错误码为：' + response.flag+'错误提示：'+response.info)
            alert('发送失败，错误码为：' + response.flag+'错误提示：'+response.info);
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
                    document.getElementsByClassName("check_history")[0].insertBefore(pagelist, firstLi);
                  } else {
                    document.getElementsByClassName("check_history")[0].appendChild(pagelist);
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

// =======================================================================================================================================
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
// 清楚报名框内容
  function clearsign(){
    document.getElementsByClassName('uname')[0].value='';
    document.getElementsByClassName('phone')[0].value='';
  }
// =======================================================================================================================================
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

// =======================================================================================================================================
//




