// prettier-ignore
console.log('day4a');
var fs = require('fs');
var content = fs.readFileSync('5.txt', 'utf8');

var lines = content.split('\n');
var line = lines[0]
console.log(line)

console.log('--')
var values = line.trim().split(',').map(Number);
const len = values.length
console.log('%d values', len);

// logHumanLine(line)

const INPUT = 1

let i = 0;
const reOpcode = /(\d\d)?(\d)?(\d)?(\d\d)$/;
while ( i < len) {
    // console.log('i :', i);
    const v = values[i];
    let opcode=v;
    let m=false;

    if ((''+v).length>2){
        m = reOpcode.exec('000'+v);
        opcode = Number(m[4]); //last 2 digits
    }

    console.log(' ');
    console.log('opcode [%s] = %s', v, opcode);
    logNextValues(i, values)


    if (opcode==1|| opcode==2){
        const arg1 = values[i+1];
        const arg2 = values[i+2];
        const mode1 = getMode(m && m[3]);
        const mode2 = getMode(m && m[2]);
        const v1 = getValue(values,arg1,mode1); //values[i+1];
        const v2 = getValue(values,arg2,mode2); //values[i+2];

        const pr = values[i+3]; // write always m[1]=0 == position mode,
        // const vr = getValue(values,pr,m[1]);  
         const vr = values[pr]

        let d1 = logValue(mode1, arg1, v1);
        let d2 = logValue(mode2, arg2, v2);

        if (opcode===1){
            values[pr] = v1 + v2;
            console.log('Add %s + %s in @%s= %s -> %s', d1, d2 , pr, vr, values[pr] );
        }else if (opcode===2) {
            values[pr] = v1 * v2;
            console.log('Multiply %s * %s in @%s= %s -> %s', d1, d2, pr, vr, values[pr] );
        }
        i+=4
    }else if (opcode===3) {
        const pr = values[i+1];
        console.log('Set %s @%s', INPUT, pr );
        //const v = getValue(values,i+1,0); //values[i+1];
        values[pr] = INPUT
        i+=2
    }else if (opcode==4) {
        const arg1 = values[i+1];
        const mode1 = getMode(m && m[3]);
        const v1 = getValue(values,arg1,mode1); //values[i+1];
        let d1 = logValue(mode1, arg1, v1);
        console.log('Get %s', d1 );
        console.log(values[pr]);
        i+=2

    }else if (opcode==99) {
        ++i
        break
    }else{
        console.error('STOP - Unkown opcode %s', opcode);
        break
    }
    // console.log(values.join(','))
    
}

function getMode(mode){
     if (mode && Number(mode)==1){
         return 1; // position mode
     }else{
         return 0;  //1 == immediate mode
     }
}

function getValue(values,p1,mode){
    //  0 == position mode
    // 1 == immediate mode
    if (mode==1){
        return p1;
    }else{
        return values[p1];
    }
}

console.log(values.join(','))

console.log('Result=%d', values[0])


function logHumanLine(line){
    let r = line
    .replace(/\b1\b,?/g, '\nADD ')
    .replace(/\b2\b,?/g, '\nMUL ')
    .replace(/\b3\b,?/g, '\nSET ')
    .replace(/\b4\b,?/g, '\nGET ')
    .replace(/(\b\d{4,}\b),?/g, '\nOPCODE $1')

    console.log(r)
}
function logValue(mode, arg, v){
    if  (mode==0?'@':'') {
      return '@' + arg + ':' + v;
    }else{
        return arg; //arg = v
    }
}

function logNextValues(i, values){
    let t = values.slice(i,i+5).join(',')
    console.log('>> @%d %s', i, t);
}