async function getData() {
  const url = `https://apis.data.go.kr/B551011/GoCamping/locationBasedList?&MobileOS=etc&MobileApp=test&serviceKey=bsau4CZ2%2FCrD0c%2F%2BogGB12VyPtsUeBBOFUteULnfYcBpmDfH1O576AbDQDlmuutpWnVjQvGR%2BBU%2BEd5pbrERoA%3D%3D&numOfRows=20&mapX=128.6142847&mapY=36.0345423&radius=20000&_type=json`;
  const response = await fetch(url);
  const data = await response.json();
  const locations = data.response.body.items.item.map(spot => [spot.facltNm, spot.mapX, spot.mapY, spot.intro]);

  console.log("data", data);
  console.log("locations", locations);

  drawMap(locations);
}

function drawMap(locations) {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: new google.maps.LatLng(locations[0][1], locations[0][2]),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });

  const infowindow = new google.maps.InfoWindow();

  let marker, i;

  for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map,
    });

    google.maps.event.addListener(
      marker,
      "click",
      (function (marker, i) {
        return function () {
          infowindow.setContent(locations[i][0]);
          infowindow.setContent(locations[i][3]);
          infowindow.open(map, marker);
        };
      })(marker, i)
    );
  }
}

function initMap() {
  // 지도 초기화 및 표시하는 로직 작성
  getData();
}
