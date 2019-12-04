// prettier-ignore
console.log('day3a');
var fs = require('fs');
var content = fs.readFileSync('3.txt', 'utf8');
var lines = content.split(/\r\n?/);
var p = [0, 0];
var p0 = [...p];
let max = Infinity;
let minSteps = Infinity;
let target = {};

const allow_draw = false;

findIntersectionsOnLine(lines[0], lines[1]);
console.log('finished min steps = '+minSteps);

function findIntersectionsOnLine(line0, line1) {
  const wire0 = getVectors(line0);
  const wire1 = getVectors(line1);
  return findIntersectionsOnWire(wire0, wire1);
}

function findIntersectionsOnWire(wire0, wire1) {
    //drawWires([wire0]);
    //drawWires([wire1]);
    drawWires([wire0,wire1]);

    wire1.forEach(v1 => {
        wire0.forEach(v0 => {
            if (v0 == v1) return;
            // console.log('%s vs %s', v0[6], v1[6]);
            findIntersections(v0, v1, wire0, wire1);
        });
    });
}

function getSteps(v0, v1, pt, wire0, wire1){
    const steps0 = getLength(wire0, v0, pt)
    const steps1 = getLength(wire1, v1, pt);
    const steps= steps0 + steps1;
    console.log('Found %d + %d = %d steps', steps0, steps1, steps);
    return steps;
}

function getLength2Points(p1, p2){
    return Math.sqrt( Math.pow(p1[0]-p2[0],2) + Math.pow(p1[1]-p2[1],2) );
}

function getLength(wire, vx, pt){
    let len = 0;
    for (const v of wire) {
        if (vx==v) {
            const l = getLength2Points(vx[0], pt); 
            return len + l; 
        }
        len += v[3];
    }
    
    return len;
}

function getVectors(wire) {
  let p = [0,0];
  return wire
    .trim()
    .split(',')
    .map(v => {
      var dir = v[0];
      var len = Number(v.slice(1));
      var dx = dir == 'R' ? len : dir == 'L' ? -len : 0;
      var dy = dir == 'U' ? len : dir == 'D' ? -len : 0;
      var np = [p[0] + dx, p[1] + dy];
      var r = [[...p], [...np], dir, len, dx, dy, v];
      p = np;
      return r;
    });
}

function findIntersections(v0, v1, wire0, wire1){
    var pts = _intersect(v0, v1)
    if (pts){
        pts.forEach(pt => {
            if (pt[0]!=0 || pt[1]!=0){
                console.log('intersect %s %s = %s', logVector(v0), logVector(v1), logPt(pt));
                // let dist = getDistance(p0, pt);
                const steps = getSteps(v0, v1, pt, wire0, wire1);
                if (steps>0 && steps < minSteps){
                    minSteps = steps
                    console.log('Found min steps %d @ %s', steps, logPt(pt));
                }
            }
        })
    }
}

function getDistance(a,b){
    // {\displaystyle d(A,B)=|X_{B}-X_{A}|+|Y_{B}-Y_{A}|}
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) ;
}


function logVector(v) {
  return v[6]+ ' ' + logPt(v[0]) + '-' + logPt(v[1]);
}
function logPt(p) {
  return '['+ p[0] + ',' + p[1] + ']' ;
}

function _intersect(pa, pb){
   return intersect(
       pa[0][0], pa[0][1], 
       pa[1][0], pa[1][1], 
       pb[0][0], pb[0][1], 
       pb[1][0], pb[1][1]
    )
}

function intersectParallel(x1, y1, x2, y2, x3, y3, x4, y4) {
    if (x1 === x2 && x1 === x3 && x1 === x4)  {
	    //vertical
        let v1 = [y1, y2].sort()
        let v2 = [y3, y4].sort()

        let a = Math.max(v1[0] , v2[0] )
        let b = Math.min(v1[1] , v2[1] )

        // v1 en dessous
        console.log( 'v: x' + x1 + ', y:' + a + '->' + b)
        return generateAllPoints(x1, x1, a, b)

	}else if (y1 === y2 && y1 === y3 && y1 === y4 )  {
        //horizontal
        let v1 = [x1, x2].sort()
        let v2 = [x3, x4].sort()
        if (v1[0]> v2[0]){
            // v1 au dessus
            console.log( 'h: ' + y1 + ',' + v1[1] + '->' + v2[0])
            return generateAllPoints(v1[1], v2[0], y1, y1)
        }else{
            // v1 en dessous
            console.log( 'h: ' + y1 + ',' + v1[0] + '->' + v2[1])
            return generateAllPoints(v1[0], v2[1], y1, y1)
        }

	}
    return false
}

