const API_KEY = 'bsau4CZ2%2FCrD0c%2F%2BogGB12VyPtsUeBBOFUteULnfYcBpmDfH1O576AbDQDlmuutpWnVjQvGR%2BBU%2BEd5pbrERoA%3D%3D';

function initMap() {
  const map = new naver.maps.Map('map', {
    center: new naver.maps.LatLng(37.3595704, 127.105399),
    zoom: 10
  });

  getData(map);
}

async function getData(map) {
  const url = `https://apis.data.go.kr/B551011/GoCamping/locationBasedList?MobileOS=etc&MobileApp=test&serviceKey=bsau4CZ2%252FCrD0c%252F%252BogGB12VyPtsUeBBOFUteULnfYcBpmDfH1O576AbDQDlmuutpWnVjQvGR%252BBU%252BEd5pbrERoA%253D%253D&mapX=128.6142847&mapY=36.0345423&radius=2000`;

  const response = await fetch(url);
  const data = await response.json();

  console.log(data); // 데이터 출력
  console.log(data.response.body.items.item)

  // 마커 생성 및 지도에 추가
  data.response.body.items.item.forEach(item => {
    const lat = item.mapY;
    const lng = item.mapX;

    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(lat, lng),
      map: map
    });

    // 마커 클릭 시 정보 창 열기
    const content = `<div><h4>${item.facltNm}</h4><p>${item.addr1}</p></div>`;
    const infoWindow = new naver.maps.InfoWindow({
      content: content
    });
    naver.maps.Event.addListener(marker, 'click', () => {
      infoWindow.open(map, marker);
    });
  });

  console.log(data.response.body.items.item);
}