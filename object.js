function speak(line) {
    return console.log(`The ${this.type} rabbit says '${line}'`);
}

let whiteRabbit = {type: "white", speak}
let hungryRabbit = {type: "hungry", speak}
whiteRabbit.speak("White");
hungryRabbit.speak("I'm hungry.");

speak.call(hungryRabbit, "Hungry!"); //call을 통해 this를 넘겨줄 수 있다

function sampleMap(n) {
    return n / this.length;
}

function normalize() {
    // 멤버로 함수를 가지고 있어야 function에서 접근 가능하나 =>는 없어도 접근 가능.
    console.log(this.coords.map(n => n / this.length));
    console.log(this.coords.map(sampleMap)); // not working!
}
normalize.call({coords: [0, 2, 3], length: 5})

// PROTOTYPE
// 각각의 정의된 prototype을 가지고 있고 이 prototype은 자신들만의 함수나 프로퍼티를 가진다.
console.log(Object.getPrototypeOf({}) === Object.prototype); //최상위는 Object.prototype
console.log(Object.getPrototypeOf(Math.max) === Function.prototype) // true
console.log(Object.getPrototypeOf([]) === Array.prototype) //true

let protoRabbit = {
    speak(line) {
        console.log(`The ${this.type} rabbit says '${line}'`)
    }
};
let killerRabbit = Object.create(protoRabbit);
killerRabbit.type = "killer";
killerRabbit.speak("SKREEEE");

//CLASSES
//prototype과 생성자 함수를 통해 인스턴스 생성을 해야 한다.
function makeRabbit(type) {
    let rabbit = Object.create(protoRabbit);
    rabbit.type = type;
    return rabbit;
}
//조금 더 편한 방법 before 2015
function Rabbit(type) { //constructor
    this.type = type;
}
// Rabbit.prototype.speak = line => console.log(`The ${this.type} rabbit says '${line}'`) // not working
Rabbit.prototype.speak = function (line) {
    console.log(`The ${this.type} rabbit says '${line}'`)
}
let weirdRabbit = new Rabbit("weird");
weirdRabbit.speak("line")
console.log(Object.getPrototypeOf(weirdRabbit) === Rabbit.prototype) // true
// Rabbit은 Function.prototype을 갖고 있다. 이 prototype에 새로운 값을 추가하고 이 prototype이 생성자에 사용된다.

class ClassRabbit {
    // let name = 'name'; // not allow. 메서드만 허용
    constructor(type) {
        this.type = type;
    }
    // constructor는 클래스 이름에 바로 대응되는 함수이고 나머지는 ClassRabit.prototype에 등록된다.
    speak(line) {
        console.log(`The ${this.type} rabbit says '${line}'`)
    }
}
let blackRabbit = new ClassRabbit("black");
blackRabbit.speak("black");
let object = new class { getWord = () => "hello"} // 바로 선언해서 사용 가능
console.log(object.getWord());

// 현재 object에서 값을 못찾으면 prototype으로 내려가면서 찾는다.
ClassRabbit.prototype.teeth = "small";
blackRabbit.teeth = "Big"
console.log(blackRabbit.teeth);
console.log(new ClassRabbit("arbitrary").teeth);
console.log(ClassRabbit.prototype.teeth)

console.log(Array.prototype.toString == Object.prototype.toString)
console.log([1, 2, 3].toString())
console.log(Object.prototype.toString.call([1, 2, 3]))

// MAPS
console.log("toString" in Object.create(null))
let ages = new Map();
ages.set("Boris", 39);
ages.set("Liang", 22);
ages.set("Julia", 69);
console.log(ages.has("Jack"))
// object own proerty에서 찾는다
console.log({x: 'x'}.hasOwnProperty('x')) // true
console.log({x: 'x'}.hasOwnProperty("toString")) // false

// POLYMORPHISM
ClassRabbit.prototype.toString = function () {
    return `a ${this.type} rabbit`;
}
console.log(String(blackRabbit)); // a black rabbit

//SYMBOLS, 객체의 property 이름과 상관없이 사용 가능하도록
let sym = Symbol("name");
console.log(sym === Symbol("name")); // false
ClassRabbit.prototype[sym] = 55;
console.log(blackRabbit[sym]); // 55
let toStringSymbol = Symbol("toString");
Array.prototype[toStringSymbol] = function () {
    return `${this.length}cm of blue yarn.`;
}
console.log([1, 2, 3].toString())
console.log([1, 2, 3][toStringSymbol]());
let stringObject = {
    [toStringSymbol]() {return `just a hope`}
}
console.log(stringObject[toStringSymbol]())

