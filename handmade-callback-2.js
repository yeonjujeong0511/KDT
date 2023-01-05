const typeExtractor = (params) => {
  let typeString = typeof (params);
  console.log("parameter type is :", typeString);
  return typeString;
};

function combineText () {
  return "firstText" + "secondText";
}


function handMade(string, callback) {
    console.log('data');
    return string + callback();
}

handMade('wow', combineText);
