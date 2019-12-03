var fs = require('fs');
var content = fs.readFileSync('2.txt', 'utf8');

var lines = content.split('\n');
var line = lines[0]
// console.log(line)
var values = line.trim().split(',').map(Number);
const len = values.length
_values = values; // Backup

noun = 15;
verb = 2;
const maxi_noun = 99;
const maxi_verb = maxi_noun;
const expected = 19690720;
// const expected = 3706713; // 12+2

for (let noun = 0; noun < maxi_noun; noun++) {
    for (let verb = 0; verb < maxi_verb; verb++) {
        var r = compute(noun, verb);
        // console.log('noun:%d, verb:%d, temp : %d', noun, verb, r);
        if (r == expected){
            console.log('Found noun=%d verb=%d', noun, verb);
            const r = 100 * noun + verb
            console.log('result : %d', r);
            process.exit()
        }
    }
}
console.log('Failed');

function compute(noun, verb){
    values = [..._values];
    values[1]=noun;
    values[2]=verb;

    for (let i = 0; i < len; ) {
        // console.log('i :', i);
        const v = values[i];
        if (v==1 || v==2){
            const p1 = values[i+1];
            const p2 = values[i+2];
            const pr = values[i+3];
            if (v==1){
                // console.log('@%d = @%d+@%d', pr, p1, p2);
                values[pr] = values[p1] + values[p2]
                i+=4
            }else if (v==2) {
                // console.log('@%d = @%d*@%d', pr, p1, p2);
                values[pr] = values[p1] * values[p2]
                i+=4
            }
        }else if (v==99) {
            i+=1
            break
        }else{
            //  console.error('opcode unkwown %s', v)
             break
        }
        // console.log(values.join(','))
    }

    // console.log(values.join(','))
    // console.log('Result=%d', values[0])
    return values[0];    
}
