const pokemon = {
    english : {
      bulbasaur: "Bulbasaur_column",
      ivysaur : "Ivysaur_column",
      venusaur : "Venusaur_column",
      charmander : "Charmander_column",
      charmeleon : "Charmeleon_column",
      charizard : "Charizard_column",
      squirtle : "Squirtle_column"
    },

    restExample: function (QUERY, ...columns) {
      let temp = [];
      columns.map(column => {temp.push(column);});
      let setValue = `${QUERY.toUpperCase()} ${temp.join(", ")}`;
      return setValue;
    },
    literalMethod : function (QUERY) {
      let temp = [];
      for (let key in this.english) {
        temp.push(this.english[key]);
      }
      return `${QUERY.toUpperCase()} ${temp.join(", ")}`;
    }
  }
  
  function arraySet(obj) {
    obj = typeof obj === "object" ? obj : console.error('not Object');
    let temp = [];
    for(let key in obj) {
      temp.push(obj[key]);
    }
    return temp.join(", ");
  }

console.log(pokemon.literalMethod("select"));

console.log(pokemon.restExample("select", arraySet(pokemon.english, ","))) 

