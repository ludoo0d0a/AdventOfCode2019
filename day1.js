var fs = require('fs');
var content = fs.readFileSync('1.txt', 'utf8');

function addFuel(total, num){
    return total + Math.floor(parseInt(num,10)/3)-2
}
function reducer(total, num) {
    if (!num) return total;

    return addFuel(total, num);
}
var lines = content.split('\n');
var r = lines.reduce(reducer, 0)

console.log('Result=%d', r)