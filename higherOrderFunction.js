const SCRIPTS = require('./scripts')
const noisy = f => {
    return (...args) => {
        console.log("calling with", args);
        let result = f(...args);
        console.log("called with", args, ", returned", result);
        return result;
    };
}
console.log(noisy(Math.min)(1, 352, 3, -1));

const repeat = (times, action) => {
    for (let count = 0; count < times; count++) {
        action(count);
    }
}
repeat(3, console.log);

const unless = (test, then) => {
    if (!test) then();
}
repeat(3, n => {
    unless(n % 2 === 1, () => console.log(n, "is Even"))
})

const characterScript = (code) => {
    for (let script of SCRIPTS) {
        if (script.ranges.some(([from, to]) => code >= from && code < to)) {
            return script;
        }
    }
    return null;
}
console.log(characterScript(121));

// array.findIndex(Predicate)
const countBy = (items, groupName) => {
    let counts = [];
    for (let item of items) {
        let name = groupName(item);
        let known = counts.findIndex(c => c.name == name);
        if (known == -1) counts.push({name, count: 1})
        else counts[known].count++;
    }
    return counts;
}
console.log(countBy([1, 2, 3, 4, 5], item => item > 2));
//EXERCISE
const flatten = (arr) => {
    return arr.reduce((a, b) => a.concat(b))
};
let arrays = [[1, 2, 3], [4, 5], [6]];
console.log(flatten(arrays)); // [1, 2, 3, 4, 5, 6]

const loop = (value, test, update, body) => {
    while (test(value)) {
        body(value);
        value = update(value);
    }
}
loop(3, n => n > 0, n => n - 1, console.log);

//array.some(predicate) : 특정 조건에 부합하는 원소가 있는지 확인
let arrays2 = [1, 2, 3, 4, 5];
console.log(arrays2.some(n => n > 3)); // true
console.log(arrays2.some(n => n > 6)); // false

const every = (array, test) => {
    for (let each of array) {
        if (!test(each)) return false;
    }
    return true;
}
const every2 = (array, test) => !array.some(each => !test(each));
console.log(every2([1, 3, 5], n => n < 10)); //true
console.log(every2([2, 4, 16], n => n < 10)); //false
console.log(every2([], n => n < 10)); //true

const dominantDirection = (text) => {
    let counted = countBy(text, char => {
        let result = characterScript(char.codePointAt(0));
        return result ? result.direction : "none";
    }).filter(({name}) => name != "none"); // 구조분해
    if (counted.length === 0) return "ltr"
    return counted.reduce((a, b) => a.count > b.count ? a : b).name;
}

console.log(dominantDirection("Hello!")); // → ltr
console.log(dominantDirection("Hey, مساء الخير")); // → rtl
console.log(dominantDirection(""))
