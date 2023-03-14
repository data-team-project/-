async function getData() {
  const url = `https://apis.data.go.kr/B551011/GoCamping/locationBasedList?MobileOS=etc&MobileApp=test&serviceKey=bsau4CZ2%2FCrD0c%2F%2BogGB12VyPtsUeBBOFUteULnfYcBpmDfH1O576AbDQDlmuutpWnVjQvGR%2BBU%2BEd5pbrERoA%3D%3D&mapX=128.6142847&mapY=36.0345423&radius=2000&_type=json`;
  const response = await fetch(url);
  const data = await response.json();
  const locations = data.response.body.items.item.map(spot=>[spot.facltNm,spot.mapX,spot.mapY]);

  
  console.log("data", data);
  console.log("locations", locations)
}

function drawMap(locations) {
  const map = new naver.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: new naver.maps.LatLng(locations[0][1], locations[0][2]),
    mapTypeId: naver.maps.MapTypeId.ROADMAP,
  });

  const infowindow = new naver.maps.InfoWindow();

  let marker, i;

  for (i = 0; i < locations.length; i++) {
    marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(locations[i][1], locations[i][2]),
      map: map,
    });

    naver.maps.event.addListener(
      marker,
      "click",
      (function (marker, i) {
        return function () {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        };
      })(marker, i)
    );
  }
  
  drawMap(locations);
}

  getData();


