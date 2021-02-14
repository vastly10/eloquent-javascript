console.log(Object.keys({x: 0, y: 0, z: 0})) //['x', 'y', 'z']
let anObject = {left : 1, right : 2}
console.log("left" in anObject)
delete anObject.right
console.log("right" in anObject)
let objectA = {a : 1, b : 2}
Object.assign(objectA, {b : 3, c : 4})
console.log(objectA) // { a: 1, b: 3, c: 4}

let object1 = {value: 10}
let object2 = {value: 10}
console.log(object1 == object2) //false

const score = {visitors: 0, home: 0} //const는 참조를 바꿀 수 없도록 한다.
score.visitors = 1
//score = {visitors: 1, home: 1} // not allow

const arr = ["pizza", "chicken"]
console.log(arr.includes("pizza")) //true
for (let val of arr) {
    console.log(val); // pizza chicken
}

let todoList = []; //array like queue
const remember = task => todoList.push(task);
const getTask = () => todoList.shift();
const rememberUrgent = task => todoList.unshift(task);
const remove = (array, index) => array.slice(0, index).concat(array.slice(index + 1))

console.log("coconuts".slice(4, 7));
console.log("coconuts".indexOf("u"))
console.log("one two three".indexOf("ee"))
console.log("    okay \n".trim());
console.log(String(6).padStart(3, "0"))

let sentence = "Secretarybirds specialize in stomping";
let words = sentence.split(" ")
console.log(words)
console.log(words.join(". "))

//REST PARAMETERS
const max = (...numbers) => {
    let result = -Infinity
    for (let number of numbers) {
        if (number > result) result = number;
    }
    return result;
}
console.log(max(1, 5, 25, 3, 574, 3));
let numbers = [5, 1, 7];
console.log(max(...numbers));
let words2 = ["never", "fully"];
console.log(["will", ...words2, "understand"]);

//DESTRUCTURING
const destruct = ([val1, val2]) => console.log(val1 + val2); //변수로 접근 가능
destruct(words2);
let {name} = {name: "jang", age: 23}
console.log(name);

//JSON (Serialize)
let string = JSON.stringify({squirrel: false, events: ["weekend"]})
console.log(string);
console.log(JSON.parse(string).events);

//EXERCISE
const range = (start, end, step = 1) => {
    if (step == 0) return undefined
    let arr = [];
    if (step > 0) {
        for (start; start <= end; start = start + step) arr.push(start);
    } else {
        for (start; start >= end; start = start + step) arr.push(start);
    }
    return arr;
}
const sum = arr => {
    let sum = 0;
    arr.forEach(each => sum += each);
    return sum;
}
console.log(sum(range(1, 10)));
console.log(range(1, 10, 2));
console.log(range(5, 2))
console.log(range(5, 1, -1));

const reverseArray = arr => {
    let newArr = [];
    for (let val of arr) {
        newArr.unshift(val);
    }
    return newArr;
}
console.log(reverseArray([2, 7, 3]))
let arrayValue = [1, 2, 3, 4, 5]
const reverseArrayInPlace = arr => {
    for (let i = 0; i < Math.floor(arr.length / 2); i++) {
        swap(arr, i, arr.length - 1 - i);
    }
    function swap(arr, a, b) {
        let tmp = arr[a];
        arr[a] = arr[b];
        arr[b] = tmp;
    }
}
reverseArrayInPlace(arrayValue)
console.log(arrayValue)

const arrToList = arr => {
    let result = null;
    for (let i = arr.length - 1; i >= 0; i--) {
        result = {value: arr[i], rest: result}
    }
    return result;
}
console.log(arrToList([3, 2, 1, 5]))
const listToArr = list => {
    const result = [];
    for (let node = list; node; node = node.rest) {
        result.push(node.value);
    }
    return result;
}
console.log(listToArr(arrToList([3, 2, 1, 5])))
const prepend = (value, rest) => {
    return {value: value, rest: rest}
}
console.log(prepend(20, prepend(30, null)))
const nth = (list, index) => {
    if (index < 0) return null;
    let count = 0;
    let result = list;
    while (index > 0 && count < index) {
        if (!result) return null;
        result = result.rest;
        count++;
    }
    return result.value;
}
const nth2 = (list, index) => {
    if (!list) return undefined;
    else if (index == 0) return list.value;
    else return nth2(list.rest, index - 1);
}
console.log(nth2(arrToList([254, 252, 33]), -1))

const deepEqual = (obj1, obj2) => {
    if (obj1 === obj2) return true;
    if (obj1 == null || typeof obj1 != "object" || obj2 == null || typeof obj2 != "object") return false
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;
    for (let key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false
    }
    return true;
}

let obj = {here: {is: "an"}, object: 2}
console.log(deepEqual(obj, obj))
console.log(deepEqual(obj, {here: 1, object: 2}))
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));