
//定义一个解析评论的函数
function parseComment({ avatar, username, message }) {
    return $(`<div class='comment_one'><img class="avatar" src='${avatar}' /> <p class='username'>${username}</p> <p class='message'>${message}</p></div>`);
}


//项目初始化,62541
Mudu.Init(
        62541,
    function () {

    //这个里面调用目睹api，结合自身业务实现相关逻辑
    console.log('Mudu Web Sdk 初始化成功');

    //监听新评论事件
    var delk = Mudu.MsgBus.On('Comment.New', function (newComment) {

        var obj = JSON.parse(newComment);
        $(".comments").prepend(parseComment(obj));
            console.log(obj.username + '发送了一条新评论: ' + obj.message+obj.checked);
    });

    // 取消监听评论事件，取消之后如果有新的评论就不会收到通知了
    // Mudu.Room.Comment.Off(delk);

    //获取最新三页的评论
    for (var i = Mudu.Room.Comment.GetPage(), j = 0; i > 0; i-- , j++) {
        if (j > 3) {
            break;
        }
        //获取评论
        Mudu.Room.Comment.Get(i, function (response) {
            var obj = JSON.parse(response);
            $.each(obj.data.comments, (idx, comment) => {
                $(".comments").append(parseComment(comment));
            })
        });
    }



    var menus = Mudu.Room.GetMenus();
    console.log(menus);

    Mudu.Room.GetLiveImage(function(data){
        var obj = JSON.parse(data);
        console.log(data);
    });

    Mudu.MsgBus.On('Player.Ready',function(){
        //player.setPlayerSize(800,600);
        });
        //监听直播状态变化事件
    Mudu.MsgBus.On( 'Room.StreamEvent',function (data,topic) {
        var obj = JSON.parse(data);
        console.log(data);
            if (obj.event == 1){
                player.play();
        }
        else{
            player.stop();
        }
    });
    Mudu.MsgBus.On('Player.Stoped',function(){
            //  player.stop();
    });

    //监听ppt变化事件
    Mudu.Room.PPT.On('PPT.Changed', function (data, topic) {
        var obj = JSON.parse(data);
        $("#ppt_content").show().attr("src", obj.url);
    });


    //定义一个随机数生产函数
    var GetRandomNum = function (Max, Min) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    }

    //监听弹幕事件并处理
    Mudu.Room.Barrage.On('Barrage.New', function (data, topic) {
        var obj = JSON.parse(data);
        var left_1 = GetRandomNum(1200, 0)
        var top_1 = GetRandomNum(60, 0);

        var left_2 = GetRandomNum(1200, 0)
        var top_2 = GetRandomNum(60, 0);
        var $dom = $(`<span style="position:absolute;left:${left_1}px;top:${top_1}px">${obj.text}</span>`);
        $("#barrage").append($dom);
        $dom.animate({ left: left_2 + 'px', top: top_2 + 'px' });
        setTimeout(function () {
            $dom.remove();
        }, GetRandomNum(10, 6) * 1000);
    });


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

    //显示页面浏览量
    $("#act_viewnum").text(Mudu.Room.GetViewNum());
//显示直播间名字
    $("#act_name").text(Mudu.Room.GetName());
    //显示ppt图片
    $("#ppt_content").show().attr("src", Mudu.Room.PPT.GetUrl());


    //监听开奖事件
    Mudu.Room.LuckyDraw.On('LuckyDraw.Open', (data) => {
        var jsonObj = JSON.parse(data);
        var html = '中奖用户：\n';
        $.each(jsonObj.data.luckers.luckers, function (idx, lucker) {
            html += `用户 ${lucker.uname} 手机：${lucker.voucher} \n`;
        });
        alert(html);
    });
        Mudu.Room.LuckyDraw.Result(
            function(response){
                response = JSON.parse(response);
                console.log(response.data);
            if (response.status === 'y'){
                html = '中奖用户：\n';
                $.each(response.data.luckers.luckers,function(idx,lucker){
                html += '用户'+lucker.uname+' 手机：'+lucker.voucher+' \n';
                });
                alert(html);
        }
            })

    //获取抽奖信息
    Mudu.Room.LuckyDraw.Get(function(response) {
        response = JSON.parse(response);
        console.log(response);
        var award_name = response.data.lucky_draw.award_name;
        var deadline = response.data.lucky_draw.deadline;
        console.log(award_name);
        console.log(deadline);
        if (!deadline) {
            return;
        }
        $("#luckyDrawWrap").show();
        $("#lucky_award_name").text(award_name);
        $("#lucky_deadline").text(deadline);
    });


    //直播间浏览量发生变化时，在页面上显示实时人数
    Mudu.Room.On('Room.ViewNumChanged', function (num) {
        $("#act_viewnum").text(num);
    });

    //元素添加点击事件
    $("#SignUp").bind('click', () => {
        var uname = $.trim($("#uname").val()); //获取报名人的名字
        var voucher = $.trim($("#voucher").val()); //获取凭证，这里一般是手机号码或者员工工号等等
        if (uname != "" && voucher != "") {
            //调用抽奖报名api，进行抽奖报名
            console.log('报名');
            Mudu.Room.LuckyDraw.SignUp(
                {
                userName:uname,
                voucher:voucher,
                },function (response){
                var jsonObj = JSON.parse(response);
                console.log('报名报名');
                if (jsonObj.status == 'y') {
                    console.log('报名成功');
                    $("#SignUpWrap").hide();
                    alert("报名成功");
                } else {
                    alert(jsonObj.info

);
                }

            })
        }
    })
});
