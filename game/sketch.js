
var cWhite;
var cBlue;
var cOrange;
var cRed;
var cGreen;
var textSize1, textSize2;
var p0Score, p1Score;
var p0OptionXs;
var p0OptionYs;
var firstOptionX, firstOptionY;
var optionStepW, optionStepH;
var buttonW, buttonH, buttonR;
var main;
var sign;
var numOfParts;
var expression;
var solution;
var option;
var rightIndex ;
var winner;
var state0Frame, state2Frame;
var rounds, round;
var gameState;
var numRange;
var startingScreen;

function setup() {
  
  cWhite = color(255);
  cBlue = color(40, 37, 124);
  cOrange = color(252, 207, 89);
  cRed = color(220, 90, 90);
  cGreen = color(100, 200, 100);
  p0Score = 0; p1Score = 0;
  p0OptionXs = new Array(3);
  p0OptionYs = new Array(2);
  main = new Array(6);
  sign = new Array(5);
  option = new Array(6);
  gameState = 1;
  numRange = 100;
  
  createCanvas(360, 640);
  frameRate(30);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  ellipseMode(CENTER);
  textSize1 = width/18;
  textSize2 = width/9;
  gameState = 0;
  round = 1;
  buttonW = 28*width/100;
  buttonH = 14*height/100; 
  buttonR = buttonH/6;
  optionStepW = buttonW + buttonW/8;
  optionStepH = buttonH + buttonH/8;
  firstOptionX = width/2 - optionStepW;
  firstOptionY = 3*height/4;
  for (var i = 0; i < 3; i++) p0OptionXs[i] = firstOptionX + optionStepW*i;
  for (var j = 0; j < 2; j++) p0OptionYs[j] = firstOptionY + optionStepH*j;
  var appeared = false;
  numOfParts = Math.floor(Math.random(1200))%3 + 2;
  main[0] = Math.floor(Math.random(numRange)+1);
  for (var i = 0; i < numOfParts - 1; i++) {
    var r = Math.floor(Math.random(1000))%4;
    switch(r) {
    case 0:
      sign[i] = '+';
      main[i+1] = Math.floor(Math.random(numRange))+1;
      break;
    case 1:
      sign[i] = '-';
      main[i+1] = Math.floor(Math.random(numRange))+1;
      break;
    case 2:
      sign[i] = '*';
      main[i+1] = Math.floor(Math.random(numRange))+1;
      break;
    case 3:
      sign[i] = '/';
      do {
        main[i+1] = Math.floor(Math.random(numRange))+1;
      } while (main[i]%main[i+1]!=0);
      break;
    };
    appeared = false;
    for (var j = 0; j < i; j++) 
      if (sign[i]==sign[j]) { 
        appeared = true; 
        break;
      };
    if (appeared) i--;
  };
  expression = String(main[0]);
  for ( var i = 1; i < numOfParts; i++) {
    expression = expression + sign[i-1];
    expression = expression + String(main[i]);
  };
  solution = eval(expression);
  appeared = false;
  var invalid = false;
  for (var i = 0; i < option.length; i++) {
    var genDistr = Math.floor(Math.random(100))%10;
    if (genDistr == 0) option[i] = (Math.floor(Math.random(2*solution)+2))/10*10+solution%10;
    else if (genDistr == 1) option[i] = Math.floor(Math.random(3*(solution+4)));
    else  option[i] = Math.floor(Math.random(2*solution)+2);
    for (var j = 0; j < i; j++) {
      if (i>0) {
        if (option[i]==option[j]) {
          invalid = true; 
          break;
        };
      };
    };

    if (invalid) i--;
    if (option[i]==solution) {
      rightIndex = i;
      appeared = true;
    };
    invalid = false;
  };
  if (!appeared) {
    rightIndex = Math.floor(Math.random(1200))%6;
    option[rightIndex] = solution;
  };

  startingScreen = true;
};

