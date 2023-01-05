let num = 0;
const a = setInterval(function() {
  num++
  console.log(num);
  if(num === 60) {
    clearInterval(a);
  }
}, 16);