Mudu.Init(
    // 频道id
    185053,
  
    // 初始化完成的回调函数，无参数
    function () {
      console.log('Mudu Web Sdk 初始化成功')
    }
  );

Mudu.Room.User.GetUser()
  // 需要在sdk 初始化成功后才能使用
Mudu.Room.User.Assign(name, avatar, assignId, Callback)
