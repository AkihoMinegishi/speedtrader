var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

function show_text(txt, size, w, h) {
  ctx.textAlign = "center";
  ctx.font = size+"px Arial";
  ctx.fillText(txt, w, h);
}
function show_text_left(txt, size, x, y) {
  ctx.textAlign = "left";
  ctx.font = size+"px Arial";
  ctx.fillText(txt, x, y);
  ctx.textAlign = "center";
}

function getMousePosition(evt) {
  let rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function can_w(mag) {
  return canvas.width*mag;
}
function can_h(mag) {
  return canvas.height*mag;
}
function strokeRect_ar(ar) {
  ctx.strokeRect(ar[0], ar[1], ar[2], ar[3]);
}
function fillRect_ar(ar) {
  ctx.fillRect(ar[0], ar[1], ar[2], ar[3]);
}

class GameFlow {
  scene; // Title 1, Options 2, Countdown 3, InGame 4, Result 5
  cookie_able;
  constructor() {
    this.scene = 1;
    history.cookie_able = true;
  }

  get get_scene() {
    return this.scene;
  }

  change_scene(n) {
    if(1 <= n && n <= 5) this.scene = n;
  }
}

class Title {
  cdlx; cddx; cduy; cddy;
  oplx; opdx; opuy; opdy;

  show_title(mode) {
    let txt1 = "スピードトレード"
    let size1 = canvas.width/1.5/(txt1.length);
    ctx.fillStyle = "#000000";
    show_text(txt1, size1, canvas.width/2, canvas.height/4);

    let txtm = "現在の設定：";
    let sizem = canvas.width/4.0/(txtm.length);
    show_text(txtm, sizem, canvas.width*3.5/10, canvas.height*4.5/10);
    let txtm1 = "1分モード";
    let sizem1 = canvas.width/4.5/(txtm1.length);
    let txtm2 = "エンドレスモード";
    let sizem2 = canvas.width/3.0/(txtm2.length);
    if(mode == 1) {
      show_text(txtm1, sizem1, canvas.width*6.25/10, canvas.height*4.5/10);
    } else if(mode == 2) {
      show_text(txtm2, sizem2, canvas.width*6.5/10, canvas.height*4.5/10);
    }

    let txt2 = "ここをクリックしてスタート！";
    let size2 = canvas.width/2.0/(txt2.length);
    this.cdlx = canvas.width*2.4/10;
    this.cddx = 5.2;
    this.cduy = canvas.height*5.45/10;
    this.cddy = 0.6;
    show_text(txt2, size2, canvas.width/2, canvas.height*5.9/10);
    ctx.strokeStyle = "#AAAAAA";
    ctx.strokeRect(this.cdlx, this.cduy, 
                  canvas.width*(this.cddx)/10, canvas.height*(this.cddy)/10);

    let txt3 = "設定の変更";
    let size3 = canvas.width/5.0/(txt3.length);
    this.oplx = canvas.width*3.9/10;
    this.opdx = 2.2;
    this.opuy = canvas.height*7.0/10;
    this.opdy = 0.6;
    show_text(txt3, size3, canvas.width/2, canvas.height*3.0/4);
    ctx.strokeStyle = "#AAAAAA";
    ctx.strokeRect(this.oplx, this.opuy, 
      canvas.width*(this.opdx)/10, canvas.height*(this.opdy)/10);
  }
}

class Options {
  mode;
  optlx; optdx; optuy; optdy;
  ttlx; ttdx; ttuy; ttdy;

  change_mode(n) {
    this.mode = n;
  }

  show_options() {
    let txt0 = "オプション画面"
    let size0 = canvas.width/2.0/(txt0.length);
    show_text(txt0, size0, canvas.width/2, canvas.height/4);

    let txt1 = "現在の設定：";
    let size1 = canvas.width/3.0/(txt1.length);
    show_text(txt1, size1, canvas.width/3, canvas.height/2);

    let txt2 = "1分モード";
    let size2 = canvas.width/3.75/(txt2.length);
    let txt3 = "エンドレスモード";
    let size3 = canvas.width/3.0/(txt3.length);
    let txt4 = "モードを「";
    if(this.mode == 1) {
      show_text(txt2, size2, canvas.width*7.0/10, canvas.height/2);
      txt4 += txt3 + "」に切り替えて";
    } else if(this.mode == 2) {
      show_text(txt3, size3, canvas.width*7.0/10, canvas.height/2);
      txt4 += txt2 + "」に切り替えて";
    }
    let size4 = canvas.width/1.5/(txt4.length);
    show_text(txt4, size4, canvas.width/2, canvas.height*6.5/10);
    let txt5 = "タイトルに戻る";
    let size5 = canvas.width/4.0/(txt5.length);
    show_text(txt5, size5, canvas.width/2, canvas.height*7.0/10)
    this.optlx = canvas.width*1.5/10;
    this.optdx = 6.8;
    this.optuy = canvas.height*6.0/10;
    this.optdy = 1.1;
    ctx.strokeStyle = "#AAAAAA";
    ctx.strokeRect(this.optlx, this.optuy, 
                  canvas.width*(this.optdx)/10, canvas.height*(this.optdy)/10);

    this.ttlx = canvas.width*3.7/10;
    this.ttdx = 2.6;
    this.ttuy = canvas.height*8.0/10;
    this.ttdy = 0.6;
    show_text(txt5, size5, canvas.width/2, canvas.height*8.5/10);
    ctx.strokeStyle = "#AAAAAA";
    ctx.strokeRect(this.ttlx, this.ttuy, 
                  canvas.width*(this.ttdx)/10, canvas.height*(this.ttdy)/10);
  }

  
}

class CountDown {
  get_tm;
  end_cd;
  constructor() {
    this.get_tm = false;
    this.end_cd = true;
  }

  set_get_tm(bool) {
    this.get_tm = bool;
  }

  show_countdown(elp_t) {
    let times = 6 - Math.ceil(elp_t/1000);
    let size = canvas.width/(4.0 + times*2.0);
    if(times > 0) show_text(times, size, canvas.width/2, canvas.height/2);
    if(times == 0) {
      this.end_cd = true;
    }
  }
}

class InGame {
  mode;
  get_tm; end_cd; times;
  button_x; button_y; button_dx; button_dy; button_w; button_h; button_able; button_val;
  back_title;                    //           [lx, uy, dx, dy]
  button_buy; button_buy_able;   //button_buy   :
  button_sell; button_sell_able; //buttonsell   :
  pos_sjk; //[lx, uy, dx, dy] 
  pos_sjm; // :
  pos_ipt; // :
  pos_val; // :

  constructor() {
    this.get_tm = false;
    this.end_cd = true;
    this.button_x = new Array(4);
    this.button_y = new Array(4);
    this.button_able = new Array(4);
    this.button_val = new Array(4);
    for(let i = 0; i < 4; i++) {
      this.button_x[i] = new Array(3);
      this.button_y[i] = new Array(3);
      this.button_able[i] = new Array(3).fill(true);
      this.button_val[i] = new Array(3);
      for(let j = 0; j < 3; j++) {
        this.button_val[i][j] = 1+(i-1)*3+j;
      }
    }
    this.button_val[0][0] = -1;
    this.button_val[0][1] = 0;
    this.button_val[0][2] = 10;
    this.back_title = new Array(4);
    this.button_buy = new Array(4);
    this.button_buy_able = true;
    this.button_sell = new Array(4);
    this.button_sell_able = true;
    this.pos_sjk = new Array(4);
    this.pos_sjm = new Array(4);
    this.pos_ipt = new Array(4);
    this.pos_val = new Array(4);
  }

  set_mode(n) {
    this.mode = n;
  }

  set_get_tm(bool) {
    this.get_tm = bool;
  }
  show_countdown(elp_t) {
    this.times = 60 - Math.floor(elp_t/1000);
    let size = canvas.width/13.0;
    if(this.times > 0) show_text(this.times, size, canvas.width*28.0/30, canvas.height*3.0/30);
    if(this.times == 0) {
      this.end_cd = true;
    }
  }

  show_back_title() {
    this.back_title[0] = can_w(25.0/30);
    this.back_title[1] = can_h(0.5/30);
    this.back_title[2] = can_w(4.5/30);
    this.back_title[3] = can_h(5.0/30);
    ctx.fillStyle = "#FFFFFF";
    fillRect_ar(this.back_title);
    ctx.strokeStyle = "#000000";
    strokeRect_ar(this.back_title);
    ctx.fillStyle = "#000000";
    let txts = ["セーブし", "タイトル", "へ戻る"];
    let size = canvas.width/8.0/txts[0].length;
    for(let i = 0; i < 3; i++) {
      show_text_left(txts[i], size, can_w(25.25/30), can_h((1.75+i*1.5)/30));
    }
  }

  show_buttons() {
    this.button_dx = can_w(1.0/30);
    this.button_dy = can_h(1)-this.button_dx-this.button_h*4;
    this.button_w = can_w(1.0/8);
    this.button_h = can_h(1.0/8);
    for(let i = 0; i < 4; i++) {
      for(let j = 0; j < 3; j++) {
        this.button_x[i][j] = this.button_dx + this.button_w*j;
        this.button_y[i][j] = this.button_dy + this.button_h*i;
      }
    }
    ctx.strokeStyle = "#000000";
    for(let i = 0; i < 4; i++) {
      for(let j = 0; j < 3; j++) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(this.button_x[i][j], this.button_y[i][j], this.button_w, this.button_h);
        ctx.strokeRect(this.button_x[i][j], this.button_y[i][j], this.button_w, this.button_h);
      }
    }
    ctx.fillStyle = "#000000";
    let numsize = canvas.width/15.0;
    for(let i = 1; i < 4; i++) {
      for(let j = 0; j < 3; j++) {
        show_text(1+(i-1)*3+j, numsize, 
                  this.button_x[i][j]+this.button_w/2, this.button_y[i][j]+this.button_h*7.0/10);
      }
    }
    let txtcl = "クリア";
    let sizecl = can_w(1)/txtcl.length/10.0;
    show_text(txtcl, sizecl, this.button_x[0][0]+this.button_w/2, this.button_y[0][0]+this.button_h*6.0/10);
    show_text(0, numsize, this.button_x[0][1]+this.button_w/2, this.button_y[0][1]+this.button_h*7.0/10);
    show_text("00", numsize, this.button_x[0][2]+this.button_w/2, this.button_y[0][2]+this.button_h*7.0/10);
    
    this.button_buy = [can_w(15.0/30), can_h(13.75/30), can_w(7.0/30), can_h(5.0/30)];
    this.button_sell = [this.button_buy[0]+this.button_buy[2], this.button_buy[1], 
                        this.button_buy[2], this.button_buy[3]];
    if(this.button_buy_able) {ctx.fillStyle = "#FFFFFF";} else {ctx.fillStyle = "#BBBBBB";}
    fillRect_ar(this.button_buy);
    if(this.button_sell_able) {ctx.fillStyle = "#FFFFFF";} else {ctx.fillStyle = "#BBBBBB";}
    fillRect_ar(this.button_sell);
    ctx.strokeStyle = "#000000";
    strokeRect_ar(this.button_buy);
    strokeRect_ar(this.button_sell);

    ctx.fillStyle = "#000000";
    let txtkabu = "カブを";
    let sizekabu = can_w(1)/txtkabu.length/10.0;
    let txtbs = ["買う", "売る"];
    let sizebs = can_w(1)/txtbs[0].length/7.5;
    show_text(txtkabu, sizekabu, this.button_buy[0]+this.button_buy[2]/2, can_h(15.25/30));
    show_text(txtkabu, sizekabu, this.button_sell[0]+this.button_sell[2]/2, can_h(15.25/30));
    show_text(txtbs[0], sizebs, this.button_buy[0]+this.button_buy[2]/2, can_h(18.0/30));
    show_text(txtbs[1], sizebs, this.button_sell[0]+this.button_sell[2]/2, can_h(18.0/30));
  }
  show_boxes() {
    ctx.fillStyle = "#000000"
    let txtsjk = "所持カブ";
    let size_boxside =  canvas.width/txtsjk.length/6.0;  //show_boxes内のテキストサイズ
    show_text(txtsjk, size_boxside, canvas.width*3.5/30, canvas.height*3.0/30);
    this.pos_sjk = [can_w(1.0/30), can_h(3.5/30), can_w(11.0/30), can_h(3.0/30)];
    strokeRect_ar(this.pos_sjk);
    ctx.fillStyle = "#FFFFFF";
    fillRect_ar(this.pos_sjk);

    ctx.fillStyle = "#000000";
    let txtsjm = "所持金";
    show_text(txtsjm, size_boxside, canvas.width*15.5/30, canvas.height*3.0/30);
    this.pos_sjm = [can_w(13.5/30), can_h(3.5/30), can_w(11.0/30), can_h(3.0/30)];
    strokeRect_ar(this.pos_sjm);
    ctx.fillStyle = "#FFFFFF";
    fillRect_ar(this.pos_sjm);

    ctx.fillStyle = "#000000";
    let txtipt = "個数入力";
    show_text(txtipt, size_boxside, canvas.width*3.5/30, canvas.height*8.5/30);
    this.pos_ipt = [can_w(1.0/30), can_h(9.0/30), can_w(8.0/30), can_h(3.0/30)];
    strokeRect_ar(this.pos_ipt);
    ctx.fillStyle = "#FFFFFF";
    fillRect_ar(this.pos_ipt);

    ctx.fillStyle = "#000000";
    let txtcrs = "×";
    let sizecrs = canvas.width/15.0;
    show_text(txtcrs, sizecrs, canvas.width*9.75/30, canvas.height*11.5/30);

    let txtval = "カブ価";
    show_text(txtval, size_boxside, canvas.width*12.25/30, canvas.height*8.5/30);
    this.pos_val = [can_w(10.5/30), can_h(9.0/30), can_w(6.0/30), can_h(3.0/30)];
    strokeRect_ar(this.pos_val);
    ctx.fillStyle = "#FFFFFF";
    fillRect_ar(this.pos_val);

    ctx.fillStyle = "#000000";
    let txteq = "=";
    let sizeeq = canvas.width/15.0;
    show_text(txteq, sizeeq, canvas.width*17.25/30, canvas.height*11.5/30);
  
    let pos_pay = [can_w(18.0/30), can_h(9.0/30), can_w(11.0/30), can_h(3.0/30)];
    strokeRect_ar(pos_pay);
    ctx.fillStyle = "#FFFFFF";
    fillRect_ar(pos_pay);
  }
  show_game_base() {
    this.show_buttons();
    this.show_boxes();
  }

  show_stats(amt, mon, ipt, val, crs) {
    ctx.fillStyle = "#000000";
    let size = canvas.width/20.0;
    show_text_left(amt, size, can_w(1.5/30), can_h(5.7/30));
    show_text_left(mon, size, can_w(14.0/30), can_h(5.7/30));
    show_text_left(ipt, size, can_w(1.5/30), can_h(11.25/30));
    show_text_left(val, size, can_w(11.0/30), can_h(11.25/30));
    show_text_left(crs, size, can_w(18.5/30), can_h(11.25/30));
  }
}

