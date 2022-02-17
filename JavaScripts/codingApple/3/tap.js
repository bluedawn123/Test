//이 페이지는 공부하는데 유용하고 3단계로 구성되어 있으니 틈하면 읽어보자

//버튼0 (product)을 누르면, 버튼 0이 주황색으로 하이라이트 + 0번째 내용(tab-content1번)이 보여야함.
//주황색은 active 클래스를 추가하면 보인다. 내용은 show클래스를 추가하면 보인다.
//★★다른 버튼을 누르면 주황색과 내용은 제거를 해야한다.

//1-1. 가장 기본적으로 만듬
//첫번째 버튼 눌렀을때 주황색으로 바뀜
$('.tab-button').eq(0).click(function(){         //tab-button중 0번인덱스(즉 첫번째 게시물)클릭하면 
    $('.tab-button').removeClass('active');      //아예 주황색표시와 내용하는 것을 다 지워햔다. => 지우지 않으면 이전 것들도 보여지기 때문(주황색 + 내용이)
    $('.tab-content').removeClass('show');
    $('.tab-button').eq(0).addClass('active');   //첫번째 버튼이 주황색으로 바뀜
    $('.tab-content').eq(0).addClass('show');    //첫번째 게시물이 보임
})

//이하는 반복
$('.tab-button').eq(1).click(function(){        
    $('.tab-button').removeClass('active');
    $('.tab-content').removeClass('show');
    $('.tab-button').eq(1).addClass('active');   
    $('.tab-content').eq(1).addClass('show');    
})

$('.tab-button').eq(2).click(function(){       
    $('.tab-button').removeClass('active');
    $('.tab-content').removeClass('show');
    $('.tab-button').eq(2).addClass('active');   
    $('.tab-content').eq(2).addClass('show');    
})

//1-2. 코드 줄이려고 for문으로 대체. (과정을 위해 위에걸로 적용) //////////////////
// // for (let i = 0; i < $('tab-button').length; ====> 지금html에 있는 tab-button의 갯수(); i++){
// //     $('.tab-button').eq(i).click(function(){       
// //         $('.tab-button').removeClass('active');
// //         $('.tab-content').removeClass('show');
// //         $('.tab-button').eq(i).addClass('active');     
// //         $('.tab-content').eq(i).addClass('show');    
// //     })
// // }

//1-3. 위에 코드를 함수 저장
// function 탭열기(){
//         $('.tab-button').removeClass('active');
//         $('.tab-content').removeClass('show');
//         $('.tab-button').eq(i).addClass('active');     
//         $('.tab-content').eq(i).addClass('show');
// }

//2-1
//ul에 이벤트리스너 달기 = 1번째나 2번째(주석)처럼 이벤트 리스너를 여러 개 사용할 필요가 없다. => 버블링때문에
// $('.list').click(function(e){
//     //만약 내가 실제 누른 요소가 버튼n이면 탭n번째를 열기
//     if(e.target == document.querySelector('.tab-button')[0]){       //e.target출력해보면, 생 자바스크립트의 셀렉터~~~나옴 => docu~~사용하는 것
//         탭열기(0)}
//     if(e.target == document.querySelector('.tab-button')[1]){ 
//         탭열기(1)}
//     if(e.target == document.querySelector('.tab-button')[2]){     
//         탭열기(2)}
// });

//2-2
// //반복문, if문을 쓰지 않고 이걸 줄인다면, html 파일 안에 정보를 심어둘 수 있다. tap의 data-작묭 = "값" 을 확인해보자
// //1. 셀렉터로 저장한 정보를 찾는다. 셀렉터.dataset.id (이런식으로)
// $('.list').click(function(e){
//     //탭열기(내가누른버튼에숨겨져있던숫자) 누르면 바로 뿅! e.target.datase.id 를 활용하면 된다!
//     //정보를 꺼내려면 HTML요소.dataset.작명 을 활용하면 된다.
//     //0번째 버튼을 누르면 e.target.dataset.id가 0 
//     탭열기(e.target.dataset.id)
// });  
//즉, 탭열기라는 함수를 만들고, HTML에 정보를 숨겨서 사용하면 코드를 확 줄일 수 있다.

//2-3. jQuery 문법으로 HTML에 정보 저장 방식
//data-작명="값"
//$('.list').data('작명', 값); 으로 저장하고,
//$('.list').data('작명) 으로 꺼내쓸 수 있다. 출력하면 값

