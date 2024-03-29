//EVALUATION DATA AS CODE
const x = 1;
function evalAndReturnX(code) {
    eval(code);
    return x;
}
console.log(evalAndReturnX("var x = 2"));
console.log(x)

let plusOne = Function("n, m", "return n + m");
console.log(plusOne(4, 5));


//COMMON JS $npm install ordinal $npm install date-names
const ordinal = require("ordinal");
const {days, months} = require("date-names");

// global scope의 exports에 등록한다.
exports.formatDate = function(date, format) {
    return format.replace(/YYYY|M(MMM)?|Do?|dddd/g, tag => {
        if (tag == "YYYY") return date.getFullYear();
        if (tag == "M") return date.getMonth();
        if (tag == "MMMM") return months[date.getMonth()];
        if (tag == "D") return date.getDate();
        if (tag == "Do") return ordinal(date.getDate());
        if (tag == "dddd") return days[date.getDay()];
    });
};

require.cache = Object.create(null);
function require(name) {
    if (!(name in require.cache)) {
        let code = readFile(name); //read file to string
        let module = {exports: {}};
        require.cache[name] = module;
        let wrapper = Function("require, exports, module", code);
        wrapper(require, module.exports, module);
    }
    return require.cache[name].exports;
}

//ECMASCRIPT MODULES 이 모듈(js file)에서 {}없이 import를 받으면 기본으로 받는 객체를 지정
export default ["Winter", "Spring", "Summer", "Autumn"]