
// 안티패턴의 함수이긴 하나, yahoFunc(), merongFunc() 두개의 함수는 구조가 완전히 동일하고,
// return의 + 결합자 문자열만 다르다.
function yahoFunc(param) {
  if(typeof(param) === "string") {
    return param + "yaho";
  }
}

function merongFunc(param) {
  if(typeof(param) === "string") {
    return param + "merong";
  }
}
// 가시적으로 보이게 만들어진 것이므로 결코 좋은 작성방식이 아님을 주의 할 것


function handMade(test, callback) {  
  if(typeof (test) === "string" && typeof callback === "function") {
    // handMade 함수는 두개의 매개변수(parameter)를 인자(argument)로 받는데,
    // 0번째 매개변수는 "문자열" 이여야만 하고, 1번째 매개변수는 "함수" 여야만 '참(true)' 판정을 낸다.

    console.log(typeof test); // "string"이 문자열이 출력된다.
    console.log(typeof callback); // "function" 이라는 문자열이 출력된다.
    // 위의 callback이라는 매개변수의 타입체크 방법을 눈여겨보면 함수호출의 방식인 () 소괄호를 별도로 붙여주지 않은 것을 확인한다. 자바스크립트에서 소괄호가 없으면 '호출(call)'을 하지 않았다는 표시이므로 주의

    console.log(callback(test));
    // test 라는 인자는 부모함수인 handMade 함수에서 받아온 인자이다.
  }
}

handMade("나는 이렇게 말하지 ,", merongFunc);
handMade("나는 이렇게 말하지 ,", yahoFunc);
/*
  같은 함수를 두번 호출했는데, 매개변수로 사용된 함수는 다르다.
  위의 함수는 콜백으로 만드는 의미가 전혀 없긴하지만, 명확하게 함수를 다시부르는 형태를 통해 실행되었다.

  merongFunc(), yahoFunc()는 독립적이지 않고, 자식처럼 handMade 라는 함수의 '매개변수'형태로 활용
  즉, 콜백 함수의 형태이다.
*/