// THE ITERATOR INTERFACE
const forEach = (iter, f) => {
    let iterator = iter[Symbol.iterator]();
    let i = iterator.next();
    while (!i.done) {
        f(i.value);
        i = iterator.next();
    }
}
forEach([1, 2, 3], console.log)

class Matrix {
    constructor(width, height, element = (x, y) => undefined) {
        this.width = width;
        this.height = height;
        this.content = [];
        for (let h = 0; h < height; h++) {
            for (let w = 0; w < width; w++) {
                this.content[h * this.width + w] = element(w, h);
            }
        }
    }

    get(x, y) {
        return this.content[y * this.width + x];
    }
    set(x, y, value) {
        this.content[y * this.width + x] = value;
    }
}
class MatrixIterator {
    constructor(matrix) {
        this.x = 0;
        this.y = 0;
        this.matrix = matrix;
    }
    next() {
        if (this.matrix.height === this.y) return {done: true};
        let value = {x: this.x, y: this.y, value: this.matrix.get(this.x, this.y)}
        this.x++;
        if (this.x === this.matrix.width) {
            this.x = 0;
            this.y++;
        }
        return {value: value, done: false};
    }
}
// iterator symbol 등록
Matrix.prototype[Symbol.iterator] = function () {
    return new MatrixIterator(this);
}
let matrix = new Matrix(2, 2, (x, y) => `value ${x}, ${y}`);
for (let {x, y, value} of matrix) {
    console.log(x, y, value);
}

//GETTERS, SETTERS, STATIC
let varyingSize = {
    get size() {
        return Math.floor(Math.random() * 100);
    }
}
console.log(varyingSize.size)

class Temperature {
    constructor(celsius) {
        this.celsius = celsius;
    }
    get fahrenheit() {
        return this.celsius * 1.8 + 32;
    }
    set fahrenheit(value) {
        this.celsius = (value - 32) / 1.8;
    }
    static fromFahrenheit(value) {
        return new Temperature((value - 32) / 1.8);
    }
}
let temperature = new Temperature(22);
console.log(temperature.fahrenheit);
temperature.fahrenheit = 86;
console.log(temperature.celsius);

//INHERITANCE
//extends 키워드가 있으면 prototype으로 가지 않고 super 클래스 먼저 찾는다.
class SymmetricMatrix extends Matrix {
    constructor(size, element = (x, y) => undefined) {
        super(size, size, (x, y) => {
            if (x < y) return element(y, x);
            else return element(x, y);
        });
    }
    set(x, y, value) {
        super.set(x, y, value);
        if (x !== y) super.set(y, x, value);
    }
}
let symMatrix = new SymmetricMatrix(5, (x, y) => `${x}, ${y}`)
console.log(symMatrix.get(2, 3));

//EXERCISE
class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    get length() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y) )
    }
    plus(vector) {
        return new Vec(this.x + vector.x, this.y + vector.y);
    }
    minus(vector) {
        return new Vec(this.x - vector.x, this.y - vector.y);
    }
}
console.log(new Vec(1, 2).plus(new Vec(2, 3)));
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
console.log(new Vec(3, 4).length);

class Group {
    constructor() {
        this.element = [];
    }
    add(val) {
        if (this.element.indexOf(val) === -1) this.element.push(val);
    }
    delete(val) {
        let index = this.element.indexOf(val);
        if (index !== -1) {
            this.element = this.element.slice(0, index).concat(this.element.slice(index + 1));
        }
    }
    has(val) {
        return this.element.includes(val);
    }
    [Symbol.iterator]() {
        return new GroupIterator(this);
    }
    static from(arr) {
        let group = new Group();
        arr.forEach(e => group.add(e));
        return group;
    }
}
let group = Group.from([10, 20]);
console.log(group.has(10)); //true
console.log(group.has(30)); //false
group.add(10);
group.delete(10);
console.log(group.has(10)) //false

class GroupIterator {
    constructor(group) {
        this.index = 0;
        this.group = group;
    }
    next() {
        if (this.index >= this.group.element.length) return {done: true};
        let result = this.group.element[this.index];
        this.index++;
        return {value: result, done: false};
    }
}
//Group이 멤버로 해당 Symbol을 가지지 않고 프로토타입이 갖도록 한다.
// Group.prototype[Symbol.iterator] = function () {
//     return new GroupIterator(this);
// }
for (let value of Group.from(["A", "B", "C"])) console.log(value);

let map = {one: true, two: true, hasOwnProperty: true};
console.log(Object.prototype.hasOwnProperty.call(map, "one"))
console.log(Object.prototype);
let strings = ["1", "2", "3"];