function draw() {
  textSize(textSize1);
  background(cWhite);


  switch(gameState) {
  case 0:
    state0Frame++;
    if (startingScreen) {
      fill(cBlue);
      stroke(cBlue);
      strokeWeight(width/240);
      text("Правила игры", width/2, 1*height/8);
      push();
      textSize(2*textSize1/3);
      text("Игра MathDuel – приложение Android,", 
        width/2, 4*height/16);
      text("представляющее из себя соревновательную  ", 
        width/2, 5*height/16);
      text("викторину на тему арифметики. В этой игре  ", 
        width/2, 6*height/16);
      text("игроки могут соревноваться друг с другом  ", 
        width/2, 7*height/16);
      text("на скорость, производя базовые арифметические  ", 
        width/2, 8*height/16);
      text("операции: сложение, умножение и другие.", 
        width/2, 9*height/16);
      text("Цель каждого игрока – отвечать на вопросы ", 
        width/2, 10*height/16);
      text("правильно и быстрее соперника.", 
        width/2, 11*height/16);
      pop();
      textAlign(CENTER, CENTER);
      text("Для начала игры коснитесь экрана", 
        width/2, 7*height/8);
      if (mouseIsPressed) {
        startingScreen = false;
        state0Frame = 0;
      };
    } else {
      fill(cBlue);
      text("Выберите количество раундов", width/2, height/4);
      noFill();
      stroke(cBlue);
      strokeWeight(width/120);
      rect(width/3, 4*height/8, buttonW, buttonH, buttonR);
      rect(2*width/3, 4*height/8, buttonW, buttonH, buttonR);
      rect(width/2, 5.3*height/8, buttonW*2, buttonH, buttonR);
      text("5", width/3, 4*height/8);
      text("10", 2*width/3, 4*height/8);
      text("Бесконечность", width/2, 5.3*height/8);
      //when a button touched the scene switches
      if (mouseIsPressed&&(state0Frame>1*30)) {
        if ( (mouseY > 4*height/8-buttonH/2)&&(mouseY < 4*height/8+buttonH/2) ) {
          if ( (mouseX > width/3-buttonW/2)&&(mouseX < width/3+buttonW/2) ) {
            rounds = 5;
            gameState = 1;
          };
          if ( (mouseX > 2*width/3-buttonW/2)&&(mouseX < 2*width/3+buttonW/2) ) {
            rounds = 10;
            gameState = 1;
          };
        };
        if ( (mouseY > 5.3*height/8-buttonH/2)&&(mouseY < 5.3*height/8+buttonH/2) )
          if ( (mouseX > width/2-buttonW/2)&&(mouseX < width/2+buttonW/2) ) {
            rounds = -1;
            gameState = 1;
          };
      };
    };
    break;
  case 1:
    for (var i = 0, k = 0; i < 3; i++) { 
      for (var j = 0; j < 2; j++, k++) {
        noFill();
        stroke(cBlue);
        strokeWeight(width/120);
        rect(p0OptionXs[i], p0OptionYs[j], buttonW, buttonH, buttonR);
        push();
        translate(width, height);
        rotate(PI);
        rect(p0OptionXs[i], p0OptionYs[j], buttonW, buttonH, buttonR);
        pop();
        if (mouseIsPressed) {
          var invertedMouseX;
          var invertedMouseY;
          invertedMouseX = width - mouseX;
          invertedMouseY = height - mouseY;
          if ( (mouseX > p0OptionXs[i]-buttonW/2)&&(mouseX < p0OptionXs[i]+buttonW/2) ) {
            if ( (mouseY > p0OptionYs[j]-buttonH/2)&&(mouseY < p0OptionYs[j]+buttonH/2) ) {
              switchGameState(k, rightIndex, 0);
            }
          };
          if ( (invertedMouseX > p0OptionXs[i]-buttonW/2)&&(invertedMouseX < p0OptionXs[i]+buttonW/2) ) {
            if ( (invertedMouseY > p0OptionYs[j]-buttonH/2)&&(invertedMouseY < p0OptionYs[j]+buttonH/2) ) {
              switchGameState(k, rightIndex, 1);
            }
          };
        };
        fill(cBlue);
        text(String(option[k]), p0OptionXs[i], p0OptionYs[j]);
        push();
        translate(width, height);
        rotate(PI);
        text(String(option[k]), p0OptionXs[i], p0OptionYs[j]);
        pop();
      };
    };
    stroke(cBlue);
    strokeWeight(width/180);
    line(width/3, height/2, 2*width/3, height/2);
    fill(cBlue);
    textSize(textSize2);
    text(expression, width/2, 14*height/24);
    if (rounds!=-1) {
      textSize(textSize1);
      fill(cGreen);
      text(String(Math.floor(round))+"/"+String(Math.floor(rounds)), 1*width/8, 50*height/96);
      textSize(textSize2);
      fill(cBlue);
    };
    push();
    translate(width, height);
    rotate(PI);
    text(expression, width/2, 14*height/24);
    if (rounds!=-1) {
      textSize(textSize1);
      fill(cGreen);
      text(String(Math.floor(round))+"/"+String(Math.floor(rounds)), 1*width/8, 50*height/96);
      textSize(textSize2);
      fill(cBlue);
    };
    pop();
    break;
  case 2:
    state2Frame++;
    stroke(cBlue);
    strokeWeight(width/180);
    line(width/3, height/2, 2*width/3, height/2);
    fill(cWhite);
    ellipse(width/2, height/2, width/10, width/10);
    if (rounds!=-1) {
      stroke(cBlue);
      fill(cWhite);
      if (round!=rounds) strokeWeight(width/360);
      ellipse(width/2, height/2, (round/rounds)*(width/10), (round/rounds)*(width/10));
    };
    noFill();
    strokeWeight(width/72);
    if (winner==0) stroke(cOrange);
    if (winner==1) stroke(cBlue);
    ellipse(width/2, 3*height/4, width/1.8, width/1.8);
    if (winner==1) stroke(cOrange);
    if (winner==0) stroke(cBlue);
    push();
    translate(width, height);
    rotate(PI);
    ellipse(width/2, 3*height/4, width/1.8, width/1.8);
    pop();
    fill(cBlue);
    textSize(textSize2);
    if (winner==0) {
      if (state2Frame<0.5*30) {
        text(String(p0Score-1), width/2, 3*height/4);
      } else {
        text(String(p0Score), width/2, 3*height/4);
      };
      push();
      translate(width, height);
      rotate(PI);
      text(String(p1Score), width/2, 3*height/4);
      pop();
    };
    if (winner == 1) {
      if (state2Frame<0.5*30) {
        push();
        translate(width, height);
        rotate(PI);
        text(String(p1Score-1), width/2, 3*height/4);
        pop();
      } else {
        push();
        translate(width, height);
        rotate(PI);
        text(String(p1Score), width/2, 3*height/4);
        pop();
      };
      text(String(p0Score), width/2, 3*height/4);
    }
    if (state2Frame<0.5*30) {
      if (winner == 0) 
        text(String(p0Score-1), width/2, 3*height/4);
    } else {
      text(String(p0Score), width/2, 3*height/4);
    };
    if (round!=rounds) {
      stroke(cOrange);
      strokeWeight(width/180);
      fill(cWhite);
      if (((state2Frame > 2*30)&&(state2Frame < 2.2*30))
        || ((state2Frame > 2.5*30)&&(state2Frame < 2.7*30)) 
        || ((state2Frame > 3*30)&&(state2Frame < 3.2*30))) {
        line(width/3, height/2, 2*width/3, height/2);
        ellipse(width/2, height/2, width/10, width/10);
        if (rounds!=-1) {
          stroke(cBlue);
          fill(cWhite);
          strokeWeight(width/360);
          ellipse(width/2, height/2, (round/rounds)*(width/10), (round/rounds)*(width/10));
          if (round==rounds) {
            stroke(cOrange);
            noFill();
            strokeWeight(width/180);
            ellipse(width/2, height/2, width/10, width/10);
          }
        };
      };
      if (state2Frame > 3.5*30) switchGameState(-1, -1, -1);
    } else {
      if (state2Frame > 2*30) {
        fill(cWhite);
        noStroke();
        ellipse(width/2, 3*height/4, width/1.5, width/1.5);
        textSize(textSize2);
        if (winner==0) {
          fill(cOrange);
          text("Победа!", width/2, 3*height/4);
        } else if (winner==1) { 
          fill(cBlue);
          text("Поражение!", width/2, 3*height/4);
        };
        push();
        translate(width, height);
        rotate(PI);
        fill(cWhite);
        noStroke();
        ellipse(width/2, 3*height/4, width/1.5, width/1.5);
        if (winner==1) { 
          fill(cOrange);
          text("Победа!", width/2, 3*height/4);
        } else if (winner==0) {
          fill(cBlue);
          text("Поражение!", width/2, 3*height/4);
        };
        pop();

        if (mouseIsPressed) switchGameState(-1, -1, -1);
      };
    };
    break;
  };
};

