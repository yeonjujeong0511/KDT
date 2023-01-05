function googoodanCore(dan, limit) {
  let stepCount = 0;
  let resultArray = [];
  // init
  for (let i = 1; i <= limit; i++) {
    let calc = dan * i;
    // multyply

    if(Number.isInteger(calc) === false) {
      calc = calc.toFixed(1);
    }
    // integer inspection

    if(calc < 0 && i === limit) {
      console.log(Math.abs(calc));
    } 
    // absolute value and max value

    resultArray.push(calc);
    stepCount++;
  }
  let reduceResult = resultArray.reduce(function(prev, curr) {
    return parseFloat(prev) + parseFloat(curr);
  });
  // reduce, get Value

  console.log(`시그마 값 :${reduceResult}`); 
  console.log(`총 ${stepCount}번 실행`);
  return resultArray;
}

console.log(googoodanCore(-3.2,9));