function generateAllPoints(x1, x2, y1, y2){
    let pts=[];
    for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
            pts.push([x,y])
        }
    }
    return pts;
}

// line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
// Determine the intersection point of two line segments
// Return FALSE if the lines don't intersect
function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {

  // Check if none of the lines are of length 0
	if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
		return false
	}

	let denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))

  // Lines are parallel
	if (denominator === 0) {
		return intersectParallel(x1, y1, x2, y2, x3, y3, x4, y4)
	}

	let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
	let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

  // is the intersection along the segments
	if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
		return false
	}

  // Return a object with the x and y coordinates of the intersection
	let x = x1 + ua * (x2 - x1)
	let y = y1 + ua * (y2 - y1)

	// return {x, y}
    return [[x, y]]
}

function drawWires(wires){
    if (!allow_draw) return;

    let t=1
    let b = getBoundaryWires(wires);
    
    var pad = createArraySquare(b.bx+1, b.by+1);
    wires.forEach(wire => {
        wire.forEach(w => {
            dashWirePad(pad, w, b, t)
            //logPad(pad);
        })
        ++t;
    })
   console.log('Draw pad preview')
   logPad(pad);
}

function logPad(pad){
    var txt = pad
      .map(row => {
        return row.join('');
      })
      .reverse()
      .join('\n');
    console.log(txt);
    console.log(' ');
}

function dashWirePad(pad, w, b, t='-'){
    let [p1,p2,dir, len, dx, dy] = w
    let ax = (dx>0) ? 1 : (dx<0) ? -1 : 0;
    let ay = (dy>0) ? 1 : (dy<0) ? -1 : 0;
    let x = p1[0] + b.start_x;
    let y = p1[1] + b.start_y; 
    for (let i = 0; i <= len; i++) {
        if (!pad || y > pad.length || !pad[y] || x > pad[y].length){
            console.error('argh ')
        }
        pad[y][x] = (pad[y][x]!='.') ? 'x' : t
        x += ax;
        y += ay; 
    }
}

function createArraySquare(cols, rows){
    var r = new Array(rows);
    for (var row = 0; row < rows; row++) {
        r[row] = new Array(cols);
        for (var col = 0; col < cols; col++) {
            r[row][col] ='.'
        }
    }
    return r
}

function moveBoundary(p, b){
    if (p[0] > b.bx){
        b.bx = p[0]
    }
    if (p[0] < b.ax){
        b.ax = p[0]
    }

    if (p[1] > b.by){
        b.by = p[1]
    }
    if (p[1] < b.ay){
        b.ay = p[1]
    }
}

function getBoundaryWires(wires){
    //boundary from a to b, d is sthe startingpoint
    let b = {ax:0, ay:0, bx:0, by:0, start_x:0, start_y:0 }
    wires.forEach(wire => {
        getBoundary(wire, b)
    })

    //adjust boundary to start at 0,0
    centerBoundary(b)
    console.log('Centered boundary for all wires [%d,%d]-[%d,%d] start@ [%d,%d]', b.ax, b.ay, b.bx, b.by, b.start_x, b.start_y)
    return b;
}

function getBoundary(wire, b){
    wire.forEach(w => {
        let m = w[0]
        let n = w[1]
        moveBoundary(m, b)
        moveBoundary(n, b)
    })
    console.log('Boundary for a wire [%d,%d]-[%d,%d] start@ [%d,%d]', b.ax, b.ay, b.bx, b.by, b.start_x, b.start_y)
    return b
}

function centerBoundary(b){
    b.start_x=(b.ax<0) ? -b.ax: 0
    b.start_y=(b.ay<0) ? -b.ay: 0

    b.ax+=b.start_x
    b.ay+=b.start_y

    b.bx+=b.start_x
    b.by+=b.start_y
}