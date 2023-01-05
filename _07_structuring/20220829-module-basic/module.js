export default function elementMaker(parent, tagName) {
  let createElement = document.createElement(tagName);
  parent.appendChild(createElement);
}
// 함수 작성방식을 통해 간단하게 태그를 생성하고, 부모태그에 append하는 기능을 함수로 꾸렸다.
// 특히 확인할 것은 해당 파일에는 '리터럴(literal)', 즉 직접작성된 값이 없다는 점을 확인한다.
// 다시말해 직접작성된 값이 없으니, 조건만 맞는다면 다른부분이나 다른 파일에서도 해당 함수를 사용할 수 있다. 
