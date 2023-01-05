setTimeout(function () {
  console.log("a");
  setTimeout(function () {
    console.log("b");
    setTimeout(function () {
      console.log("c");
      setTimeout(function () {
        console.log("d");
        setTimeout(function () {
          console.log("e");
          setTimeout(function () {
            console.log("f");
            setTimeout(function () {
              console.log("g");
            }, 2000);
          }, 2000);
        }, 2000);
      }, 2000);
    }, 2000);
  }, 1000);
}, 3000);
