function aotukey(){
    var visitorId = document.getElementsByName('visitor_id')[0].value;
    var notifyUrl = document.getElementsByName('notify_url')[0].value;
    var auth = document.getElementsByName("auth")[0].value;
    var actId = document.getElementsByName('act_id')[0].value;
    var nick = document.getElementsByName('nick')[0].value;
    var avatar = document.getElementsByName('avatar')[0].value;

    var key = md5(visitorId + auth );
    var toUrl = notifyUrl + '?key=' + key;

    var params="&id="+actId+"&userid="+visitorId+"&name="+nick+"&avatar="+avatar+"&key="+key+"&tourl="+toUrl;

    var Url = "http://mudu.ns.4l.hk:8890/activity.php?a=userAssign"+params;
    console.log(key, toUrl, params, Url)

    window.location.href = Url;
}