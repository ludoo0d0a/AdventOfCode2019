// prettier-ignore
console.log('day4a');
var fs = require('fs');
var content = fs.readFileSync('4a.txt', 'utf8');
var lines = content.split(/\r\n?/);

// testNumber(111111, true);
// testNumber(112233, true);
// testNumber(123456, false); // no duplicate
// testNumber(123455, true); 
// testNumber(135589, true); //ok
// testNumber(912345, false); 

testNumber(123455, true);
testNumber(123445, true);
testNumber(112345, true);
testNumber(112344, true);
testNumber(112277, true);
testNumber(123337, false);
testNumber(112333, false);
testNumber(123444, false);
testNumber(111111, false);

const from = 178416;
const to = 676461;
checkAllInRange(from, to);


function testNumber(v, shouldBe){
    const ok = checkPassword(v);
    console.log('%d : %s', v, (ok==shouldBe));
}

function checkAllInRange(from, to){
    let count=0;

    for (let i = from; i <= to; i++) {
        if (checkPassword(i)){
            ++count ;
        }    
    }
    console.log('result = %d', count);
}

function checkPassword(v){
    return  (hasTwoAdjDigits(v) && alwaysIncrease(v));
}

function hasTwoAdjDigits(v){
    var t = (''+v).split('');
    let exact2Digits = false;
    for (let i = 1; i < t.length; i++) {
        if (t[i]==t[i-1]){
            //exact 2?
            if (i>=t.length-1){
                //end
                //return true;
                exact2Digits = true;
            }else if (t[i]==t[i+1]){
                return false;
            }else{
                // exact 2, continue, may several, but one is enough
                //exact2Digits = true;
                return true;
            }
            //return true;
        }
    }
    return exact2Digits;
}

function alwaysIncrease(v){
    var t = (''+v).split('').map(Number);
    for (let i = 1; i < t.length; i++) {
        if (t[i]<t[i-1]){
            return false;
        }
    }
    return true;
}
