var fs = require('fs');
var content = fs.readFileSync('2.txt', 'utf8');

var lines = content.split('\n');
var line = lines[0]
console.log(line)
console.log('--')
var values = line.trim().split(',').map(Number);
const len = values.length

values[1]=12;
values[2]=2;
let i = 0;
while ( i < len) {
    // console.log('i :', i);
    const v = values[i];
    if (v==1|| v==2){
        const p1 = values[i+1];
        const p2 = values[i+2];
        const pr = values[i+3];
        if (v==1){
            // console.log('@%d = @%d+@%d', pr, p1, p2);
            values[pr] = values[p1] + values[p2]
        }else if (v==2) {
            // console.log('@%d = @%d*@%d', pr, p1, p2);
            values[pr] = values[p1] * values[p2]
        }
        i=i+4
    }else if (v==99) {
        i=i+1
        break
    }else{
        break
    }
    // console.log(values.join(','))
    
}

console.log(values.join(','))

console.log('Result=%d', values[0])
