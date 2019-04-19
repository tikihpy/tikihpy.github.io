function positionMessagel(){
    if(!document.getElementById)return false;
    if(!document.getElementById("message"))return false;
    var elem = document.getElementById("message");
    elem.style.position = "absolute";
    elem.style.left = "50px";
    elem.style.top = "50px";
    moveElement("message",500,250,10);

    if(!document.getElementById)return false;
    if(!document.getElementById("message1"))return false;
    var elem = document.getElementById("message1");
    elem.style.position = "absolute";
    elem.style.left = "50px";
    elem.style.top = "50px";
    moveElement("message1",600,350,10);

    if(!document.getElementById)return false;
    if(!document.getElementById("message2"))return false;
    var elem = document.getElementById("message2");
    elem.style.position = "absolute";
    elem.style.left = "50px";
    elem.style.top = "50px";
    moveElement("message2",700,450,10);

    if(!document.getElementById)return false;
    if(!document.getElementById("message3"))return false;
    var elem = document.getElementById("message3");
    elem.style.position = "absolute";
    elem.style.left = "50px";
    elem.style.top = "50px";
    moveElement("message3",600,550,10);

    if(!document.getElementById)return false;
    if(!document.getElementById("message4"))return false;
    var elem = document.getElementById("message4");
    elem.style.position = "absolute";
    elem.style.left = "50px";
    elem.style.top = "50px";
    moveElement("message4",500,650,10);

    if(!document.getElementById)return false;
    if(!document.getElementById("img"))return false;
    var elem = document.getElementById("img");
    elem.style.position = "absolute";
    elem.style.left = "1000px";
    elem.style.top = "500px";
    moveElement("img",0,0,10);
}
addLoadEvent(positionMessagel);