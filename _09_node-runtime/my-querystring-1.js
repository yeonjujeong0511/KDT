// urlObj : 임의의 url 객체
let urlObj = {
  one : "aValue",
  two : "bValue",
  three : "cValue",
  four : "dValue"
}
function makeQueryStringURL(obj) {
  // 안티패턴이지만 아래의 핵심 코드를 위해서 리터럴로 작성
  // 리액트의 props 디자인 패턴 고려
  const basicValues = {
    protocol : "http",
    hostname : "localhost",
    port : "6789",
    path : "/src/exmaple.html"
  }   

  let basicTempString = basicValues.protocol + "://" + basicValues.hostname + ":" + basicValues.port + basicValues.path;

  let tempArray = [];
  
  // 객체의 키(key) 데이터와 값을 문자열로 조합하는 루프
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // hasOwnProperty() 키가 있는지 검사하는 메서드 리턴 불리언
      // 현재의 예제에서는 굳이 작성할 필요는 없지만, 복잡한 로직에서는 자주 사용한다.
      tempArray.push(key + "=" + obj[key]);
    };
  }

  let assemblingString = basicTempString + "?" + tempArray.join("&");
  return assemblingString;
}
console.log(makeQueryStringURL(urlObj));
