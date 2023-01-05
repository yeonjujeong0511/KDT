class Pokemon {
  constructor(id, name, type) {
    this.id = id;
    this.name = name;
    this.type = type;
  }
  get id() { 
    return this.id; 
  }
  set id(value) {
    if(Number.isInteger(value) === true) {
      this._id = value;
    } else {
      console.log("id 타입은 정수여야 합니다.");
    }
  }
}
// class 선언
const pikachu = new Pokemon(1.2,"피카츄", "전기");
console.log(pikachu);
// console.log()에는 무슨 값이 나올까요?