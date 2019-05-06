// 返回直播间名字，类型为string
var roomName = Mudu.Room.GetName()

// 返回直播状态，类型为number: `1`为正在直播，`0`为不在直播
var roomLiveStatus = Mudu.Room.GetLiveStatus()

// 返回直播间浏览量，类型为number整数
var roomViewNum = Mudu.Room.GetViewNum()

// 返回直播间视频地址，类型为string
var roomPlayAddr = Mudu.Room.GetPlayAddr()

// 返回直播间视频地址列表，类型为array
var roomPlayAddr = Mudu.Room.GetPlayList()

// 返回视频回看配置
var trailer = Mudu.Room.GetTrailer()

// 返回直播间自定义菜单, 类型为Array
var menus = Mudu.Room.GetMenus()

// 返回直播间自定义广告栏, 类型为Array
var ads = Mudu.Room.GetBanners();

// 返回直播间主题名称, 类型为string： 目前有两个值(default, tech)
var activeTheme = Mudu.Room.GetActiveTheme()

// 返回直播间主题配置，类型为Array
var themes = Mudu.Room.GetThemes()

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