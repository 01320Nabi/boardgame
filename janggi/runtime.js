let red = new Array(9), blu = new Array(9);
let selection = -1;
const pieces = {
    '초궁': '楚',
    '한궁': '漢',
    '초사': '士',
    '한사': '士',
    '초차': '车',
    '한차': '車',
    '초포': '包',
    '한포': '包',
    '초상': '象',
    '한상': '象',
    '초마': '马',
    '한마': '馬',
    '초병': '卒',
    '한병': '兵'
};
const sizes = {
    '초궁': 1.25,
    '한궁': 1.25,
    '초사': 2.5,
    '한사': 2.5,
    '초차': 1.75,
    '한차': 1.75,
    '초포': 1.75,
    '한포': 1.75,
    '초상': 1.75,
    '한상': 1.75,
    '초마': 1.75,
    '한마': 1.75,
    '초병': 2.5,
    '한병': 2.5
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
    red[4][8] = '한궁';
    red[3][9] = red[5][9] = '한사';
    red[2][9] = red[6][9] = '한마';
    red[1][9] = red[7][9] = '한상';
    red[0][9] = red[8][9] = '한차';
    red[1][7] = red[7][7] = '한포';
    red[0][6] = red[2][6] = red[4][6] = red[6][6] = red[8][6] = '한병';
    blu[4][8] = '초궁';
    blu[3][9] = blu[5][9] = '초사';
    blu[2][9] = blu[6][9] = '초마';
    blu[1][9] = blu[7][9] = '초상';
    blu[0][9] = blu[8][9] = '초차';
    blu[1][7] = blu[7][7] = '초포';
    blu[0][6] = blu[2][6] = blu[4][6] = blu[6][6] = blu[8][6] = '초병';
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
    for(var i=0; i<9; i++) {
        ctx.moveTo(getPosX(i), getPosY(0));
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
    ctx.beginPath();
    ctx.moveTo(getPosX(0), getPosY(3)-2);
    ctx.arc(getPosX(0), getPosY(3), 4, Math.PI/2*3, Math.PI/2);
    ctx.moveTo(getPosX(2)+2, getPosY(3));
    ctx.arc(getPosX(2), getPosY(3), 4, 0, Math.PI*2);
    ctx.moveTo(getPosX(4)+2, getPosY(3));
    ctx.arc(getPosX(4), getPosY(3), 4, 0, Math.PI*2);
    ctx.moveTo(getPosX(6)+2, getPosY(3));
    ctx.arc(getPosX(6), getPosY(3), 4, 0, Math.PI*2);
    ctx.moveTo(getPosX(8), getPosY(3)+2);
    ctx.arc(getPosX(8), getPosY(3), 4, Math.PI/2, Math.PI/2*3);
    ctx.moveTo(getPosX(0), getPosY(6)-2);
    ctx.arc(getPosX(0), getPosY(6), 4, Math.PI/2*3, Math.PI/2);
    ctx.moveTo(getPosX(2)+2, getPosY(6));
    ctx.arc(getPosX(2), getPosY(6), 4, 0, Math.PI*2);
    ctx.moveTo(getPosX(4)+2, getPosY(6));
    ctx.arc(getPosX(4), getPosY(6), 4, 0, Math.PI*2);
    ctx.moveTo(getPosX(6)+2, getPosY(6));
    ctx.arc(getPosX(6), getPosY(6), 4, 0, Math.PI*2);
    ctx.moveTo(getPosX(8), getPosY(6)+2);
    ctx.arc(getPosX(8), getPosY(6), 4, Math.PI/2, Math.PI/2*3);
    ctx.moveTo(getPosX(1)+2, getPosY(2));
    ctx.arc(getPosX(1), getPosY(2), 4, 0, Math.PI*2);
    ctx.moveTo(getPosX(7)+2, getPosY(2));
    ctx.arc(getPosX(7), getPosY(2), 4, 0, Math.PI*2);
    ctx.moveTo(getPosX(1)+2, getPosY(7));
    ctx.arc(getPosX(1), getPosY(7), 4, 0, Math.PI*2);
    ctx.moveTo(getPosX(7)+2, getPosY(7));
    ctx.arc(getPosX(7), getPosY(7), 4, 0, Math.PI*2);
    ctx.fill();
    size = {x: (cvs.width-marg*2)/9, y: (cvs.height-marg*2)/10};
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for(var i=0; i<9; i++) {
        for(var j=0; j<10; j++) {
            if(red[i][j].length) {
                ctx.font = size.y/sizes[red[i][j]]+'px Noto Serif TC';
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(getPosX(i), getPosY(j), size.y/sizes[red[i][j]]/1.5, 0, Math.PI*2);
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
                ctx.font = size.y/sizes[blu[i][j]]+'px '+(choseo.checked?'Liu Jian Mao Cao':'Noto Serif TC');
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(getPosX(i), getPosY(j), size.y/sizes[blu[i][j]]/1.5, 0, Math.PI*2);
                ctx.fill();
                ctx.fillStyle = 'green';
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
    else {
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
}