//클릭시 알람창 띄우기
// let btn = document.getElementById('submit');
// btn.addEventListener('click', function(){
//     alert('sss');
// })

//클릭시 문단 배경색 바꾸기
let btn = document.getElementById('submit');
let mypara = document.querySelector('.container');

btn.addEventListener('click', function(){
    mypara.style.backgroundColor = 'red'
})

//마우스 올라갔을때 할일
mypara.addEventListener('mouseover', function(){
    mypara.style.color = 'blue';
})
mypara.addEventListener('mouseout', function(){
    this.style.color = 'green';
})

//빈칸에 입력된 값 가져오기
document.querySelector('#name').addEventListener('change', function(){
    alert('반갑습니다.' + this.value + '님');
})

//선택창란에서 골랐을때 그 색이 배경색이 되도록 만들어보자.
//change 이벤트
let colorSelect = document.getElementById('color');
let target = document.body;

colorSelect.addEventListener('change', function(){
    let selectedValue = this.value;
    target.style.backgroundColor = selectedValue;
});

//this?
//여기서 this는 이벤트가 일어난 요소