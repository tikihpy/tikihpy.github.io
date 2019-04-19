function addLoadEvent(func){
    var oldload = window.onload;
    if(typeof window.onload != 'function'){
        window.onload = func;
    }else{
        window.onload = function(){
            oldload();
            func();
        }
    }
}

function praparePlaceholder(){
    var placeholder = document.createElement("img");
    placeholder.setAttribute('id','placeholder');
    placeholder.setAttribute('src','images/placeholder.jpeg');
    placeholder.setAttribute('alt','my image gallery');
    var description = document.createElement('p');
    description.setAttribute('id','description');
    var desctext = document.createTextNode('Choose an image');

    description.appendChild(desctext);

    // document.body.appendChild(placeholder);
    // document.body.appendChild(description);

    document.getElementsByTagName('body')[0].appendChild(placeholder);
    document.getElementsByTagName('body')[0].appendChild(description);
}

function prepareGallery(){
    // if (!document.getElementsByTagName) return false;
    // if (!document.getElementById) return false;
    // if (!document.getElementById('imagegallery')) return false;
    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementsByTagName('a');
    for( var i=0;i<links.length;i++){
        links[i].onclick = function(){
            showPic(this);
            return false;
        }
    }
}

function showPic(whichpic) {
    // if (!document.getElementById('placeholder')) return false;
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    // if (placeholder.nodeName != 'IMG') return false;
    placeholder.setAttribute("src", source);
    // if (document.getElementById('description')) {
        var text = whichpic.getAttribute('title');
        var description = document.getElementById('description');
        description.firstChild.nodeValue = text;
        return true;
}

function countBodyChildren(){
    var body_element = document.getElementsByTagName('body')[0];
    alert(body_element.nodeType);
}

addLoadEvent(praparePlaceholder);
addLoadEvent(prepareGallery);
