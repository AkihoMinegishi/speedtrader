var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

class GameFlow {
  scene; // Title 1, Options 2, Countdown 3, InGame 4, Result 5
  constructor() {
    this.scene = 1;
  }

  get get_scene() {
    return this.scene;
  }

  change_scene(n) {
    if(1 <= n && n <= 5) this.scene = n;
  }
}

class Title {
}

class Options {
}

class CountDown {
}

class InGame {
}

class Result {
}

class SaveData {
}

class Times {
}

class ValueMove {
}

class GameStats {
}

class WindowSize {
  // fit canvas 3:4
  fitCanvas() {
    let winw = document.documentElement.clientWidth;
    let winh = document.documentElement.clientHeight;
    if(winw * 0.75 <= winh) {
      canvas.width = winw;
      canvas.height = winw * 0.75;
    } else {
      canvas.width = winh * (4.0/3);
      canvas.height = winh;
    }
  }
}

//=======================================================================

const gf = new GameFlow();
const tt = new Title();
const op = new Options();
const cd = new CountDown();
const gm = new InGame();
const rs = new Result();
const sv = new SaveData();
const tm = new Times();
const mv = new ValueMove();
const st = new GameStats();
const ws = new WindowSize();

//=======================================================================

function draw() {
  ws.fitCanvas();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if(gf.scene == 1) {

  } else if(gf.scene == 2) {

  } else if(gf.scene == 3) {

  } else if(gf.scene == 4) {

  } else {

  }
}

setInterval(draw, 1.0/30);

window.onresize = ws.fitCanvas;