function switchGameState(k, rightInd, player) {
  switch(gameState) {
  case 1:
    gameState = 2;
    if (k == rightInd) {
      switch(player) {
      case 0:
        p0Score++;
        break;
      case 1:
        p1Score++;
        break;
      };
      winner = player;
    } else {
      switch(player) {
      case 1:
        p0Score++;
        break;
      case 0:
        p1Score++;
        break;
      };
      winner = 1-player;
    }
    state2Frame = 0;
    break;
  case 2:
    gameState = 1;
    if (rounds != -1) {
      round++;
      if (round > rounds) {
        round = 1;
        gameState = 0;
        p0Score = 0;
        p1Score = 0;
        state0Frame = 0;
        break;
      };
    }
    var appeared = false;
    numOfParts = Math.floor(Math.random(1200))%3 + 2;
    main[0] = Math.floor(Math.random(numRange)+1);
    for (var i = 0; i < numOfParts - 1; i++) {
      var r = Math.floor(Math.random(1000))%4;
      switch(r) {
      case 0:
        sign[i] = '+';
        main[i+1] = Math.floor(Math.random(numRange))+1;
        break;
      case 1:
        sign[i] = '-';
        main[i+1] = Math.floor(Math.random(numRange))+1;
        break;
      case 2:
        sign[i] = '*';
        main[i+1] = Math.floor(Math.random(numRange))+1;
        break;
      case 3:
        sign[i] = '/';
        do {
          main[i+1] = Math.floor(Math.random(numRange))+1;
        } while ((main[i])%(main[i+1])!=0);
        break;
      };
      appeared = false;
      for (var j = 0; j < i; j++) 
        if (sign[i]==sign[j]) { 
          appeared = true; 
          break;
        };
      if (appeared) i--;
    };
    expression = String(main[0]);
    for ( var i = 1; i < numOfParts; i++) {
      expression = expression + sign[i-1];
      expression = expression + String(main[i]);
    };
    solution = eval(expression);
    appeared = false;
    var invalid = false;
    for (var i = 0; i < option.length; i++) {
      var genDistr = Math.floor(Math.random(100))%10;
      if (genDistr == 0) option[i] = (Math.floor(Math.random(2*solution)+2))/10*10+solution%10;
      else if (genDistr == 1) option[i] = Math.floor(Math.random(3*(solution+4)));
      else  option[i] = Math.floor(Math.random(2*solution)+2);
      for (var j = 0; j < i; j++) {
        if (i>0) {

          if (option[i]==option[j]) {
            invalid = true; 
            break;
          };
        };
      };
      if (invalid) i--;

      if (option[i]==solution) {
        rightIndex = i;
        appeared = true;
      };
      invalid = false;
    };
    if (!appeared) {
      rightIndex = Math.floor(Math.random(1200))%6;
      option[rightIndex] = solution;
    };
  };
};

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

