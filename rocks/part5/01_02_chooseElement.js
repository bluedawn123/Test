// 1. id로 선택하기 => document.getElementById('아이디명')
document.getElementById('title').style.color='blue'
//                       대상.style.css속성명 = '값'


// 2. 태그명으로 선택하기 => document.getElementsByTagName('태그명')
//★★ 태그들은 다수이므로 다수의 배열이다. 그러므로 지정을 꼭 해줘야 한다. 
//document.getElementsByTagName('h2').style.color='green' => 이러면 에러
document.getElementsByTagName('h2')[0].style.color='green'
document.getElementsByTagName('h2')[1].style.color='green'

//이런식으로 해야한다. 근데 태그가 너무 많을수 있으므로 for문으로 쓴다. 
let sectionTitle = document.getElementsByTagName('h2');
for (let i=0; i < sectionTitle.length; i++){
    sectionTitle[i].style.color='green'
}


//3. 클래스명으로 선택하기 => document.getElementsByClassName('클래스명')
//★★ 이것도 역시 다수의 배열!!
let myList = document.getElementsByClassName('list');
let x = 0;
while( x < myList.length){
    myList[x].style.backgroundColor = 'yellow';
    x++;
}


//4.쿼리셀렉터로 css 로 선택하기 -> document.querySelector('css선택자');  or document.querySelectorAll('css선택자'); 
//3번째 박스를 투명도 0.2로
document.querySelector('#box > div > div').style.opacity = 0.2; 

//
let myP = document.querySelectorAll('article p'); 
myP.forEach( function(item){
    item.style.fontSize = '1.5em';
});

let btn = document.getElementById('submit');
btn.addEventListener('click', function(){
    alert('sss');
})