class Result {
  score;

  set_score(sc) {
    this.score = sc;
  }
  show_result() {
    show_text(this.score, 24, can_w(1.0/2), can_h(1.0/2));
  }
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
    let b1 = this.write_cookie("scores","");
    let b2 = this.write_cookie("dates","");
    let b3 = this.write_cookie("options", "");
    return b1 && b2 && b3;
  }

  get_ranks(){
    var scores = this.read_cookie("scores");
    var dates = this.read_cookie("dates");
    scores = scores.split(",");
    dates = dates.split(",");
    var gotrank = new Array(4);    
    for(var i=0;i<4;i++) {
      gotrank[i] = new Array(2);
      gotrank[i][0] = Number(scores[i]);
      gotrank[i][1] = Number(dates[i]);
    }

    return gotrank;
  }
  get_options(){
    var gotopt = this.read_cookie("options");
    return Number(gotopt);
  }

  save_ranks(rs){
    var sav_score="";
    var sav_date="";
    for(var i=0; i<4; i++){
      sav_score += ""+rs[i][0];
      sav_date  += ""+rs[i][1];
      if(i!=rs[0].length-1){sav_score += ",";sav_date += ",";}
    }
    this.write_cookie("scores",sav_score);
    this.write_cookie("dates",sav_date);
  }
  save_options(op){
    this.write_cookie("options", ""+op);
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
    return date.getTime() - this.start_time;
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
  vals;
  constructor(){
    this.vals = new Array();
  }
  get_vals(type){
    this.vals = [];
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
          if(i==1)this.vals[i] = Math.floor(this.vals[0]* (0.4 + Math.random()*0.5));
          else this.vals[i] = this.vals[i-1] - 3 - Math.floor(Math.random() * 4);
        }
        for(var i=0;i<4;i++){ //変調
          this.vals[mod+i] = Math.floor(this.vals[0]*0.8 + Math.random() * this.vals[0]*0.5);
        }
        this.vals[mod+4] = max; //最大
        for(var i = mod+5; i<=12; i++){ //残りは適当に減らしていく
          if(this.vals[i] >= this.vals[0]/2) this.vals[i] = Math.floor(this.vals[i-1] * (0.3 + Math.random()*0.3));
          else this.vals[i] = Math.floor(this.vals[i-1] * (0.5 + Math.random()*0.5));
        }
      break;
      case 2: //三期型
        var mod = 1+Math.floor(Math.random() * 8); //変調場所
        var max = Math.floor(this.vals[0]*2.0 + Math.random() * this.vals[0]*4.0); //最大値算出
        //変調場所から三回に分けて値段が超高騰する．
        for(var i=1; i<=mod; i++){//変調までは少しずつ減る
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
    return this.vals;
  }
}

