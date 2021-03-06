let red = new Array(9), blu = new Array(9);
let selection = -1;
let rcaught = [], bcaught = [];
let nari = {x: -1, y: -1, c: ''};
const pieces = {
    'bk': '玉',
    'rk': '王',
    'r': '飛',
    'r+': '龍',
    'b': '角',
    'b+': '馬',
    'g': '金',
    's': '銀',
    's+': '全',
    'n': '桂',
    'n+': '今',
    'l': '香',
    'l+': '杏',
    'p': '步',
    'p+':'と'
};
(function() {
    for(let i=0; i<9; i++) {
        red[i] = new Array(10);
        blu[i] = new Array(10);
        for(let j=0; j<10; j++) {
            red[i][j] = '';
            blu[i][j] = '';
        }
    }
    red[4][9] = 'rk';
    blu[4][9] = 'bk';
    red[3][9] = red[5][9] = blu[3][9] = blu[5][9] = 'g';
    red[2][9] = red[6][9] = blu[2][9] = blu[6][9] = 's';
    red[1][9] = red[7][9] = blu[1][9] = blu[7][9] = 'n';
    red[0][9] = red[8][9] = blu[0][9] = blu[8][9] = 'l';
    red[1][8] = blu[1][8] = 'b';
    red[7][8] = blu[7][8] = 'r';
    for(let i=0; i<9; i++) {
        red[i][7] = blu[i][7] = 'p';
    }
    requestAnimationFrame(draw);
})();
const marg = 80;
let size;
function draw() {
    let s = Math.min(window.innerWidth, window.innerHeight);
    cvs.width = cvs.height = s;
    ctx.fillStyle = 'peachpuff';
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    for(let i=0; i<11; i++) {
        ctx.moveTo(marg, (cvs.height-marg*2)/10*i+marg);
        ctx.lineTo(cvs.width-marg, (cvs.height-marg*2)/10*i+marg);
    }
    for(let i=0; i<10; i++) {
        ctx.moveTo((cvs.width-marg*2)/9*i+marg, marg);
        ctx.lineTo((cvs.width-marg*2)/9*i+marg, cvs.height-marg);
    }
    size = {x: (cvs.width-marg*2)/9, y: (cvs.height-marg*2)/10};
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = 'gray';
    ctx.font = size.y/2+'px Noto Serif JP';
    if(selection!=-1) {
        if(selection.s=='r') {
            ctx.textAlign = 'left';
            ctx.textBaseline = 'bottom';
            ctx.fillText(pieces[bcaught[selection.i]], 0, cvs.height);
        }
        else {
            ctx.fillRect(getPosX(selection.x)-size.x/4, getPosY(selection.y)-size.y/4, size.x/2, size.y/2);
        }
    }
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for(let i=0; i<9; i++) {
        for(let j=0; j<10; j++) {
            if(red[i][j].length) {
                ctx.fillStyle = red[i][j].includes('+')?'red':'black';
                ctx.fillText(pieces[red[i][j]], getPosX(i), getPosY(j));
            }
        }
    }
    let caught = '';
    bcaught.forEach(element => caught += pieces[element]);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'black';
    ctx.fillText(caught, marg, cvs.height-marg);
    ctx.save();
    ctx.translate(cvs.width/2, cvs.height/2);
    ctx.rotate(Math.PI);
    ctx.translate(-cvs.width/2, -cvs.height/2);
    if(selection!=-1&&selection.s=='b') {
        ctx.fillStyle = 'gray';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'bottom';
        ctx.fillText(pieces[rcaught[selection.i]], 0, cvs.height);
    }
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for(let i=0; i<9; i++) {
        for(let j=0; j<10; j++) {
            if(blu[i][j].length) {
                ctx.fillStyle = blu[i][j].includes('+')?'red':'black';
                ctx.fillText(pieces[blu[i][j]], getPosX(i), getPosY(j));
            }
        }
    }
    caught = '';
    rcaught.forEach(element => caught += pieces[element]);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'black';
    ctx.fillText(caught, marg, cvs.height-marg);
    ctx.restore();
    if(nari.c) {
        if(nari.c == 'b') {
            ctx.save();
            ctx.translate(cvs.width/2, cvs.height/2);
            ctx.rotate(Math.PI);
            ctx.translate(-cvs.width/2, -cvs.height/2);
        }
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = "#fff8";
        ctx.fillRect(0, 0, cvs.width/2, cvs.height);
        ctx.fillStyle = "black";
        ctx.fillText("成る", cvs.width/4, cvs.height/2);
        ctx.fillStyle = "#0008";
        ctx.fillRect(cvs.width/2, 0, cvs.width/2, cvs.height);
        ctx.fillStyle = "white";
        ctx.fillText("成らない", cvs.width/4*3, cvs.height/2);
        if(nari.c == 'b') {
            ctx.restore();
        }
    }
    requestAnimationFrame(draw);
}
function getPosX(x) {
    return (cvs.width-marg*2)/9*(2*x+1)/2+marg;
}
function getPosY(y) {
    return (cvs.height-marg*2)/10*(2*y+1)/2+marg;
}
cvs.onclick = e => clickEvent(e.offsetX, e.offsetY);
cvs.ontouchstart = e => clickEvent(e.touches[0].offsetX, e.touches[0].offsetY);
function clickEvent(_x, _y) {
    if(nari.c) {
        let x = _x < cvs.width / 2;
        if(nari.c == 'b') {
            x = !x;
        }
        if(x) {
            if(nari.c == 'r') {
                red[nari.x][nari.y] += '+';
            }
            else if(nari.c == 'b') {
                blu[nari.x][nari.y] += '+';
            }
        }
        nari.c = '';
    }
    else {
        let x = Math.floor((_x-marg)*9/(cvs.width-marg*2)), y = Math.floor((_y-marg)*10/(cvs.height-marg*2));
        if(x<0||x>8)
            return;
        if(y<0) {
            selection = {s: 'b', i: Math.floor((cvs.width-_x-marg)/size.y*2)};
            if(selection.i>=rcaught.length)
                selection = -1;
            return;
        }
        else if(y>9) {
            selection = {s: 'r', i: Math.floor((_x-marg)/size.y*2)};
            if(selection.i>=bcaught.length)
                selection = -1;
            return;
        }
        else {
            if(selection==-1) {
                if(red[x][y].length||blu[8-x][9-y].length) {
                    selection = {x: x, y: y};
                }
            }
            else if(selection.s) {
                if(selection.s=='r'&&red[x][y].length==0&&blu[8-x][9-y].length==0) {
                    red[x][y] = bcaught[selection.i];
                    bcaught.splice(selection.i, 1);
                }
                else if(selection.s=='b'&&red[x][y].length==0&&blu[8-x][9-y].length==0) {
                    blu[8-x][9-y] = rcaught[selection.i];
                    rcaught.splice(selection.i, 1);
                }
                selection = -1;
            }
            else {
                if(red[selection.x][selection.y].length&&red[x][y].length==0) {
                    red[x][y] = red[selection.x][selection.y];
                    if(y<3&&!red[x][y].includes('+')&&pieces[red[x][y]+'+']) {
                        nari.x = x;
                        nari.y = y;
                        nari.c = 'r';
                    }
                    red[selection.x][selection.y] = '';
                    if(blu[8-x][9-y].length) {
                        bcaught.push(blu[8-x][9-y].replace('\+', ''));
                        blu[8-x][9-y] = '';
                    }
                }
                else if(blu[8-selection.x][9-selection.y].length&&blu[8-x][9-y].length==0) {
                    blu[8-x][9-y] = blu[8-selection.x][9-selection.y];
                    if(y>6&&!blu[8-x][9-y].includes('+')&&pieces[blu[8-x][9-y]+'+']) {
                        nari.x = 8-x;
                        nari.y = 9-y;
                        nari.c = 'b';
                    }
                    blu[8-selection.x][9-selection.y] = '';
                    if(red[x][y].length) {
                        rcaught.push(red[x][y].replace('\+', ''));
                        red[x][y] = '';
                    }
                }
                selection = -1;
            }
        }
    }
}