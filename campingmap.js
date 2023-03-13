const API_KEY = 'bsau4CZ2%2FCrD0c%2F%2BogGB12VyPtsUeBBOFUteULnfYcBpmDfH1O576AbDQDlmuutpWnVjQvGR%2BBU%2BEd5pbrERoA%3D%3D'

async function getData(){
    const url = 'http://apis.data.go.kr/B551011/GoCamping/basedList?numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=TEST&seriveKey=${API_KEY}&keyword=%EC%95%BC%EC%98%81%EC%9E%A5';
    const response = await fetch(url);
    const data = await response.json();
    console.log("data", data);
}