class GameStats {
  money;
  inputs;
  amount;
  cost;
  vals; vals_chg;
  vals_ord_chg; vals_ord;
  constructor(){
    this.vals_chg = true;
    this.vals_ord_chg = true;
    this.vals_ord = [0,1,2,3];
    this.money = 0;
    this.inputs = 0;
    this.amount = 0;
    this.vals = new Array();
  }

  shuffle(ar) {
    for (let i = ar.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ar[i], ar[j]] = [ar[j], ar[i]];
    }
    return ar;
  }
  update_vals_ord() {
    this.vals_ord = this.shuffle(this.vals_ord);
  }

  change_money(n){
    this.money = n;
    if(n < 0) {
      alert("Error!");
      this.money = n;
    }
  }
  change_inputs(n) {
    if(this.inputs < 10**7 && 0 <= n && n <= 9) {
        this.inputs = this.inputs*10+n;
    } else if(this.inputs < 10**6 && n == 10) {
        this.inputs = this.inputs*100;
    } else if(n == -1) {
      this.inputs = 0;
    }
  }
  change_amount(n){
    this.amount = n;
  }
  change_cost(n) {
    this.cost = n;
  }
  change_curval(n){
    for(var i=0;i<n.length;i++){
      this.vals[i] = n[i];
    }
    this.vals_period = n.length;
  }

  get_money(){
    return this.money;
  }
  get_inputs() {
    return this.inputs;
  }
  get_amount(){
    return this.amount;
  }
  get_cost() {
    return this.cost;
  } 
  get_curval(n){
    return this.vals[n];
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

function move_options() {
  canvas.addEventListener("click", function(evt) {
    var pos = getMousePosition(evt);
    if(tt.oplx <= pos.x && pos.x <= tt.oplx+canvas.width*tt.opdx/10 && 
      tt.opuy <= pos.y && pos.y <= tt.opuy+canvas.height*tt.opdy/10 && gf.scene == 1) {
      gf.scene = 2;
    } 
  }, false);
}
function move_countdown() {
  canvas.addEventListener("click", function(evt) {
    var pos = getMousePosition(evt);
    if(tt.cdlx <= pos.x && pos.x <= tt.cdlx+canvas.width*tt.cddx/10 && 
      tt.cduy <= pos.y && pos.y <= tt.cduy+canvas.height*tt.cddy/10 && gf.scene == 1) {
      gf.scene = 3;
      cd.set_get_tm(true);
      cd.end_cd = false;
    } 
  }, false);
}

function move_title() {
  canvas.addEventListener("click", function(evt) {
    var pos = getMousePosition(evt);
    if(op.ttlx <= pos.x && pos.x <= op.ttlx+canvas.width*op.ttdx/10 && 
      op.ttuy <= pos.y && pos.y <= op.ttuy+canvas.height*op.ttdy/10 && gf.scene == 2) {
      gf.scene = 1;
      sv.save_options(op.mode);
    } 
  }, false);
}
function change_options_move_title() {
  canvas.addEventListener("click", function(evt) {
    var pos = getMousePosition(evt);
    if(op.optlx <= pos.x && pos.x <= op.optlx+canvas.width*op.optdx/10 && 
      op.optuy <= pos.y && pos.y <= op.optuy+canvas.height*op.optdy/10 && ch_opt && gf.scene == 2) {
      ch_opt = false;
      op.mode = (op.mode % 2) + 1;
      gf.scene = 1;
      sv.save_options(op.mode);
    } 
  }, false);
}

function move_game() {
  if(cd.end_cd == true) {
    gf.scene = 4;
    cd.set_get_tm(true);
    cd.end_cd = false;
    gm.set_mode(op.mode);
    gm.set_get_tm(true);
    gm.end_cd = false;
    if(gm.mode == 1) {
      st.change_money(500);
    } else if(gm.mode == 2) {
      st.change_money(sv.get_ranks()[3][0]);
      st.change_amount(sv.get_ranks()[3][1]);
    }
  }
}

function while_game() {
  let msec = tm.get_elapsed()/1000;
  if(Math.floor(msec) % 60 == 0) {
    if(st.vals_ord_chg) {
      st.update_vals_ord();
      st.vals_ord_chg = false;
    }
  } else {
    st.vals_ord_chg = true;
  }
  if(Math.floor(msec) % 15 == 0) {
    if(st.vals_chg) {
      st.change_curval(mv.get_vals(st.vals_ord[Math.floor((Math.floor(msec)%60)/15)]));
      st.vals_chg = false;
    }
  } else {
    st.vals_chg = true;
  }

  let stepid = Math.floor(msec%15.0*12.0/15.0);
  st.change_cost(st.get_inputs() * st.get_curval(stepid));
  gm.show_game_base();
  gm.show_stats(st.get_amount(), st.get_money(), st.get_inputs(), st.get_curval(stepid), st.get_cost());

  if(st.get_money() < st.get_cost()) {
    gm.button_buy_able = false;
  } else {
    gm.button_buy_able = true;
  }
  if(st.get_amount() < st.get_inputs()) {
    gm.button_sell_able = false;
  } else {
    gm.button_sell_able = true;
  }
  //売買ボタンクリック
  canvas.addEventListener("click", function(evt) {
    var pos = getMousePosition(evt);
    if(gm.button_buy[0] <= pos.x && pos.x <= gm.button_buy[0]+gm.button_buy[2] && 
      gm.button_buy[1] <= pos.y && pos.y <= gm.button_buy[1]+gm.button_buy[3] && gm.button_buy_able) {
        st.change_money(st.get_money() - st.get_cost());
        st.change_amount(st.get_amount() + st.get_inputs());
        st.change_inputs(-1);
        gm.button_buy_able = false;
    }
  }, false);
  canvas.addEventListener("mouseup", function(evt) {
    var pos = getMousePosition(evt);
    if(gm.button_buy[0] <= pos.x && pos.x <= gm.button_buy[0]+gm.button_buy[2] && 
      gm.button_buy[1] <= pos.y && pos.y <= gm.button_buy[1]+gm.button_buy[3] && !gm.button_buy_able) {
        gm.button_buy_able = true;
    }
  }, false);

  canvas.addEventListener("click", function(evt) {
    var pos = getMousePosition(evt);
    if(gm.button_sell[0] <= pos.x && pos.x <= gm.button_sell[0]+gm.button_sell[2] && 
      gm.button_sell[1] <= pos.y && pos.y <= gm.button_sell[1]+gm.button_sell[3] && gm.button_sell_able) {
        st.change_money(st.get_money() + st.get_cost());
        st.change_amount(st.get_amount() - st.get_inputs());
        st.change_inputs(-1);
        gm.button_sell_able = false;
    }
  }, false);
  canvas.addEventListener("mouseup", function(evt) {
    var pos = getMousePosition(evt);
    if(gm.button_sell[0] <= pos.x && pos.x <= gm.button_sell[0]+gm.button_sell[2] && 
      gm.button_sell[1] <= pos.y && pos.y <= gm.button_sell[1]+gm.button_sell[3] && !gm.button_sell_able) {
        gm.button_sell_able = true;
    }
  }, false);
  
  //10キーボタンクリック
  canvas.addEventListener("click", function(evt) {
    for(let i = 0; i < 4; i++) {
      for(let j = 0; j < 3; j++) {
        var pos = getMousePosition(evt);
        if(gm.button_x[i][j] <= pos.x && pos.x <= gm.button_x[i][j]+gm.button_w && 
          gm.button_y[i][j] <= pos.y && pos.y <= gm.button_y[i][j]+gm.button_h && gm.button_able[i][j]) {
          st.change_inputs(gm.button_val[i][j]);
          gm.button_able[i][j] = false;
        }
      }
    }
  }, false);
  canvas.addEventListener("mouseup", function(evt) {
    for(let i = 0; i < 4; i++) {
      for(let j = 0; j < 3; j++) {
        var pos = getMousePosition(evt);
        if(gm.button_x[i][j] <= pos.x && pos.x <= gm.button_x[i][j]+gm.button_w && 
          gm.button_y[i][j] <= pos.y && pos.y <= gm.button_y[i][j]+gm.button_h) {
          gm.button_able[i][j] = true;
        }
      }
    }
  }, false);
}

function pause_move_title() {
  canvas.addEventListener("click", function(evt) {
    var pos = getMousePosition(evt);
    if(gm.back_title[0] <= pos.x && pos.x <= gm.back_title[0]+gm.back_title[2] && 
      gm.back_title[1] <= pos.y && pos.y <= gm.back_title[1]+gm.back_title[3] && gf.scene == 4) {
      gf.scene = 1;
      ranks = sv.get_ranks();
      ranks[3][0] = st.money;
      ranks[3][1] = st.amount;
      sv.save_ranks(ranks);
    }
  }, false);
}

function move_result() {
  if(gm.end_cd == true) {
    gf.scene = 5;
    gm.set_get_tm(true);
    gm.end_cd = false;
    rs.set_score(st.get_money());
  }
}
 //====================================================================

 function init_game() {
  ws.fitCanvas();

  let opt = sv.get_options();
  if(opt == "nodata") {
    console.log("yep");
    if_cookie_able = sv.init_data();
    console.log(if_cookie_able);
    if(if_cookie_able) {
      let ar = new Array(4);
      for(let i = 0; i < 4; i++) { ar[i] = new Array(2).fill(0);}
      ar[3][0] = 500;
      sv.save_ranks(ar);

      opt = 1;
      sv.save_options(opt);
      op.change_mode(opt);
    } else {
      gf.cookie_able = false;
      op.change_mode(1);
    }
  }
  op.change_mode(opt);
  if(isNaN(sv.get_options())) {
    gf.cookie_able = false;
    op.change_mode(1);
  }
}

var ch_opt = false;

function draw() {
  ws.fitCanvas();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if(gf.scene == 1) {
    ch_opt = true;
    tt.show_title(op.mode);
    move_options();
    move_countdown();

  } else if(gf.scene == 2) {
    op.show_options();
    change_options_move_title();
    move_title();

  } else if(gf.scene == 3) {
    if(cd.get_tm) {
      tm.start_count();
      cd.set_get_tm(false);
    }
    cd.show_countdown(tm.get_elapsed());
    move_game();

  } else if(gf.scene == 4) {
    if(gm.get_tm) {
      tm.start_count();
      gm.set_get_tm(false);
    }
    if(gm.mode == 1) {
      gm.show_countdown(tm.get_elapsed());
    } else if(gm.mode == 2) {
      gm.show_back_title();
      pause_move_title();
    }
    while_game();
    move_result();

  } else {
    rs.show_result();
  }
}

init_game();
setInterval(draw, 1.0/30);

window.onresize = ws.fitCanvas;