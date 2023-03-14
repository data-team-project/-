function addMarkerToMap(map, lat, lng) {
  var marker = new naver.maps.Marker({
    position: new naver.maps.LatLng(lat, lng),
    map: map
  });
}

async function getData(map) {
  const url = `https://apis.data.go.kr/B551011/GoCamping/locationBasedList?MobileOS=etc&MobileApp=test&serviceKey=bsau4CZ2%2FCrD0c%2F%2BogGB12VyPtsUeBBOFUteULnfYcBpmDfH1O576AbDQDlmuutpWnVjQvGR%2BBU%2BEd5pbrERoA%3D%3D&mapX=128.6142847&mapY=36.0345423&radius=2000&_type=json`;
  const response = await fetch(url);
  const data = await response.json();
  console.log("data", data);

  // 받아온 데이터에서 좌표값 추출하여 지도에 마커 추가
  if (data && data.locationBasedList) {
    data.locationBasedList.forEach(function(item) {
      let lat = parseFloat(item.mapY);
      let lng = parseFloat(item.mapX);
      addMarkerToMap(map, lat, lng);
    });
  } else {
    console.log("No data or locationBasedList found.");
  }
}

// naver.maps.Map 객체 생성 후 getData 함수에 전달
var map = new naver.maps.Map('map', {
  center: new naver.maps.LatLng(37.3595704, 127.105399),
  zoom: 10
});

getData(map);
