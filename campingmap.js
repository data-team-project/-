const API_KEY = 'bsau4CZ2%2FCrD0c%2F%2BogGB12VyPtsUeBBOFUteULnfYcBpmDfH1O576AbDQDlmuutpWnVjQvGR%2BBU%2BEd5pbrERoA%3D%3D';

async function getData() {
  const url = `http://apis.data.go.kr/B551011/GoCamping/basedList?MobileOS=ETC&MobileApp=TEST&serviceKey=${API_KEY}&_type=json`;

  const response = await fetch(url);
  const data = await response.json();

  // 마커 생성 및 지도에 추가
  data.response.body.items.item.forEach(item => {
    const lat = item.latitude;
    const lng = item.longitude;

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

  // 지도 중심 및 줌 레벨 조정
  const item = data.response.body.items.item[0];
  const lat = item.latitude;
  const lng = item.longitude;
  map.setCenter(new naver.maps.LatLng(lat, lng));
  map.setZoom(10);

  console.log(data.response.body.items.item);
}

getData();
