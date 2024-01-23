var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
var options = { //지도를 생성할 때 필요한 기본 옵션
	center: new kakao.maps.LatLng(37.534213, 126.99), //지도의 중심좌표.
	level: 7 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴


// 지도에 확대 축소 컨트롤을 생성
let zoomControl = new kakao.maps.ZoomControl();
// 지도의 우측에 확대 축소 컨트롤을 추가
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

/***********************************************************
1.더미데이터 준비하기 (제목, 주소, url, 카테고리) ==> api 요청으로데이터 불러오기*/

async function getDataSet(category){
  let qs = category;
  if(!qs){
    qs = "";
  }

  const dataSet = await axios({

      method: "get",
      url: `http://localhost:3000/restaurants?category=${qs}`,
      headers: {},
      data: {},
      });

      console.log(dataSet);
      
      return dataSet.data.result;

}
getDataSet();


/*
**********************************************************
3. 여러개 마커 찍기
  * 주소 - 좌표 변환
https://apis.map.kakao.com/web/sample/multipleMarkerImage/ (여러개 마커)
https://apis.map.kakao.com/web/sample/addr2coord/ (주소로 장소 표시하기)
*/

// 주소-좌표 변환 객체를 생성
var geocoder = new kakao.maps.services.Geocoder();

//주소-좌표 변환 함수
//파라미터가 주소면 그것을 좌표로 변환. 실패시 에러출력. 성공시 async의 await 로 가서 coords에 입력
function getCoodsByAddress(address){
  return new Promise( (resolve, reject)=> {
    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(address, function(result, status) {

    // 정상적으로 검색이 완료됐으면 
    if (status === kakao.maps.services.Status.OK) {
      var coords = new kakao.maps.LatLng(result[0].y, result[0].x); 
      resolve(coords);
      return;
    } 
    reject(new Error("에러"));
    });    
  })
}

function getContent(data){
  //유튜브 썸네일 id가져오기
  let replaceUrl = data.videoUrl;
  let finUrl = "";
  replaceUrl = replaceUrl.replace("https://youtu.be/", "");
  replaceUrl = replaceUrl.replace("https://www.youtube.com/embed/", "");
  replaceUrl = replaceUrl.replace("https://www.youtube.com/watch?v=", "");
  finUrl = replaceUrl.split("&")[0]; //이러면 최종적으로 finUrl에 각유튜브 비디오의 고유한 id값이 저장됨

  return `
  <div class="infowindow">
    <div class="infowindow-img-container">
      <img  src="https://img.youtube.com/vi/${finUrl}/mqdefault.jpg" class="infowindow-img">
    </div>
    <div class="infowindow-body">
      <h5 class="infowindow-title">${data.title}</h5>
      <p class="infowindow-address">${data.address}</p>
      <a href="${data.videoUrl}" class="infowindow-btn" target="_blank">영상이동</a>
    </div>
  </div> 
  `;
}

let infowindowArray = [];
let markerArray = [];

//성공한 좌표값을 지도에 찍음
async function setMap(dataSet){
  for (var i = 0; i < dataSet.length; i ++) {
		// 마커를 생성합니다
    let coords = await getCoodsByAddress(dataSet[i].address)
		var marker = new kakao.maps.Marker({
			map: map, // 마커를 표시할 지도
			position: coords, // 마커를 표시할 위치
			}); 
		console.log('마커생성완료');

    markerArray.push(marker);  //markerArray에 marker삽입


    // 마커에 표시할 인포윈도우를 생성합니다 
    var infowindow = new kakao.maps.InfoWindow({
    content: getContent(dataSet[i]) // 인포윈도우에 표시할 내용
    });

    infowindowArray.push(infowindow);

    // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
    // 이벤트 리스너로는 클로저를 만들어 등록합니다 
    // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
    kakao.maps.event.addListener(marker, "click", makeOverListener(map, marker, infowindow, coords));
    kakao.maps.event.addListener(map, "click", makeOutListener(infowindow));

	}
}

// 인포윈도우를 표시하는 클로저를 만드는 함수
// 클릭시 1. 다른 인포윈도우 닫는 기능+ 2. 지도중심옮기기 기능 추가
function makeOverListener(map, marker, infowindow, coords) {
    return function() {
        //1.클릭시 다른 인포윈도우 닫기
        closeInfoWindow();
        infowindow.open(map, marker);

        //2. 클릭시 중심옮기기
        map.panTo(coords);
    };
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다. 
function makeOutListener(infowindow) {
    return function() {
        infowindow.close(); //인포윈도우를 닫는 방법은 infowindow 객체의 close메소드 호출
    };
}

//클릭시 인포윈도우닫는함수
function closeInfoWindow(){
  for (let infowindow of infowindowArray){ //위에서 생성되는 infowindow를 
    infowindow.close();
  }

};

async function setting(){
  try{
    const dataSet = await getDataSet();
    setMap(dataSet);

  } catch(error){
    console.log(error);
  }

}

setting();

/////////////////////////카테고리 분류/////////////////////////
const categoryMap = {
  korea: "한식",
  china: "중식",
  japan: "일식",
  america: "양식",
  wheat: "분식",
  meat: "구이",
  sushi: "회/초밥",
  etc: "기타",
};

//카테고리 리스트 클릭이벤트 만들기
//특정 카테고리 클릭시, 1.기존마커삭제 + 2.기존인포윈도삭제 + 3.클릭시원하는 데이터만 보이게
const categoryList = document.querySelector(".category-list"); //html의 8가지 종류의 리스트들
categoryList.addEventListener("click", categoryHandler ); //그걸 클릭시 categoryHandler함수발생

async function categoryHandler(event){
  //console.log(event.target.id)    sushi, korea등등.
  const categoryId = event.target.id; //위의 카테고리 클릭시 id가 categoryId에 저장. etc,sushi,korea 등등..
  const category = categoryMap[categoryId]; //이럼, category에 한식,양식,중식 등등등이 저장된다. 
  //console.log(category)   한식, 중식 이렇게 나온다!

  try {
    //사용자가 원하는 데이터만을 데이터분류
  let categorizedDataSet = await getDataSet(category);

  // for (let data of dataSet){
  //     //console.log(dataSet)  [ {}, {}, {}..]형태
  //     //console.log(data)     위의 오브젝트가 각각 들어간 형태 (오브젝트만 추출된 형태)
    
  //     //즉, 클릭했을때 한식,중식 이렇게 나온 데이터가 date의category들(한식,중식 등)과 같다면 해당 데이터만 보여주는 코드를 짜야한다. 
  //     if(data.category === category){  // 누른것과 data의 카테고리가 같다면
  //       categorizedDataSet.push(data); //빈 배열에 data(각각의 오브젝트)를 넣어준다. 

  //     }
  //   }

    //기존마커 삭제 + 기존 인포윈도우 삭제
    closeMarker();
    closeInfoWindow();

    //우리가 원하는 데이터만 불러오기 
    setMap(categorizedDataSet);
    
  } catch (error) {
    console.log(error);
    
  }
  
}

function closeMarker(){
  for (marker of markerArray){
    marker.setMap(null);
  }
  
}