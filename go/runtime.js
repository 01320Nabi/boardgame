let board = new Array(19);
let cstone = [0, 0];
let wnt = new Array(19);
const marg = 50;
(function() {
    for(var i=0; i<19; i++) {
        wnt[i] = new Array(19);
        board[i] = new Array(19);
        for(var j=0; j<19; j++) {
            board[i][j] = -1;
        }
    }
    draw();
})();
var s;
var turn = 0;
function draw() {
    s = Math.min(window.innerWidth, window.innerHeight);
    cvs.width = cvs.height = s;
    ctx.fillStyle = 'peachpuff';
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    ctx.fillStyle = ctx.strokeStyle = 'black';
    ctx.beginPath();
    for(var i=0; i<19; i++) {
        ctx.moveTo(getPosX(0), getPosY(i));
        ctx.lineTo(getPosX(18), getPosY(i));
        ctx.moveTo(getPosX(i), getPosY(0));
        ctx.lineTo(getPosX(i), getPosY(18));
    }
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(getPosX(3)+2, getPosY(3));
    ctx.arc(getPosX(3), getPosY(3), 4, 0, Math.PI*2);
    ctx.moveTo(getPosX(9)+2, getPosY(3));
    ctx.arc(getPosX(9), getPosY(3), 4, 0, Math.PI*2);
    ctx.moveTo(getPosX(15)+2, getPosY(3));
    ctx.arc(getPosX(15), getPosY(3), 4, 0, Math.PI*2);
    ctx.moveTo(getPosX(3)+2, getPosY(9));
    ctx.arc(getPosX(3), getPosY(9), 4, 0, Math.PI*2);
    ctx.moveTo(getPosX(9)+2, getPosY(9));
    ctx.arc(getPosX(9), getPosY(9), 4, 0, Math.PI*2);
    ctx.moveTo(getPosX(15)+2, getPosY(9));
    ctx.arc(getPosX(15), getPosY(9), 4, 0, Math.PI*2);
    ctx.moveTo(getPosX(3)+2, getPosY(15));
    ctx.arc(getPosX(3), getPosY(15), 4, 0, Math.PI*2);
    ctx.moveTo(getPosX(9)+2, getPosY(15));
    ctx.arc(getPosX(9), getPosY(15), 4, 0, Math.PI*2);
    ctx.moveTo(getPosX(15)+2, getPosY(15));
    ctx.arc(getPosX(15), getPosY(15), 4, 0, Math.PI*2);
    ctx.fill();
    for(var i=0; i<19; i++) {
        for(var j=0; j<19; j++) {
            if(board[i][j]>=0) {
                ctx.beginPath();
                ctx.fillStyle = board[i][j]==0?'black':'white';
                ctx.arc(getPosX(i), getPosY(j), s/42, 0, Math.PI*2);
                ctx.fill();
            }
        }
    }
    ctx.font = marg/2+'px serif';
    ctx.textBaseline = 'bottom';
    ctx.textAlign = 'left';
    ctx.fillStyle = 'black';
    ctx.fillText(cstone[0], marg/2, cvs.height);
    ctx.save();
    ctx.translate(cvs.width/2, cvs.height/2);
    ctx.rotate(Math.PI);
    ctx.translate(-cvs.width/2, -cvs.height/2);
    ctx.fillStyle = 'white';
    ctx.fillText(cstone[1], marg/2, cvs.height);
    ctx.restore();
    requestAnimationFrame(draw);
}
function getPosX(x) {
    return (cvs.width-marg*2)/18*x+marg;
}
function getPosY(y) {
    return (cvs.height-marg*2)/18*y+marg;
}
cvs.onclick = e => clickEvent(e.offsetX, e.offsetY);
cvs.ontouchstart = e => clickEvent(e.touches[0].offsetX, e.touches[0].offsetY);
function clickEvent(x, y) {
    if(x<getPosX(0)-s/42||x>getPosX(18)+s/42||y<getPosY(0)-s/42||y>getPosY(18)+s/42)
        return;
    x = Math.round((x-marg)/(cvs.width-marg*2)*18);
    y = Math.round((y-marg)/(cvs.height-marg*2)*18);
    if(board[x][y]>=0) {
        cstone[board[x][y]]++;
        board[x][y] = -1;
    }
    else {
        board[x][y] = turn;
        turn = !turn?1:0;
    }
}
const dx = [0, 1, 0, -1], dy = [1, 0, -1, 0];
window.onkeydown = function(e) {
    switch(e.keyCode) {
        case 32:
            turn = !turn?1:0;
            break;
        case 66:
            cstone[0] = Math.max(0, --cstone[0]);
            break;
        case 87:
            cstone[1] = Math.max(0, --cstone[1]);
            break;
    }
}