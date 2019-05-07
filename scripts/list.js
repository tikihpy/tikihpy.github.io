// function alertcmt(){

//     var list = document.createElement('li');
//     list.setAttribute('class','msg_area');
//     var alertcmt = document.createElement("img");
//     alertcmt.setAttribute('class','img');
//     alertcmt.setAttribute('src','https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2866492045,1432640156&fm=26&gp=0.jpg');
//     var description = document.createElement('span');
//     description.setAttribute('class','username');
//     var desctext = document.createTextNode('value');
  
//     list.appendChild(alertcmt);
//     list.appendChild(description);
//     description.appendChild(desctext);
  
//     // document.body.appendChild(placeholder);
//     // document.body.appendChild(description);
  
//     document.getElementsByTagName('ul')[0].appendChild(list);
//     document.getElementsByTagName('li')[0].appendChild(alertcmt);
//     document.getElementsByTagName('li')[0].appendChild(description);
//   }
//   addLoadEvent(alertcmt);



function alertcmt(){

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
  
  
    var list = document.createElement('li');
    list.setAttribute('class','msg_area');
    var alertcmt = document.createElement("img");
    alertcmt.setAttribute('class','img');
    alertcmt.setAttribute('src','https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2866492045,1432640156&fm=26&gp=0.jpg');
    var description = document.createElement('span');
    description.setAttribute('class','username');
    var desctext = document.createTextNode(value);
  
    list.appendChild(alertcmt);
    list.appendChild(description);
    description.appendChild(desctext);
  
    // document.body.appendChild(placeholder);
    // document.body.appendChild(description);
  
    document.getElementsByTagName('ul')[0].appendChild(list);
    document.getElementsByTagName('li')[0].appendChild(alertcmt);
    document.getElementsByTagName('li')[0].appendChild(description);
  }
  addLoadEvent(alertcmt);