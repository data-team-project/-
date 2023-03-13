const API_KEY = 'bsau4CZ2%2FCrD0c%2F%2BogGB12VyPtsUeBBOFUteULnfYcBpmDfH1O576AbDQDlmuutpWnVjQvGR%2BBU%2BEd5pbrERoA%3D%3D';

async function getData() {
    const url = `https://apis.data.go.kr/B551011/GoCamping/searchList?numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=TEST&ServiceKey=${API_KEY}&keyword=%EC%95%BC%EC%98%81%EC%9E%A5`;

    const response = await fetch(url);
    const text = await response.text();
  
    // xml을 json으로 변환
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, 'application/xml');
    const jsonString = JSON.stringify(xmlToJson(xml));
  
    const data = JSON.parse(jsonString);
  
    // 마커 생성 및 지도에 추가
    data.response.body.items.item.forEach(item => {
      const lat = item.latitude;
      const lng = item.longitude;
  
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(lat, lng),
        map: map
      });
  
      map.setCenter(new naver.maps.LatLng(lat, lng));
      map.setZoom(10);
    });
  }
  
  function xmlToJson(xml) {
    // xml을 json으로 변환하는 함수
    const obj = {};
    if (xml.nodeType === 1) {
      if (xml.attributes.length > 0) {
        obj['@attributes'] = {};
        for (let j = 0; j < xml.attributes.length; j++) {
          const attribute = xml.attributes.item(j);
          obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType === 3) {
      obj['#text'] = xml.nodeValue.trim();
    }
  
    if (xml.hasChildNodes()) {
      for (let i = 0; i < xml.childNodes.length; i++) {
        const item = xml.childNodes.item(i);
        const nodeName = item.nodeName;
  
        if (typeof obj[nodeName] == 'undefined') {
          obj[nodeName] = xmlToJson(item);
        } else {
          if (typeof obj[nodeName].push == 'undefined') {
            const old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(xmlToJson(item));
        }
      }
    }
    return obj;
  }
  
  getData();