//객체의 키와 값을 정적으로 생성한다. 
const pet = {
    name : 'dd',
    age : 12
}

//한번 만들어진 이후, 속성을 부여하는 것을 객체의 키, 값을 동적으로 생성한다.
pet.color = 'brown'
pet[ssdf] = 'kill'  

console.log(pet)   //{name: 'dd', age: 12, color: 'brown'}

///속성제거 => delete
delete pet.color
delete pet[ssdf]

console.log(pet)          

//////////////문제가 없는 이유는 const pet의 기존 내용을 변경,수정하는 건 노상관(heap내에서)
/////////////stack에 있는 걸 변경하는 경우는 문제가 발생한다.

const ex = {
    ko : '빵',
    en : 'bread',
    es : 'pan',
    lang : {
        ko: '한국어',
        en: '영어',
        es: '스페인어'
    },
    print: function(langs){
        console.log(`${this.ko}은/는 ${this.lang[langs]}으로 ${this[langs]}입니다. `)
    }               
}
ex.print('es')     //'es'가 print매서드의 langs으로 들어감
                   //빵은 스페인어으로 pan입니다.