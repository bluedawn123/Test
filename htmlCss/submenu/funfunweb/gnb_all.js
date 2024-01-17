
$(function(){
    var depth1 = $(".gnb > li"),
        header = $("header");

    //depth1에 마우스가 올라가면 header의 길이를 300px로 해라
    depth1.mouseenter(function(){
        header.stop().animate({height:"300px"});
    }).mouseleave(function(){
        header.stop().animate({height:"50px"});
    })

    //depth1에 마우스가 떠나면 header의 높이를 50px로 해라

});