let count = 0;
// 종료시점을 제어하기 위한 변수 count

function interval(countInt, intervalTime, limitInt) {
  setTimeout(function () {
    // setTimeout()은 주어진 시간만큼 기다렸다가 한번 실행한다.
    countInt++;
    // 1번 행동 : 매개변수 countInt를 1증가 시킨다.
    console.log(countInt);
    // 2번 행동 : 콘솔에 증가된 countInt 값을 출력한다.
    if (countInt < limitInt) {
    // 3번 행동 : 조건식이 참(true)라면 영역내의 행동을 실행한다.
      interval(countInt, intervalTime, limitInt);
      // 3-1번 행동 :interval() 이라는 함수를 실행한다.
      // interval()은 본인 자신이다.
      // 함수자신이 자신을 호출 하는 행위를 '재귀함수(recursion function)' 이라고 부른다.
    }
  }, intervalTime);
}
interval(count, 1000, 10);
// setTimeout()을 응용한 것이 setInterval()이다.