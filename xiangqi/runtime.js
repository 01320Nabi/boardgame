let red = new Array(9), blu = new Array(9);
let selection = -1;
const pieces = {
    'rg': '將',
    'bg': '帥',
    'ra': '仕',
    'ba': '士',
    're': '相',
    'be': '象',
    'rh': '傌',
    'bh': '馬',
    'rr': '俥',
    'br': '車',
    'rc': '炮',
    'bc': '砲',
    'rs': '兵',
    'bs': '卒'
};
(function() {
    for(var i=0; i<9; i++) {
        red[i] = new Array(10);
        blu[i] = new Array(10);
        for(var j=0; j<10; j++) {
            red[i][j] = '';
            blu[i][j] = '';
        }
    }
    red[4][9] = 'rg';
    red[3][9] = red[5][9] = 'ra';
    red[2][9] = red[6][9] = 're';
    red[1][9] = red[7][9] = 'rh';
    red[0][9] = red[8][9] = 'rr';
    red[1][7] = red[7][7] = 'rc';
    red[0][6] = red[2][6] = red[4][6] = red[6][6] = red[8][6] = 'rs';
    blu[4][9] = 'bg';
    blu[3][9] = blu[5][9] = 'ba';
    blu[2][9] = blu[6][9] = 'be';
    blu[1][9] = blu[7][9] = 'bh';
    blu[0][9] = blu[8][9] = 'br';
    blu[1][7] = blu[7][7] = 'bc';
    blu[0][6] = blu[2][6] = blu[4][6] = blu[6][6] = blu[8][6] = 'bs';
    requestAnimationFrame(draw);
})();
const marg = 80;
let size;
function draw() {
    var s = Math.min(window.innerWidth, window.innerHeight);
    cvs.width = cvs.height = s;
    ctx.fillStyle = 'peachpuff';
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    ctx.fillStyle = ctx.strokeStyle = 'black';
    ctx.beginPath();
    for(var i=0; i<10; i++) {
        ctx.moveTo(getPosX(0), getPosY(i));
        ctx.lineTo(getPosX(8), getPosY(i));
    }
    ctx.moveTo(getPosX(0), getPosY(0));
    ctx.lineTo(getPosX(0), getPosY(9));
    ctx.moveTo(getPosX(8), getPosY(0));
    ctx.lineTo(getPosX(8), getPosY(9));
    for(var i=1; i<8; i++) {
        ctx.moveTo(getPosX(i), getPosY(0));
        ctx.lineTo(getPosX(i), getPosY(4));
        ctx.moveTo(getPosX(i), getPosY(5));
        ctx.lineTo(getPosX(i), getPosY(9));
    }
    ctx.moveTo(getPosX(3), getPosY(0));
    ctx.lineTo(getPosX(5), getPosY(2));
    ctx.moveTo(getPosX(5), getPosY(0));
    ctx.lineTo(getPosX(3), getPosY(2));
    ctx.moveTo(getPosX(3), getPosY(9));
    ctx.lineTo(getPosX(5), getPosY(7));
    ctx.moveTo(getPosX(5), getPosY(9));
    ctx.lineTo(getPosX(3), getPosY(7));
    ctx.stroke();
    ctx.closePath();
    size = {x: (cvs.width-marg*2)/9, y: (cvs.height-marg*2)/10};
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = size.y/1.5+'px Noto Sans TC';
    for(var i=0; i<9; i++) {
        for(var j=0; j<10; j++) {
            if(red[i][j].length) {
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(getPosX(i), getPosY(j), size.y/2.25, 0, Math.PI*2);
                ctx.fill();
                ctx.fillStyle = 'red';
                ctx.fillText(pieces[red[i][j]], getPosX(i), getPosY(j));
            }
        }
    }
    ctx.save();
    ctx.translate(cvs.width/2, cvs.height/2);
    ctx.rotate(Math.PI);
    ctx.translate(-cvs.width/2, -cvs.height/2);
    for(var i=0; i<9; i++) {
        for(var j=0; j<10; j++) {
            if(blu[i][j].length) {
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(getPosX(i), getPosY(j), size.y/2.25, 0, Math.PI*2);
                ctx.fill();
                ctx.fillStyle = 'black';
                ctx.fillText(pieces[blu[i][j]], getPosX(i), getPosY(j));
            }
        }
    }
    ctx.restore();
    if(selection!=-1) {
        ctx.fillStyle = '#0004';
        ctx.beginPath();
        ctx.arc(getPosX(selection.x), getPosY(selection.y), size.x/4, 0, Math.PI*2);
        ctx.fill();
    }
    requestAnimationFrame(draw);
}
function getPosX(x) {
    return (cvs.width-marg*2)/8*x+marg;
}
function getPosY(y) {
    return (cvs.height-marg*2)/9*y+marg;
}
cvs.onclick = e => clickEvent(e.offsetX, e.offsetY);
cvs.ontouchstart = e => clickEvent(e.touches[0].offsetX, e.touches[0].offsetY);
function clickEvent(_x, _y) {
    var x = Math.round((_x-marg)*8/(cvs.width-marg*2)), y = Math.round((_y-marg)*9/(cvs.height-marg*2));
    if(x<0||x>8||y<0||y>9)
        return;
    if(selection==-1) {
        if(red[x][y].length||blu[8-x][9-y].length) {
            selection = {x: x, y: y};
        }
    }
    else {
        if(red[selection.x][selection.y].length&&red[x][y].length==0) {
            red[x][y] = red[selection.x][selection.y];
            red[selection.x][selection.y] = '';
            if(blu[8-x][9-y].length) {
                blu[8-x][9-y] = '';
            }
        }
        else if(blu[8-selection.x][9-selection.y].length&&blu[8-x][9-y].length==0) {
            blu[8-x][9-y] = blu[8-selection.x][9-selection.y];
            blu[8-selection.x][9-selection.y] = '';
            if(red[x][y].length) {
                red[x][y] = '';
            }
        }
        selection = -1;
    }
}