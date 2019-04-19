window.onload = function(){
    var testdiv = document.getElementById('testdiv');
    alert (testdiv.innerHTML);
}

window.onload = function(){
    var testdiv = document.getElementById("testdiv");
    testdiv.innerHTML = "<p> I inserted <em>this</em> content</p>";
}

window.onload = function(){
    var para = document.createElement('p');
    var info = 'nodeName:';
    info+= para.nodeName;
    info+=" nodeType: ";
    info+= para.nodeType;
    alert(info);
}

window.onload = function(){
    var para = document.createElement('p');
    var testdiv = document.getElementById("testdiv");
    testdiv.appendChild(para);
    var txt = document.createTextNode("Hello world!");
    para.appendChild(txt);
}

window.onload = function(){
    var testdiv = document.getElementById("testdiv");
    var para = document.createElement('p');
    var txt1 = document.createTextNode("Hello world again!");
    var emphasis = document.createElement('em');
    var txt2 = document.createTextNode("I love this world!");
    var txt3 = document.createTextNode("Ncie world!");
    
    testdiv.appendChild(para);
    para.appendChild(txt1);
    para.appendChild(emphasis);
    emphasis.appendChild(txt2);
    para.appendChild(txt3);
}