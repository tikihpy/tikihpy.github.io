
// 输入想要测试的频道ID,点击设置后重新初始化,将这个值传到url中
function setactid(){
    // 往url中传入参数
    function updateQueryStringParameter(uri, key, value) {
        if(!value) {
            return uri;
        }
        var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        var separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        }
        else {
            return uri + separator + key + "=" + value;
        }
    }
    // 传入对应参数       
    var newurl = updateQueryStringParameter(window.location.href, 'id', document.getElementsByClassName('act_id')[0].value);

    //传入参数后刷新页面，重新初始化
    window.location.href = newurl
}



// 从URL中获取到频道ID
function GetQueryString(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
    var context = ""; 
    if (r != null) 
       context = r[2]; 
    reg = null; 
    r = null; 
    return context == null || context == "" || context == "undefined" ? "" : context; 
}

// ！！！！！！必须是企业版的账号频道！！！！！！！！！！！！！
// 线上
var paramId = GetQueryString('id') || 185053;

// 5号测试服
// var paramId = GetQueryString('id') || 10003199;

Mudu.Init(

    // 线上频道id
    // 185053
    paramId,
    // 测试服频道ID
    // 10003046,
    // 10003187,
    // 10003171,
    // 测试服子账号
    // 10003145,
    // 线上预告回看带PPT
    // 164614,
  
  
    // 初始化完成的回调函数，无参数
    function () {
      console.log('Mudu Web Sdk 初始化成功')
      document.getElementsByClassName('init_0_1')[0].innerHTML='一、Mudu Web Sdk 初始化成功';

    // 获取当前webSDK版本，返回string， 如: 1.2.1
    var version = Mudu.GetVersion();
    console.log('WebSDK_Version：'+version);
    document.getElementsByClassName('version')[0].innerHTML='WebSDK_Version：'+version;
    

    // 在sdk 初始化成功后才可以获取当前的用户信息
      var userdata = Mudu.Room.User.GetUser()
      console.log(userdata);
      var name=userdata.name
      var id=userdata.id
      var assign_id=userdata.assign_id
      var avatar=userdata.avatar
      document.getElementsByClassName('name')[0].innerHTML='name：'+name;
      document.getElementsByClassName('id')[0].innerHTML='id：'+id;
      document.getElementsByClassName('assign_id')[0].innerHTML='assign_id：'+assign_id;
      document.getElementsByClassName('avatar')[0].innerHTML='avatar：'+avatar;

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
    console.log('直播间名字：'+roomName);
    document.getElementsByClassName('room_0_1')[0].innerHTML="一、直播间名字："+roomName;


    // 返回直播状态，类型为number: `1`为正在直播，`0`为不在直播
    var roomLiveStatus = Mudu.Room.GetLiveStatus()
    console.log("直播状态："+roomLiveStatus);
    document.getElementsByClassName('room_1_1')[0].innerHTML="二、直播状态："+roomLiveStatus;


    // 返回直播间浏览量，类型为number整数
    var roomViewNum = Mudu.Room.GetViewNum()
    console.log("直播间浏览量："+roomViewNum);
    document.getElementsByClassName('room_2_1')[0].innerHTML="三、直播间浏览量："+roomViewNum;


    // 返回直播间视频地址，类型为string
    var roomPlayAddr = Mudu.Room.GetPlayAddr()
    console.log("直播间视频地址："+roomPlayAddr);
    document.getElementsByClassName('room_3_1')[0].innerHTML="四、直播间视频地址："+roomPlayAddr;


    // 返回直播间视频地址列表，类型为array
    var roomPlayAddr = Mudu.Room.GetPlayList()
    console.log("直播间视频地址列表："+roomPlayAddr);
    document.getElementsByClassName('room_4_1')[0].innerHTML="五、直播间视频地址列表如下：";

    for(var i=0; i<roomPlayAddr.length;i++){

        var description = document.createElement('div');
        description.setAttribute('class','roomPlayAddrs');
        var desctext = document.createTextNode('地址序列'+'['+ i +']'+'：'+roomPlayAddr[i].address);
        description.appendChild(desctext);
        document.getElementsByClassName('room_4_1')[0].appendChild(description);
    }
// =======================================================================================================================================

    // 返回视频回看配置
    var trailer = Mudu.Room.GetTrailer()
    console.log(trailer);

  

    document.getElementsByClassName('room_5_1')[0].innerHTML="六、视频回看配置如下：";

        var m3u8=trailer.m3u8
        var state=trailer.open
        var imge =trailer.trailer_img

        var description1 = document.createElement('div');
        description1.setAttribute('class','trailer');

        var description2= document.createElement('p');
        description2.setAttribute('class','trailer_m3u8');
        var desctext = document.createTextNode('1.地址序列：'+m3u8);
        description2.appendChild(desctext);

        var description3= document.createElement('p');
        description3.setAttribute('class','trailer_state');
        var desctext = document.createTextNode('2.是否开启回看：'+state);
        description3.appendChild(desctext);

        var description4= document.createElement('p');
        description4.setAttribute('class','trailer_img');
        var desctext = document.createTextNode('3.回看背景图：'+imge);
        description4.appendChild(desctext);
        
        description1.appendChild(description2);
        description1.appendChild(description3);
        description1.appendChild(description4);

        document.getElementsByClassName('room_5_1')[0].appendChild(description1);

        // 回看视频窗口
        var player = new Mudu.Player(
            {
                // 必须，播放器容器ID，播放器会被添加到该DOM元素中
                containerId: 'yugaoplayer',
        
                // 非必需 boolean 控制播放器的ui展示, 默认为false; 根据播放视频的实际情况填写
                isLive: state,
        
                // 必须，播放器视频播放地址
                src: m3u8,
        
                // 非必须，播放器海报图 string
                image: imge,
        
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
                // highlights: [{
                // time: 1, // int,
                // text: '大会开始' // string
                // }]
            }
            
            )

// =======================================================================================================================================

    // 返回直播间自定义菜单, 类型为Array
    var menus = Mudu.Room.GetMenus()
    console.log(menus);
    document.getElementsByClassName('room_6_1')[0].innerHTML="七、自定义菜单如下，具体开F12查看菜单参数：";

    for(var i=0;i<menus.length;i++){


        var menusdescription = document.createElement('div');
        menusdescription.setAttribute('class','menus');

        var menudata = document.createElement('div');
        menudata.setAttribute('class','menudata');

        var menudataname = document.createElement('p');
        menudataname.setAttribute('class','menudataname');
        var desctext = document.createTextNode('菜单名称'+i+"："+menus[i].menu_name);
        menudataname.appendChild(desctext);
        menudata.appendChild(menudataname);
        menusdescription.appendChild(menudata);
        document.getElementsByClassName('room_6_1')[0].appendChild(menusdescription);


       
      
        if (menus[i].menu_cate==3){
            // 判断是视频菜单
            var video_area = document.createElement('div');
            video_area.setAttribute('class','video_area');
            menudata.appendChild(video_area);

            for(var j=0;j<menus[i].videos.length;j++){

                var videoall = document.createElement('div');
                videoall.setAttribute('class','videoall');

                var video = document.createElement('div');
                var idattr = 'J_prismPlayer'+j;
                video.setAttribute('id',idattr);

                var videoname = document.createElement('p');
                videoname.setAttribute('class','video_name_p');
                var n=j+1;
                var desctext = document.createTextNode("视频名称"+n+'：'+menus[i].videos[j].name);
                videoname.appendChild(desctext);
                
                var videourl = document.createElement('p');
                videourl.setAttribute('class','video_url_p');
                var desctextvideourl= document.createTextNode("视频地址"+n+'：'+menus[i].videos[j].url);
                videourl.appendChild(desctextvideourl);
 
                videoall.appendChild(video);
                videoall.appendChild(videoname);
                videoall.appendChild(videourl);

                video_area.appendChild(videoall);

                var playadr = menus[i].videos[j].url;
                var playimg = menus[i].videos[j].thumb_url

                var player = new Mudu.Player(
                    {
                        // 必须，播放器容器ID，播放器会被添加到该DOM元素中
                        containerId: idattr,
                
                        // 非必需 boolean 控制播放器的ui展示, 默认为false; 根据播放视频的实际情况填写
                        // isLive: state,
                
                        // 必须，播放器视频播放地址
                        src: playadr,
                
                        // 非必须，播放器海报图 string
                        image: playimg,
                
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
                        width: 160,
                
                        // 非必须，播放器高度，单位为像素，默认为270
                        height: 90,
                
                        // 以下x5Layer和x5Inline两个参数用于解决安卓微信、QQ、QQ浏览器的只能全屏播放的问题。参数仅对安装过tbs(腾讯浏览服务，一般安装过QQ浏览器后手机上会存在)手机生效(由于tbs的api限制，部分低版本的微信、QQ、QQ浏览器可能不会生效)，未安装tbs的安卓手机不会有只能全屏播放的问题。
                        // x5Layer和x5Inline只能有一个被设置为true
                
                        // 非必须，播放器在安卓微信、QQ、QQ浏览器中是否同层播放, 默认false  （注：同层播放时，页面document无法滚动(内部的dom元素可以)，如果播放器宽度小于浏览器宽度，两边将出现黑边）
                        x5Layer: false,
                
                        // 非必须，播放器在安卓微信、QQ、QQ浏览器中是否inline播放，默认false  （注：inline播放时，播放器始终处于z-index的最上层，因此无法在播放器上叠加元素）
                        x5Inline: false,
                
                        // 非必须 isLive为false时展示在时间进度条上的高亮点，hover时可展示text字段内容 （视频为回看视频时，会默认添加高亮信息，设置为[]可覆盖）
                        // highlights: [{
                        // time: 1, // int,
                        // text: '大会开始' // string
                        // }]
                    }                   
                    )
            }
        }else if(menus[i].menu_cate==2){
            // 判断是添加图文菜单
            var imgtext = document.createElement('div')
            imgtext.innerHTML = menus[i].act_detail
            menudata.appendChild(imgtext)
        }

    }

// =======================================================================================================================================

    // 返回直播间自定义广告栏, 类型为Array
    var ads = Mudu.Room.GetBanners();
    console.log(ads);
    document.getElementsByClassName('room_7_1')[0].innerHTML="八、自定义广告栏如下，具体开F12查看菜单参数：";

        for(var j=0;j<ads.length;j++){

            var ads_area = document.createElement('div');
            ads_area.setAttribute('class','guanggao_area');

            if(ads[j].img==''){
                // 添加文字广告栏
                var adsall = document.createElement('p');
                adsall.setAttribute('class','guanggao_p');
                var desctext = document.createTextNode('广告栏'+j+"：");
                adsall.appendChild(desctext);
                ads_area.appendChild(adsall);

                var textads = document.createElement('span');
                textads.setAttribute('class','textguanggao');
                var desctext = document.createTextNode(ads[j].text);
                textads.appendChild(desctext);
                ads_area.appendChild(textads);


                var ads_url = document.createElement('a');
                ads_url.setAttribute('class','guanggao_url');
                ads_url.setAttribute('href',ads[j].href);
                var desctext = document.createTextNode(ads[j].href);
                ads_url.appendChild(desctext);
                ads_area.appendChild(ads_url);
            }else{
                // 添加图片广告栏
                var adsall = document.createElement('p');
                adsall.setAttribute('class','guanggao_p');
                var desctext = document.createTextNode('广告栏'+j+"：");
                adsall.appendChild(desctext);
                ads_area.appendChild(adsall);
               
                var imgads = document.createElement('img');
                imgads.setAttribute('class','imgads');
                imgads.setAttribute('src',ads[j].img);
                ads_area.appendChild(imgads);
    
                var ads_url = document.createElement('a');
                ads_url.setAttribute('class','guanggao_url');
                ads_url.setAttribute('href',ads[j].href);
                var desctext = document.createTextNode(ads[j].href);
                ads_url.appendChild(desctext);
                ads_area.appendChild(ads_url);
            }
          document.getElementsByClassName('room_7_2')[0].appendChild(ads_area);            
    }
   

// =======================================================================================================================================

    // 返回直播间主题名称, 类型为string： 目前有两个值(default, tech)
    var activeTheme = Mudu.Room.GetActiveTheme()
    console.log(activeTheme);
    document.getElementsByClassName('room_8_1')[0].innerHTML="九、直播间主题名称："+activeTheme;


    // 返回直播间主题配置，类型为Array
    var themes = Mudu.Room.GetThemes()
    console.log(themes);
    document.getElementsByClassName('room_9_1')[0].innerHTML="十、直播间主题配置名称如下：";

    var themesdiv = document.createElement('div');
    themesdiv.setAttribute('class','themes');
    for(var n=0;n<themes.length;n++){
        var Themes = document.createElement('p');
        Themes.setAttribute('class','theme');
        var desctext = document.createTextNode('主题配置'+n+"："+themes[n].name);
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

            document.getElementsByClassName('room_10_1')[0].innerHTML="十一、Room.StreamEvent事件："+msg;
            timer=setTimeout(function () {
                document.getElementsByClassName('room_10_1')[0].innerHTML="十一、Room.StreamEvent事件";
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
            console.log('收到新的弹幕，内容为： ', barrage.text)
            document.getElementsByClassName('danmu_1_1')[0].innerHTML='二、收到新的弹幕： ';
            timer=setTimeout(function () {
                document.getElementsByClassName('danmu_1_1')[0].innerHTML='Barrage.New事件';   
            }, 10000); 


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
    document.getElementsByClassName('commit_0_1')[0].innerHTML='一、评论总页数：'+commentPage; 


    Mudu.MsgBus.On(
        // 事件名，值为Comment.New
        'Comment.New', 
      
        // 事件处理函数，参数为新的评论，类型为object
        function (newComment) {
          newComment = JSON.parse(newComment)
          console.log(newComment.username + '发送了一条新评论： ' + newComment.message)

          document.getElementsByClassName('commit_3_2')[0].innerHTML='1、观众名：'+newComment.username;
          document.getElementsByClassName('commit_3_3')[0].innerHTML='2、观众头像url：'+newComment.avatar;
          document.getElementsByClassName('commit_3_4')[0].innerHTML='3、评论内容：'+newComment.message;

          document.getElementsByClassName('commit_3_2')[0].style.color='blue';
          document.getElementsByClassName('commit_3_3')[0].style.color='blue';
          document.getElementsByClassName('commit_3_4')[0].style.color='blue';

          timer=setTimeout(function () {
          document.getElementsByClassName('commit_3_2')[0].innerHTML='1、观众名：';
          document.getElementsByClassName('commit_3_3')[0].innerHTML='2、观众头像url：';
          document.getElementsByClassName('commit_3_4')[0].innerHTML='3、评论内容：';

          document.getElementsByClassName('commit_3_2')[0].style.color='';
          document.getElementsByClassName('commit_3_3')[0].style.color='';
          document.getElementsByClassName('commit_3_4')[0].style.color='';

        }, 5000); 


        // 添加聊天记录
        var list = document.createElement('li');
        list.setAttribute('class','msg_area');
        
        var alertcmt = document.createElement("img");
        alertcmt.setAttribute('class','img');
        alertcmt.setAttribute('src',newComment.avatar);


        var comment_name = document.createElement('span');
        comment_name.setAttribute('class','comment_name');
        var desctext = document.createTextNode(newComment.username+'：');
        comment_name.appendChild(desctext);

        var description = document.createElement('span');
        description.setAttribute('class','msg');
        var desctext = document.createTextNode(newComment.message);
        description.appendChild(desctext);

        list.appendChild(alertcmt);
        list.appendChild(comment_name);
        list.appendChild(description);
        

        // document.getElementsByTagName('ol')[0].appendChild(list);
        var firstLi = document.getElementsByClassName('msg_area')[0]
        if (newComment.checked==1){
            if (firstLi) {
              document.getElementsByClassName('comments_history')[0].insertBefore(list, firstLi);

            } else {
              document.getElementsByClassName('comments_history')[0].appendChild(list);
            }
        }else{
          alert('评论等待审核');
        }




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
          document.getElementsByClassName('lucky_3_1')[0].innerHTML='四、LuckyDraw.Open事件：开奖了，成功被触发！';
          timer=setTimeout(function () {
            document.getElementsByClassName('lucky_3_1')[0].innerHTML='四、LuckyDraw.Open事件';   
        }, 10000); 


        })
// =======================================================================================================================================
    // GetUrl 获取当前控制台PPT图片地址
    // 返回string, 如果为空字符串, 则表示控制台未选择ppt
    var url = Mudu.Room.PPT.GetUrl()

    document.getElementsByClassName('getcurppt_url')[0].innerHTML='一、初始化控制台PPT图片地址：'+url;
    var description = document.createElement('img');
    description.setAttribute('class','ppt_img');
    description.setAttribute('src',url); 
    document.getElementsByClassName('showppt')[0].appendChild(description);

    // GetName 获取ppt名称
    // 返回string
    var name = Mudu.Room.PPT.GetName()
    document.getElementsByClassName('ppt_1_1')[0].innerHTML='二、ppt名称：'+name;

    // GetCurrentPage 获取当前控制台ppt所在页数
    // 返回number, 从1开始
    var currentPage = Mudu.Room.PPT.GetCurrentPage()
    document.getElementsByClassName('ppt_2_1')[0].innerHTML='三、当前控制台ppt所在页数：'+currentPage;

    // GetTotalPage 获取当前ppt总页数
    // 返回number
    var totalPage = Mudu.Room.PPT.GetTotalPage()
    document.getElementsByClassName('ppt_3_1')[0].innerHTML='四、当前ppt总页数：'+totalPage;

    // IsOpen 获取控制台是否开启显示PPT
    // 返回boolean, true为开启, false为关闭
    var isOpen = Mudu.Room.PPT.IsOpen()
    document.getElementsByClassName('ppt_4_1')[0].innerHTML='五、控制台是否开启显示PPT：'+isOpen;


    // GetAllowTurnPage 获取控制台是否允许用户翻页
    // 返回boolean, true为允许, false为禁止
    var allowTurnPage = Mudu.Room.PPT.GetAllowTurnPage()
    document.getElementsByClassName('ppt_5_1')[0].innerHTML='六、控制台是否允许用户翻页：'+allowTurnPage;

// =======================================================================================================================================
// PPT触发事件类
    // PPT.Changed事件会在控制台进行ppt翻页时触发

    Mudu.MsgBus.On('PPT.Changed', function (response) {
        response = JSON.parse(response)
        console.log(response)
        document.getElementsByClassName('ppt_7_1')[0].innerHTML='八、PPT.Changed事件：PPT翻页了，成功被触发！';

        var page = response.page
        var total_page = response.total_page
        var url = response.url

        var description = document.createElement('p');
        description.setAttribute('class','changed_total_page');
        var desctext = document.createTextNode('控制台当前ppt的总页数：'+total_page);
        description.appendChild(desctext);
        document.getElementsByClassName('ppt_7_1')[0].appendChild(description);

        var description = document.createElement('p');
        description.setAttribute('class','changed_page');
        var desctext = document.createTextNode('ppt当前所在页数：'+page);
        description.appendChild(desctext);
        document.getElementsByClassName('ppt_7_1')[0].appendChild(description);

        var description = document.createElement('img');
        description.setAttribute('class','changed_ppt_img');
        description.setAttribute('src',url);
        document.getElementsByClassName('ppt_7_1')[0].appendChild(description);

        timer=setTimeout(function () {
            document.getElementsByClassName('ppt_7_1')[0].innerHTML='八、PPT.Changed事件';   
        }, 30000);
    })


    // PPT.IsOpen事件会在控制台切换ppt“观看页显示”时被触发

    Mudu.MsgBus.On('PPT.IsOpen', function (response) {
        response = JSON.parse(response)
        console.log(response)
        document.getElementsByClassName('ppt_8_1')[0].innerHTML='九、PPT.IsOpen事件：切换ppt“观看页显示”，成功被触发！';

        var open = response.open
        var description = document.createElement('p');
        description.setAttribute('class','changed_open');
        var desctext = document.createTextNode('切换后观看页是否显示【1显示, 0显示】：'+'【'+open+'】');
        description.appendChild(desctext);
        document.getElementsByClassName('ppt_8_1')[0].appendChild(description);

        timer=setTimeout(function () {
            document.getElementsByClassName('ppt_8_1')[0].innerHTML='九、PPT.IsOpen事件';   
        }, 30000);
    })

    // PPT.AllowTurnPage事件会在控制台切换ppt“允许用户翻页”时被触发

    Mudu.MsgBus.On('PPT.AllowTurnPage', function (response) {
        response = JSON.parse(response)
        console.log(response)
        document.getElementsByClassName('ppt_9_1')[0].innerHTML='十、PPT.AllowTurnPage事件：切换ppt“允许用户翻页”，成功被触发！';


       var is_turn_page = response.is_turn_page
       var description = document.createElement('p');
       description.setAttribute('class','changed_open');
       var desctext = document.createTextNode('切换后是否允许用户翻页【1允许, 0禁止】：'+'【'+is_turn_page+'】');
       description.appendChild(desctext);
       document.getElementsByClassName('ppt_9_1')[0].appendChild(description);


        timer=setTimeout(function () {
            document.getElementsByClassName('ppt_9_1')[0].innerHTML='十、PPT.AllowTurnPage事件';   
        }, 30000);
    })

    // PPT.Doc.delete事件会在控制台删除当前ppt时被触发

    Mudu.MsgBus.On('PPT.Doc.delete', function () {
        // 无参数
        console.log('ppt被删了')
        document.getElementsByClassName('ppt_10_1')[0].innerHTML='十一、PPT.Doc.delete事件：控制台删除当前ppt，成功被触发！';
        timer=setTimeout(function () {
            document.getElementsByClassName('ppt_10_1')[0].innerHTML='十一、PPT.Doc.delete事件';   
        }, 30000);
    })

    // PPT.trailer.changed 事件会在播放器播放回看视频时, 当前视频节点上有ppt时被触发

    Mudu.MsgBus.On('PPT.trailer.changed', function (data) {
        var ppt_url = data.currentUrl
        console.log('当前视频节点的ppt图片地址是', ppt_url)
        document.getElementsByClassName('ppt_11_1')[0].innerHTML='十二、PPT.trailer.changed 事件：回看节点上有ppt，成功被触发！';
        timer=setTimeout(function () {
            document.getElementsByClassName('ppt_11_1')[0].innerHTML='十二、PPT.trailer.changed 事件';   
        }, 30000);
    })

// =======================================================================================================================================
    // 投票组件
    //获取投票信息
    Mudu.Room.Vote.Get(function (response) {
        response = JSON.parse(response)
        if (response.status === 'y') {
        console.log('投票获取成功，数据为：', response.data)

        document.getElementsByClassName('vote_0_1')[0].innerHTML='一、获取投票信息,具体打开F12查看：'

        // 投票名称
        var vote_name= response.data.vote_name
        var description = document.createElement('p');
        description.setAttribute('class','vote_name');
        var desctext = document.createTextNode('投票名称：'+vote_name);
        description.appendChild(desctext);
        document.getElementsByClassName('vote_0_1')[0].appendChild(description);

        // 投票截止时间
        var end_time=response.data.end_time
        var description = document.createElement('p');
        description.setAttribute('class','end_time');
        var desctext = document.createTextNode('投票截止时间：'+end_time);
        description.appendChild(desctext);
        document.getElementsByClassName('vote_0_1')[0].appendChild(description);

        // 是否向用户开放
        var view_enable=response.data.view_enable
        var description = document.createElement('p');
        description.setAttribute('class','view_enable');
        var desctext = document.createTextNode('投票是否开放：'+view_enable);
        description.appendChild(desctext);
        document.getElementsByClassName('vote_0_1')[0].appendChild(description);

        // vote_id
        var vote_id=response.data.id
        var description = document.createElement('p');
        description.setAttribute('class','vote_id');
        var desctext = document.createTextNode('vote_id：'+vote_id);
        description.appendChild(desctext);
        document.getElementsByClassName('vote_0_1')[0].appendChild(description);


        // 投票选项
        for(var i=0;i<response.data.questions.length;i++){
            var n=i+1;

            var description = document.createElement('div');
            description.setAttribute('class','vote_content_area');
            // 判断单选还是多选
            if(response.data.questions[i].question_multi==1){

                var vote_content_name = document.createElement('div');
                vote_content_name.setAttribute('class','vote_content_name');
                var desctext = document.createTextNode('选择题'+n+'：'+response.data.questions[i].question_name+'【'+'单选题'+'】');
                vote_content_name.appendChild(desctext);
                description.appendChild(vote_content_name);

            }else if(response.data.questions[i].question_multi ==2){

                var vote_content_name = document.createElement('div');
                vote_content_name.setAttribute('class','vote_content_name');
                var desctext = document.createTextNode('选择题'+n+'：'+response.data.questions[i].question_name+'【'+'多选题'+'】');
                vote_content_name.appendChild(desctext);
                description.appendChild(vote_content_name);

            }

            // 遍历所有选择题及其选项
            for(var j=0;j<response.data.questions[i].items.length;j++){
                var k=j+1;

                var vote_name_imge = document.createElement('div');
                vote_name_imge.setAttribute('class','vote_name_imge');
    
                // 判断是图文还是文字选择题
                if(response.data.questions[i].items[j].image== null){
                    var vote_content_item_name = document.createElement('div');
                    vote_content_item_name.setAttribute('class','vote_content_item_name');
                    var desctext = document.createTextNode('选项'+k+'：'+response.data.questions[i].items[j].item_name);
                    vote_content_item_name.appendChild(desctext);
                    description.appendChild(vote_content_item_name);

                }else{
                    var vote_content_item_name = document.createElement('div');
                    vote_content_item_name.setAttribute('class','vote_content_item_name');
                    var desctext = document.createTextNode('选项'+k+'：'+response.data.questions[i].items[j].item_name);
                    vote_content_item_name.appendChild(desctext);
                    var vote_content_item_image = document.createElement('img');
                    vote_content_item_image.setAttribute('class','vote_content_item_image');
                    vote_content_item_image.setAttribute('src',response.data.questions[i].items[j].image);
            
                    vote_name_imge.appendChild(vote_content_item_name);
                    vote_name_imge.appendChild(vote_content_item_image);

                    description.appendChild(vote_name_imge);

                }
            }
           

            document.getElementsByClassName('vote_0_1')[0].appendChild(description);


        }
        }
        if (response.status === 'n') {
        console.log('投票获取失败')
        document.getElementsByClassName('vote_0_1')[0].innerHTML='一、获取投票信息失败，检查控制台是否开启投票功能'

        }
    })

    // Vote.Changed事件会在投票状态改变(一般为后台关闭或开启投票)的时候被触发
    Mudu.MsgBus.On(
        // 事件名，值为Vote.Changed
        "Vote.Changed",   
        // 事件处理函数
        function (response) {
          var response = JSON.parse(response)
          console.log('投票状态改变'+response)
        // 是否向用户开放
        var view_enable=response.data.view_enable
        document.getElementsByClassName('vote_2_1')[0].innerHTML='三、Vote.Changed事件：投票状态改变，成功触发！当前状态：【'+view_enable+'】';
        })

// =======================================================================================================================================
    //  报名问卷组件

    // 返回null获取报名问卷配置, 类型为object
    var signupConfig = Mudu.Room.Signup.GetConfig()
    console.log('报名问卷数据：',signupConfig);

    var id	=signupConfig.id
    var description = document.createElement('p');
    description.setAttribute('class','sign_id');
    var desctext = document.createTextNode('报名问卷ID：'+id);
    description.appendChild(desctext);
    document.getElementsByClassName('sign_data')[0].appendChild(description);

    var name=signupConfig.name
    var description = document.createElement('p');
    description.setAttribute('class','sign_name');
    var desctext = document.createTextNode('报名问卷名称：'+name);
    description.appendChild(desctext);
    document.getElementsByClassName('sign_data')[0].appendChild(description);

    var pic=signupConfig.pic
    var description = document.createElement('img');
    description.setAttribute('class','sign_img');
    description.setAttribute('src',pic);
    var desctext = document.createTextNode('报名问卷宣传图：');
    description.appendChild(desctext);
    document.getElementsByClassName('sign_data')[0].appendChild(description);

    var desc=signupConfig.desc
    var description = document.createElement('p');
    description.setAttribute('class','sign_desc');
    var desctext = document.createTextNode('报名问卷描述：'+desc);
    description.appendChild(desctext);
    document.getElementsByClassName('sign_data')[0].appendChild(description);

    var status=signupConfig.status
    var description = document.createElement('p');
    description.setAttribute('class','sign_status');
    var desctext = document.createTextNode('报名问卷状态：'+status);
    description.appendChild(desctext);
    document.getElementsByClassName('sign_data')[0].appendChild(description);

    // var columns=signupConfig.columns
    var description = document.createElement('p');
    description.setAttribute('class','sign_columns');
    var desctext = document.createTextNode('报名问卷内容列表：具体查看F12');
    description.appendChild(desctext);
    document.getElementsByClassName('sign_data')[0].appendChild(description);

    // 获取昵称和手机号type名称
    document.getElementsByClassName('sign_name_des')[0].innerHTML= signupConfig.columns[0].name;
    document.getElementsByClassName('sign_phone_des')[0].innerHTML= signupConfig.columns[1].name;

    // 判断是否有必填项
    var A= signupConfig.columns[0].must
    var B= signupConfig.columns[1].must
    if(A==true){
        document.getElementsByClassName('sign_name_des')[0].innerHTML= signupConfig.columns[0].name+'【'+'必填项'+'】';
    }
    if(B==true){
        document.getElementsByClassName('sign_phone_des')[0].innerHTML= signupConfig.columns[1].name+'【'+'必填项'+'】';
    }
// =======================================================================================================================================

// 话题互动组件

    // 获取话题互动设置：获取话题总页数（pageSize为10）
    // 返回number
    var pages = Mudu.Room.Topic.GetPage()
    document.getElementsByClassName('topic_0_1')[0].innerHTML='一、获取话题总页数：'+pages;



    // 获取话题互动设置：是否允许观众发表话题
    // 返回boolean, true为允许, false为不允许
    var isAllowPublish = Mudu.Room.Topic.GetAllowPublish()
    document.getElementsByClassName('topic_1_1')[0].innerHTML='二、是否允许观众发表话题：'+isAllowPublish;

    // 获取话题互动设置：是否允许观众回复话题
    // 返回boolean, true为允许, false为不允许
    var isAllowReply = Mudu.Room.Topic.GetAllowReply()
    document.getElementsByClassName('topic_2_1')[0].innerHTML='三、是否允许观众回复话题：'+isAllowReply;



    // 获取话题互动设置：发送内容是否需要审核
    // 返回boolean, true为需要审核, false为不需要审核
    var isNeedsCheck = Mudu.Room.Topic.GetNeedsCheck()
    document.getElementsByClassName('topic_3_1')[0].innerHTML='四、发送内容是否需要审核：'+isNeedsCheck;


// =======================================================================================================================================
// 话题互动事件

    // Topic.AllowPublish事件会在控制台话题设置->允许观众发表切换时被触发

    Mudu.MsgBus.On(
        // 事件名，值为Topic.AllowPublish
        'Topic.AllowPublish', 

        // 事件处理函数，参数类型为boolean, true表示允许发表, false表示不允许发表
        function (isAllowPublish) {
            document.getElementsByClassName('topic_7_1')[0].innerHTML='八、Topic.AllowPublish事件：->允许观众发表切换时被触发';
            timer=setTimeout(function () {
                document.getElementsByClassName('topic_7_1')[0].innerHTML='八、Topic.AllowPublish事件'; 
            }, 30000); 
        }
    )



    // Topic.AllowReply事件会在控制台话题设置->允许观众回复切换时被触发

    Mudu.MsgBus.On(
        // 事件名，值为Topic.AllowReply
        'Topic.AllowReply', 

        // 事件处理函数，参数类型为boolean, true表示允许回复, false表示不允许回复
        function (isAllowReply) {
            document.getElementsByClassName('topic_8_1')[0].innerHTML='九、Topic.AllowReply事件：->允许观众发表切换时被触发';
            timer=setTimeout(function () {
                document.getElementsByClassName('topic_8_1')[0].innerHTML='九、Topic.AllowReply事件';
            }, 30000); 

        }
    )


    // Topic.NeedsCheck事件会在控制台话题设置->发送内容需要审核切换时被触发

    Mudu.MsgBus.On(
        // 事件名，值为Topic.NeedsCheck
        'Topic.NeedsCheck', 

        // 事件处理函数，参数类型为boolean, true表示需要审核, false表示不需要审核
        function (isNeedsCheck) {
            document.getElementsByClassName('topic_9_1')[0].innerHTML='十、Topic.NeedsCheck事件：->发送内容需要审核切换时被触发';
            timer=setTimeout(function () {
                document.getElementsByClassName('topic_9_1')[0].innerHTML='十、Topic.NeedsCheck事件';
            }, 30000); 

        }
    )



    // Topic.New事件会在收到新的话题时被触发

    Mudu.MsgBus.On(
        // 事件名，值为Topic.New
        'Topic.New', 

        // 事件处理函数，参数为新收到的topic
        function (topic) {
            topic = JSON.parse(topic)
            document.getElementsByClassName('topic_10_1')[0].innerHTML='十一、Topic.New事件：收到新的话题，成功被触发';
            timer=setTimeout(function () {
                document.getElementsByClassName('topic_10_1')[0].innerHTML='十一、Topic.New事件';
            }, 30000); 
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
            document.getElementsByClassName('topic_11_1')[0].innerHTML='十二、Topic.Top事件：被置顶或者取消置顶，成功被触发';
            timer=setTimeout(function () {
                document.getElementsByClassName('topic_11_1')[0].innerHTML='十二、Topic.Top事件';
            }, 30000); 
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
            document.getElementsByClassName('topic_12_1')[0].innerHTML='十三、Topic.Reply.New事件：收到新的回复，成功被触发';
            timer=setTimeout(function () {
                document.getElementsByClassName('topic_12_1')[0].innerHTML='十三、Topic.Reply.New事件';
            }, 30000); 
        }
    )

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
        document.getElementsByClassName('play_0_1')[0].innerHTML='一、Mudu Player 播放器初始化完成';
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
    document.getElementsByClassName('play_8_1')[0].innerHTML='九、Player.Ready事件：播放器初始化完成，成功被触发';
    timer=setTimeout(function () {
        document.getElementsByClassName('play_8_1')[0].innerHTML='九、Player.Ready事件';   
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
    document.getElementsByClassName('play_9_1')[0].innerHTML='十、Player.Play事件：播放器开始播放，成功被触发';
    timer=setTimeout(function () {
        document.getElementsByClassName('play_9_1')[0].innerHTML='十、Player.Play事件';   
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
    document.getElementsByClassName('play_10_1')[0].innerHTML='十一、Player.Stoped事件：播放器停止播放，成功被触发';
    timer=setTimeout(function () {
        document.getElementsByClassName('play_10_1')[0].innerHTML='十一、Player.Stoped事件';   
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
    document.getElementsByClassName('play_11_1')[0].innerHTML='十二、Player.Waiting事件：播放器缓冲，成功被触发';
    timer=setTimeout(function () {
        document.getElementsByClassName('play_11_1')[0].innerHTML='十二、Player.Waiting事件';   
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
    document.getElementsByClassName('play_1_1')[0].innerHTML='二、播放成功';
    timer=setTimeout(function () {
        document.getElementsByClassName('play_1_1')[0].innerHTML='二、开始播放';   
    }, 2000); 
  }
  // 暂停播放
function pauseVedio(){
    player.pause();
    document.getElementsByClassName('play_2_1')[0].innerHTML='三、暂停成功';
    timer=setTimeout(function () {
        document.getElementsByClassName('play_2_1')[0].innerHTML='三、暂停播放';   
    }, 2000);  
  }
  // 停止播放
function stopVedio(){
    player.stop();
    document.getElementsByClassName('play_3_1')[0].innerHTML='四、停止成功';
    timer=setTimeout(function () {
        document.getElementsByClassName('play_3_1')[0].innerHTML='四、停止播放';   
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
        alert('idle：未开始播放')
    }else if(state == 'buffering'){
        alert('buffering：正在缓冲')
    }else if(state == 'playing'){
        alert('playing：正在播放')
    }else if(state == 'paused'){
        alert('paused：暂停播放')
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

 // 发送评论
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
            document.getElementsByClassName('comment_status')[0].innerHTML='发送成功！'
            timer=setTimeout(function () {
                document.getElementsByClassName('comment_status')[0].innerHTML=''
            }, 500); 
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
    document.getElementsByClassName('ollist')[0].innerHTML='';
  }

// =======================================================================================================================================

// 获取指定页PPT
function getppt(){

var page = document.getElementsByClassName('getppt_page')[0].value;

// GetPageImgUrl 根据页码获取相应的ppt图片地址
// 第一个参数为页码, 第二个参数为获取后的回调函数
Mudu.Room.PPT.GetPageImgUrl( page, function (url) {
    console.log('图片地址为： ', url);
    document.getElementsByClassName('getppt_pageurl')[0].innerHTML='该PPT图片地址：'+url;
    var description = document.createElement('img');
    description.setAttribute('class','getppt_img');
    description.setAttribute('src',url); 
    document.getElementsByClassName('getppt_show')[0].appendChild(description);  
    document.getElementsByClassName('getppt_page')[0].value='';
    timer=setTimeout(function () {
        document.getElementsByClassName('getppt_pageurl')[0].innerHTML='';
        document.getElementsByClassName('getppt_show')[0].innerHTML='';
    }, 4000);    
})
}
// =======================================================================================================================================
// 投票
function vote(){
    
        var vote_id = document.getElementsByClassName('get_vote_id')[0].value;
        var option = {}, options = []
        option[vote_id] = '1|1'
        options.push(option)

    Mudu.Room.Vote.Vote(   
        // //  问题及答案(数组)
        // [
        //     {
        //     // 4265为vote_id
        //     // "1|1" 表示第一个问题，用户的答案是第一个选项
        //     "8896":"1|1"
        //     }
        //     // ,
        //     // {
        //     //   // 4265为vote_id
        //     //   // "2|2,3" 表示第二个问题，用户的答案是第二个选项和第三个选项
        //     //   "4265":"2|2,3"
        //     // }

        // ],  

        options, 
        // 回调函数，参数为response
        function (response) {
          response = JSON.parse(response)
          console.log(response);
          if (response.status === 'y') {
            console.log('投票成功');
            alert('投票成功');
          }
          if (response.status === 'n') {
            console.log('投票失败');
            alert('投票失败：'+response.info);
          }
          if(response.voted==1){
            console.log('投票失败');
            alert('投票失败：'+response.info);
         }
        }
      )
}
// =======================================================================================================================================
// 报名短信验证码
function sendmsg(){
    var sign_msg =document.getElementsByClassName('sign_msg')[0].value
        // 发送报名验证码
        // 注: 发送短信接口每个页面1分钟内只能调用一次, 且发送短信会产生相应的费用
        // 第一个参数为手机号，第二个参数为发送成功或失败的回调函数
        Mudu.Room.Signup.SendSms(
            sign_msg,
            function (response) {
                response = JSON.parse(response)
                console.log(response);
                alert(response.info);

                document.getElementsByClassName('sign_msg')[0].value='';
            }
    )

}

function signsubmit(){


    // 返回null获取报名问卷配置, 类型为object
    var signupConfig = Mudu.Room.Signup.GetConfig()
    // console.log(signupConfig.columns[0].type)
    // console.log(signupConfig.columns[0].name)
    // console.log(signupConfig.columns[1].type)
    // console.log(signupConfig.columns[1].name)


    var signname =document.getElementsByClassName('signname')[0].value;
    console.log(signupConfig.columns[0].name+'：'+signname)
    var signphone =document.getElementsByClassName('sign_phone')[0].value;
    console.log(signupConfig.columns[1].name+'：'+signphone)

    var A= signupConfig.columns[0].must
    var B= signupConfig.columns[1].must
 // 判断A是否必填
    if(A==true){
        if(signname==''){
            alert(signupConfig.columns[0].name+'不能为空！')
            return false;
        }else if(signname!==''){
            // 判断B是否必填
            if(B==true){
                if(signphone==''){
                    alert(signupConfig.columns[1].name+'不能为空！')
                    return false;
                }else if(signphone!==''){
                    var  options = []
                    var option1 = {
                        type: signupConfig.columns[0].type,
                        'name': signupConfig.columns[0].name,
                        text: signname
                    } 
                    var option2 = {
                        type: signupConfig.columns[1].type,
                        'name':signupConfig.columns[1].name,
                        text: signphone
                    }
                    options.push(option1,option2)
                    // 第一个参数为一个对象, code为短信验证码(可不填), columns为question及其答案数组.
                    Mudu.Room.Signup.Submit(
                        {columns: options },
                        function (response) {
                            response = JSON.parse(response)
                            console.log(response);
                            alert(response.info);
                        }
                    )
                    var signname =document.getElementsByClassName('signname')[0].value='';
                    var signphone =document.getElementsByClassName('sign_phone')[0].value='';
                }
            }else if(B==false){
                var  options = []
                var option1 = {
                    type: signupConfig.columns[0].type,
                    'name': signupConfig.columns[0].name,
                    text: signname
                } 
                var option2 = {
                    type: signupConfig.columns[1].type,
                    'name':signupConfig.columns[1].name,
                    text: signphone
                }
                options.push(option1,option2)
                // 第一个参数为一个对象, code为短信验证码(可不填), columns为question及其答案数组.
                Mudu.Room.Signup.Submit(
                    {columns: options },
                    function (response) {
                        response = JSON.parse(response)
                        console.log(response);
                        alert(response.info);
                    }
                )
                var signname =document.getElementsByClassName('signname')[0].value='';
                var signphone =document.getElementsByClassName('sign_phone')[0].value='';           
            }
        }
    }else if(A==false){
         // 判断B是否必填
        if(B==true){
            if(signphone==''){
                alert(signupConfig.columns[1].name+'不能为空！')
                return false;
            }else if(signphone!==''){
                var  options = []
                var option1 = {
                    type: signupConfig.columns[0].type,
                    'name': signupConfig.columns[0].name,
                    text: signname
                } 
                var option2 = {
                    type: signupConfig.columns[1].type,
                    'name':signupConfig.columns[1].name,
                    text: signphone
                }
                options.push(option1,option2)
                // 第一个参数为一个对象, code为短信验证码(可不填), columns为question及其答案数组.
                Mudu.Room.Signup.Submit(
                    {columns: options },
                    function (response) {
                        response = JSON.parse(response)
                        console.log(response);
                        alert(response.info);
                    }
                )
                var signname =document.getElementsByClassName('signname')[0].value='';
                var signphone =document.getElementsByClassName('sign_phone')[0].value='';
            }
        }else if(B==false){
            var  options = []
            var option1 = {
                type: signupConfig.columns[0].type,
                'name': signupConfig.columns[0].name,
                text: signname
            } 
            var option2 = {
                type: signupConfig.columns[1].type,
                'name':signupConfig.columns[1].name,
                text: signphone
            }
            options.push(option1,option2)
            // 第一个参数为一个对象, code为短信验证码(可不填), columns为question及其答案数组.
            Mudu.Room.Signup.Submit(
                {columns: options },
                function (response) {
                    response = JSON.parse(response)
                    console.log(response);
                    alert(response.info);
                }
            )
            var signname =document.getElementsByClassName('signname')[0].value='';
            var signphone =document.getElementsByClassName('sign_phone')[0].value='';      
        }  
    }
}



// =======================================================================================================================================
// 话题互动
function gettopic(){

    var gettopic_msg =document.getElementsByClassName('gettopic_msg')[0].value
    console.log(gettopic_msg)
    
    // 第一个参数为页码，第二个参数为回调函数
    Mudu.Room.Topic.Get(
        +gettopic_msg,
        function (response) {
            // response格式为: {status: 'y', flag: 100, topics: [topicItem1, topicItem2, ...]}
            response = JSON.parse(response)
            console.log(response)

            for(var i=response.topics.length-1;0<=i;i--){

        
                var pagelist = document.createElement('li');
                pagelist.setAttribute('class','gethuatipage');
                // 发送者头像
                var alertcmt = document.createElement("img");
                alertcmt.setAttribute('class','gethuatiavatar');
                alertcmt.setAttribute('src',response.topics[i].avatar);
                // 发送者昵称
                var topic_username = document.createElement('span');
                topic_username.setAttribute('class','topic_username');
                var desctext = document.createTextNode(response.topics[i].username+'：');
                topic_username.appendChild(desctext);
                // 话题内容
                var description = document.createElement('span');
                description.setAttribute('class','gethuatimsg');
                var desctext = document.createTextNode(response.topics[i].message);
                description.appendChild(desctext);

                pagelist.appendChild(alertcmt);
                pagelist.appendChild(topic_username);
                pagelist.appendChild(description);
                // 换行
                var br = document.createElement('br');
                pagelist.appendChild(br);
                // 遍历所有图片
                for(var j=0;j<response.topics[i].images.length;j++){
        
                var alertimgdiv = document.createElement("div");
                alertimgdiv.setAttribute('class','gethuatiimgs');
        
                var alertimg = document.createElement("img");
                alertimg.setAttribute('class','imgsigle');
                alertimg.setAttribute('src',response.topics[i].images[j]);
        
                alertimgdiv.appendChild(alertimg);
                pagelist.appendChild(alertimgdiv);

                }
                // 添加回复内容模块
                var reply_content = document.createElement("div");
                reply_content.setAttribute('class','reply_content');

                var reply_content_des= document.createElement("div");
                reply_content_des.setAttribute('class','reply_content_des');
                var desctext = document.createTextNode("回复内容如下：");
                reply_content_des.appendChild(desctext);
                reply_content.appendChild(reply_content_des);
                // 遍历所有回复内容
                for (var k=0;k<response.topics[i].replies.length;k++){

                    var reply_content_all = document.createElement("div");
                    reply_content_all.setAttribute('class','reply_content_all');
                    var username=response.topics[i].replies[k].username
                    var message=response.topics[i].replies[k].message
                    var desctext = document.createTextNode(username+'：'+message);
                    reply_content_all.appendChild(desctext);
                    reply_content.appendChild(reply_content_all);

                    pagelist.appendChild(reply_content);

                }

                // 获取话题topic_id
                var huati_id = document.createElement("div");
                huati_id.setAttribute('class','huati_id');
                huati_id.setAttribute('style','color: rgb(12, 26, 224);');
                var desctext = document.createTextNode("topic_id："+response.topics[i].id);
                huati_id.appendChild(desctext);
                pagelist.appendChild(huati_id);
        
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
// =======================================================================================================================================

// 发送话题

function sendtopic(){  
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
          document.getElementsByClassName('topic_5_1_status')[0].innerHTML=response.info;
          timer=setTimeout(function () {
            document.getElementsByClassName('topic_5_1_status')[0].innerHTML='';
        }, 1000);    

    
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
            // 添加一行三张图片
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
    
            // 添加一行三张图片 
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
    
    
            // 添加一行三张图片
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
    }
// =======================================================================================================================================

// 回复话题
function reply(){

      // 回复显示

      var replyout = document.createElement('li');
      replyout.setAttribute('class','replyout');


      var rep_topic_id = document.createElement('p');
      rep_topic_id.setAttribute('class','rep_topic_id');
      var text = document.getElementsByClassName('topic_reply_idin')[0].value;
      var rep_topic_id_desctext = document.createTextNode("topic_id："+text);
      rep_topic_id.appendChild(rep_topic_id_desctext);
      replyout.appendChild(rep_topic_id);
      
      var alertcmt = document.createElement("img");
      alertcmt.setAttribute('class','img');
      alertcmt.setAttribute('src','https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2866492045,1432640156&fm=26&gp=0.jpg');
      var description = document.createElement('span');
      description.setAttribute('class','huatimsg');

      var text = document.getElementsByClassName('topic_reply_textin')[0].value;
      var desctext = document.createTextNode(text);

      description.appendChild(desctext);
      replyout.appendChild(alertcmt);
      replyout.appendChild(description);
      
      var topic_reply_history = document.getElementsByClassName('topic_reply_history')[0];
      topic_reply_history.appendChild(replyout);

      var topicId =document.getElementsByClassName('topic_reply_idin')[0].value;

       //   注: 发送话题回复前观众需要进行登录，否则发送不成功。
      // 第一个参数类型为object, 其中topicId为需要回复的话题id, msg为观众的回复内容
      Mudu.Room.Topic.SendReply(
        {
            topicId: topicId,
            msg: text
        },
        function (response) {
            response = JSON.parse(response)
            console.log(response)

            document.getElementsByClassName('topic_reply_idin')[0].value='';
            document.getElementsByClassName('topic_reply_textin')[0].value='';
        }       
    )
 
}
// ======================================================================================================================================