var pos, ch, str;
function eval(s){
  str = s;
  pos = -1;
  return parse();
}
function nextChar() {
  pos++;
  if(pos < str.length)
    ch = str.charAt(pos)
  else
    ch = -1;
//   ch = (++pos < str.length()) ? str.charAt(pos) : -1;
  return 0;
}
function eat(charToEat) {
  while (ch == ' ') nextChar();
  if (ch == charToEat) {
    nextChar();
    return true;
  }
  return false;
}
function parse() {
  nextChar();
  var x = parseExpression();
//   if (pos < str.length()) throw new RuntimeException("Unexpected: " + (char)ch);
  if (pos < str.length) throw 0;
  return x;
}
function parseExpression() {
  var x = parseTerm();
  for (;; ) {
    if      (eat('+')) x += parseTerm(); // addition
    else if (eat('-')) x -= parseTerm(); // subtraction
    else return x;
  }
}
function parseTerm() {
  var x = parseFactor();
  for (;; ) {
    if      (eat('*')) x *= parseFactor(); // multiplication
    else if (eat('/')) x /= parseFactor(); // division
    else return x;
  }
}
function parseFactor() {
  if (eat('+')) return parseFactor(); // unary plus
  if (eat('-')) return -parseFactor(); // unary minus
  var x;
  var startPos = pos;
  if (eat('(')) { // parentheses
    x = parseExpression();
    eat(')');
  } else if ((ch >= '0' && ch <= '9') || ch == '.') { // numbers
    while ((ch >= '0' && ch <= '9') || ch == '.') nextChar();
    x = parseFloat(str.substring(startPos, pos));
  } else if (ch >= 'a' && ch <= 'z') { // functions
    while (ch >= 'a' && ch <= 'z') nextChar();
    var func = str.substring(startPos, pos);
    x = parseFactor();
    if (func.equals("sqrt")) x = Math.sqrt(x);
    else if (func.equals("sin")) x = Math.sin(toRadians(x));
    else if (func.equals("cos")) x = Math.cos(toRadians(x));
    else if (func.equals("tan")) x = Math.tan(toRadians(x));
    else 
//       throw new RuntimeException("Unknown function: " + func);
      throw 0;
  } else {
//     throw new RuntimeException("Unexpected: " + (char)ch);
    throw 0;
  }
  if (eat('^')) x = Math.pow(x, parseFactor()); // exponentiation
  return x;
}
