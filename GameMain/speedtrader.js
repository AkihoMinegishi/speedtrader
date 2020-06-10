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
  write_cookie(nam,val){
    if(navigator.cookieEnabled){
      var date = new Date();

      date.setTime(date.getTime() + 365*24*60*60*1000);

      document.cookie = nam+"="+escape(val)+";expires="+date.toGMTString();

      return true;
    }else{
      return false;
    }
  }
  read_cookie(nam){
    if(navigator.cookieEnabled){
      var cook = document.cookie + ";";
      var cStart, cEnd;
      nam = nam+"=";

      cStart = cook.indexOf(nam,0);

      if(cStart == -1){
        return "nodata";
      }else{
        cEnd = cook,indexOf(";",cStart);
        return unescape(cook.substring(cStart.nam.length, cEnd));
      }
    }else{
      return "nodata";
    }
  }

  init_data(){
    this.write_cookie("scores","");
    this.write_cookie("dates","");
  }

  get_ranks(){
    var gotrank = new Array();
    var scores = this.read_cookie("scores");
    var dates = this.read_cookie("dates");
    scores = scores.split(",");
    dates = date.split(",");
    for(var i=0;i<scores.length;i++){
      gotrank[i][0] = scores[i];
      gotrank[i][1] = dates[i];
    }

    return gotrank;
  }
  get_options(){
    var gotopt = this.read_cookie("options");
    gotopt = gotopt.split(",");
    return gotopt;
  }

  save_ranks(rs){
    var sav_score="";
    var sav_date="";
    for(var i=0; i<rs[0].length; i++){
      sav_score += ""+rs[i][0];
      sav_date  += ""+rs[i][1];
      if(i!=rs[0].length-1){sav_score += ",";sav_date += ",";}
    }
    this.write_cookie("scores",sav_score);
    this.write_cookie("dates",sav_date);
  }
  save_options(op){
    var sav_opts="";
    for(var i=0;i<op.length;i++){
      sav_opts=""+op;
      if(i!=op.length-1)sav_opts += ",";
    }
    this.write_cookie("options",sac_opts);
  }
}

class Times {
  start_time;
  start_count(){
    var date = new Date();
    this.start_time = date.getTime();
  }
  get_elapsed(){
    var date = new Date();
    return this.start_time - date.getTime();
  }
  get_curtime(){
    var date = new Date();
    var ret = new Array();
    ret[0] = date.getFullYear();
    ret[1] = date.getMonth();
    ret[2] = date.getDay();
    ret[3] = date.getHours();
    ret[4] = date.getMinutes();
    return ret;
  }
}

class ValueMove {
  val_sets;
  vals;
  constructor(){
    this.val_sets = new Array();
    this.vals = new Array();
  }
  set_vals(type){
    this.vals[0] = 90 + Math.floor( Math.random() * 21); //買値
    switch(type){
      case 0: //ジリ貧型
        for(var i=1; i<=12; i++){
          this.vals[i] = this.vals[i-1] - 3 - Math.floor(Math.random() * 4); //3~6ずつ減るだけの型
        }
      break;
      case 1: //四期型
        var mod = 1+Math.floor(Math.random() * 8); //変調場所
        var max = Math.floor(this.vals[0]*1.4 + Math.random() * this.vals[0]*0.6); //最大値算出
        //変調場所から四回に分けて値段が高騰する．
        for(var i=1; i<mod; i++){//変調までは少しずつ減る
          if(i==1)this.vals[i] = this.vals[0]* (0.4 + Math.random()*0.5);
          else this.vals[i] = this.vals[i-1] - 3 - Math.floor(Math.random() * 4);
        }
        for(var i=0;i<3;i++){ //変調
          this.vals[mod+i] = Math.floor(this.vals[0]*0.8 + Math.random() * this.vals[0]*0.5);
        }
        this.vals[mod+4] = max; //最大
        for(var i = mod+5; i<=12; i++){ //残りは適当に減らしていく
          if(this.vals[i] >= this.vals[0]/2)this.vals[i] = Math.floor(this.vals[i-1] * (0.3 + Math.random()*0.3));
          else this.vals[i] = Math.floor(this.vals[i-1] * (0.5 + Math.random()*0.5));
        }
      break;
      case 2: //三期型
        var mod = 1+Math.floor(Math.random() * 8); //変調場所
        var max = Math.floor(this.vals[0]*2.0 + Math.random() * this.vals[0]*4.0); //最大値算出
        //変調場所から三回に分けて値段が超高騰する．
        for(var i=1; i<mod; i++){//変調までは少しずつ減る
          this.vals[i] = this.vals[i-1] - 3 - Math.floor(Math.random() * 4);
        }
        this.vals[mod+1] = Math.floor(this.vals[0]*0.9 + Math.random() * this.vals[0]*0.6); //変調1回目
        this.vals[mod+2] = Math.floor(this.vals[0]*1.5 + Math.random() * this.vals[0]*0.5); //変調2回目
        this.vals[mod+3] = max; //最大値
        for(var i = mod+4; i<=12; i++){ // 残りは適当に減らしていく
          if(this.vals[i] >= this.vals[0]/2)this.vals[i] = Math.floor(this.vals[i-1] * (0.3 + Math.random()*0.3));
          else this.vals[i] = Math.floor(this.vals[i-1] * (0.5 + Math.random()*0.5));
        }

      break;
      default: //波型
        var mod = 1+Math.floor(Math.random() * 3); //変調場所
        var isup = Math.floor(Math.random()*2);
        //こと細かく変調が行われる．
        this.vals[1] = Math.floor(this.vals[0] * (0.4 + Math.random()));
        for(var i=2;i<=12;i++){
          if(isup==1)this.vals[i] = this.vals[i-1] + 1+Math.floor(Math.random() * 10);
          else this.vals[i] = this.vals[i-1] - 1-Math.floor(Math.random() * 10);

          mod --;
          if(mod <= 0 || (this.vals[i] >= this.vals[0]*1.4)||(this.vals[i] <= this.vals[0]*0.4)){ //増減しすぎたり，変調時になったら変調
            mod = 1+Math.floor(Math.random() * 3);
            if(isup == 1)isup=0;
            else isup=1;
          }
        }
    }
  }
  get_vals(n){
    return this.vals[n];
  }
}

class GameStats {
  money;
  amount;
  vals;
  constructor(){
    this.money = 0;
    this.amount = 0;
    this.vals = new Array();
  }
  change_money(n){
    this.money = n;
  }
  change_amount(n){
    this.amount = n;
  }
  change_curval(n){
    for(var i=0;i<n.length;i++){
      this.vals[i] = n[i];
    }
  }
  get_money(){
    return this.money;
  }
  get_amount(){
    return this.amount;
  }
  get_curval(n){
    return vals[n];
  }
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
