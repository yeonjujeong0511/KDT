function a() {
  // * 함수 선언방식, 기명함수 방식
}
a();

let b = function() {
  // * 이름은 없지만 이름을 대체하는 '식별'이 된다.
  // * 익명함수, 기명처럼 쓸 수 있다.
  // * 어떤 값이있다면, '값'처럼 쓰일것
  // * 함수 표현식 (function expression)
  // * 함수 리터럴 (function literal)
}

let c = () => {
  // * 마치 화살표처럼 함수를 작성한다 arrow function 화살표 함수
  // * 거의 콜백에 엄청나게 많이쓴다.
  // * 짧음
  // * 쓰기 편함
  // * 비교연산자와 모양이 다르다. 비교는 >= <= , (이퀄이 오른쪽) 
  // * 내장함수 들 대부분 콜백함수를 쓰고있고, 간단하게 쓸 수 있기때문에
  // * 최신문법을 채택하는 곳에서는 화살표함수를 엄청나게 만날 수 있다.
}

let d = a => {
  // * 매개변수가 하나일때는 소괄호 조차도 생략 할 수 있다.
}