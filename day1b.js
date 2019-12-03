var fs = require('fs');
var content = fs.readFileSync('1.txt', 'utf8');

function addFuel(num){
    // console.log('num : %d', num)
    var fuel = getFuel(num)
    if (fuel>0){
        var r = addFuel(fuel)
        // console.log('=%d', num+r)
        return num + r;
    }else{
        return num;
    }
}
function getFuel(num){
    return Math.floor(num/3)-2
}
function reducer(total, num) {
    if (!num) return total;
    num = parseInt(num,10)
    var r = total + addFuel(getFuel(num));
    console.log('%d + fuel: %d', num, r)
    return r;
}
var lines = content.split('\n');
var r = lines.reduce(reducer, 0)

console.log('Result=%d', r)