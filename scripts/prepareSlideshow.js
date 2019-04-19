function prepareSlideshow(){
    var preview = document.getElementById('preview');
    preview.style.position = 'absolute';
    preview.style.left = '0px';
    preview.style.top = '0px';
    var list = document.getElementById('linklist');
    var links = list.getElementsByTagName('a');
    console.log(links);
    links[0].onmouseover = function(){
        moveElementl('preview',-100,0,10);
    }
    links[1].onmouseover = function(){
        moveElementl('preview',-200,0,10);
    }
    links[2].onmouseover = function(){
        moveElementl('preview',-300,0,10);
    }
}
addLoadEvent(prepareSlideshow);