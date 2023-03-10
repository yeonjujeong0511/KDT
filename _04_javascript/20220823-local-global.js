/*
  ? 코드 설계
  * "hello"라는 문자열을 가리키고 있는 변수 globalData와
  * 함수 example()의 실행부에 초기화된 문자열 "bye"를 가리키고 있는 변수 localData 주요

  * example() 함수는 console.log()를 두번 실행하는 간단한 명령을 담고 있다.
  * 하나의 실행은 변수 globalData가 가리키고 있는 데이터를 기록에 남기는 실행을 하고
  * 다른 하나의 실행은 localData라는 실행을 하고 있다. localData가 가리키고 있는 문자열 "bye"를 출력한다.
*/
let globalData = "hello";

function example() {
  console.log(globalData);
  let localData = "bye";
  console.log(localData);
}
/*
  ? 위 코드의 실행이 문제가 없기 때문에 특이한 점을 발견하기 어렵지만,
  * 함수 내부에 '매개변수'를 통하지 않고 바깥에 작성된 변수가 정상적으로 실행되었다는 것을 주목해 볼 필요가 있다.
  * 예제에서의 gloabalData 변수는 함수의 입구역할을 하는 매개변수를 마치 투명인간처럼 통과하기 때문에 
  * 다음과 같이 부르고 있다.
  * "파일 내에 어디서든지 접근(access)이 가능한 변수" 라고하여 "전역변수" , "global variable" 이라고 부른다.
  * 간단하게 데이터를 처리할때는 큰 문제사항을 발견하기가 쉽지 않지만,
  * 코드의 볼륨이 커질경우, 언제든지 접근할 수 있다는 점 때문에 '무엇이 될지도 모른다' 라는 변동성을 감수해야한다.
  * 따라서 이러한 방식으로 데이터를 변수에 담는 것을 어쩔 수 없는 경우, 불가피한 경우가 아니라면 지양하는 편이다.
*/
console.log(localData); // error
/*
    ? localData의 에러 발생 이유
    * 함수 안에서 선언하고 할당한 즉, 초기화한 localData 변수는 함수 내에서 '만' 사용할 수 있는
    * 제한적인 변수이다. 리턴을 사용하더라도 변수가 가리키는 '값'을 가져올 수 있으나 변수명 자체를 꺼내올 수 없다.
    * 즉 함수 영역 { }중괄호 사이에서만 생존하는 변수이다.
    * 이것을 지역변수의 '유효 범위'라고 부르며, { } 중괄호 사이의 영역을 다른말로 '블럭('block')' 이라고 하여 
    * 블럭 스코프(block scope)라고 부른다.
    * 조금 더 세련된 어휘로 렉시컬 영역 혹은 렉시컬 스코프(lexical scope)라고 부른다.
    
    ? 모두 전역변수로 사용하는 것이 편해보이지만,
    * 전역변수가 초기화되었다는 이야기는 즉 '제작자가' 알고, 외우고 있어야 한다는 논리로 귀결된다.
    * 전역변수가 많아질 수록 언제 어디서 어떻게 변수를 사용해왔는지 개발자들이 알아내야하는 수고가 필요하기때문에 꺼려한다. (기타 다른 이유도 존재한다.)
    * 하지만 지역변수를 조리있게 사용하면 '함수'만 이해하면 되기때문에 개발강도와 유지보수, 재사용성 면에서 뛰어난 강점을 지닌다.
    * 대표적인 지역변수활용 예가 바로 for()문에서 사용하는 let i; 이다.
    * 반복조건문 한개에서만 i를 사용할 수 있다면, 아마 개발자는 사용할 수 있는 변수를 만드느라 애를 먹을 것인데,
    * 반복 조건이 끝나고나서는 증발하기 때문에 다른곳에서 또 변수 i를 사용해도 문제가 생기지 않는 특징이 있다.

    ? 다른 언어에서는, 다른 어휘로는
    * 변수의 생명주기, 변수의 유효범위 라는 말로 설명하기도 하며 특히 중괄호를 영역으로 표기하는 C 계열의 언어에서는 매우 중요한 범위 개념이다.
    
    ? 설명이 읽혀지면,
    * 자바스크립트에서 너무나 다양하게 지원하는 변수 선언 3종류의 탄생 이유를 알게된다.
    * 왜 var를 사용하지 않는지 이유를 알게 된다.
*/
