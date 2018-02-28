//basic schach von denkquer ver 1.0

//globale vars und felder
var felder = [];
var clicked = {x:0,y:0};
var confirmed = {x:0,y:0};
var spieler1 = [];
var spieler2 = [];
var Springerw;

//lädt bilder und grafiken
function preload() {
  Springerw = loadImage('springer.gif');
}

//initialisierung
function setup() {
  createCanvas(801, 801);
  angleMode(DEGREES);
    mouseX = -1;
    var i = 0;
    for(var x = 0 ; x < 8 ; x++) {
      for(var y = 0 ; y < 8 ; y++) {
        felder[i] = new Feld(x,y);
        i++;
      }
    }
  //Figuren initialisierung
  		//Spieler 1
  spieler1.push(new Springer(150,750,1));
  spieler1.push(new Springer(650,750,1));
  spieler1.push(new Läufer(250,750,1));
  spieler1.push(new Läufer(550,750,1));
  spieler1.push(new Turm(50,750,1));
  spieler1.push(new Turm(750,750,1));
  spieler1.push(new Dame(350,750,1));
  spieler1.push(new König(450,750,1));
  		//Spieler 2
  spieler2.push(new Springer(150,50,2));
  spieler2.push(new Springer(650,50,2));
  spieler2.push(new Läufer(250,50,2));
  spieler2.push(new Läufer(550,50,2));
  spieler2.push(new Turm(50,50,2));
  spieler2.push(new Turm(750,50,2));
  spieler2.push(new Dame(350,50,2));
  spieler2.push(new König(450,50,2));
  		//Bauern
  for(i=0;i<8;i++) {
  	spieler1.push(new Bauer(100*i+50,650,1));
    spieler2.push(new Bauer(100*i+50,150,2));
  }
}
// aktive felder controlling
function mousePressed() {
  for( var i=0;i<felder.length;i++) {
    if(felder[i].hover()) {
      felder[i].feld2();
      felder[i].feld1();
    }
  }
  for(var i=0; i < spieler1.length;i++) {
  	spieler1[i].event();
  }
	for(var i=0; i < spieler2.length;i++) {
  spieler2[i].event();
  }
  //def pos command
//  console.log(dist(clicked.x,clicked.y,confirmed.x,confirmed.y));
}
// draw halt
function draw() {
  //background(0);
  for( var i=0; i < felder.length;i++) {
    felder[i].show();
  }
  for(var i=0; i < spieler1.length;i++) {
  spieler1[i].show();
  }
  for(var i=0; i < spieler2.length;i++) {
  spieler2[i].show();
  }
}
// feld object
function Feld(x,y) {
  this.scl = (width-1)/8;
  this.x = x*this.scl;
  this.y = y*this.scl;

  this.show = function() {
      noStroke();

      if(clicked.x == this.x+this.scl/2 && clicked.y == this.y+this.scl/2) {
        fill(0,255,0);
      }
      else if(confirmed.x == this.x+this.scl/2 && confirmed.y == this.y+this.scl/2) {
        fill(226,0,116);
      }
      else if(this.hover()) {
        fill(150);
      }
      else if(x % 2 ==0 && y % 2 ==0) {
        fill(255);
      }
      else if(x % 2 !=0 && y % 2 !=0) {
        fill(255);
      }
      else {
        fill(0);
      }
      if(dist)
      rect(this.x,this.y,this.scl,this.scl);
  }

  this.hover = function() {
    if(mouseX >= this.x && mouseX < this.x + this.scl && mouseY >= this.y && mouseY < this.y + this.scl) {
      return true;
    }
    else {
      return false;
    }
  }

  this.feld1 = function () {
    if(clicked.x == this.x+this.scl/2 && clicked.y == this.y+this.scl/2){
      clicked = {x:0,y:0};
      console.log("cli ",clicked.x,clicked.y);
    }
    else if(confirmed.x == 0 && confirmed.y == 0){
      clicked = {x:this.x+this.scl/2,y:this.y+this.scl/2};
      console.log("cli ",clicked.x,clicked.y);
    }
  }

  this.feld2 = function () {
    if((clicked.x != this.x+this.scl/2 || clicked.y != this.y+this.scl/2) && clicked.x !=0 && clicked.y !=0){
      confirmed = {x:this.x+this.scl/2,y:this.y+this.scl/2};
      console.log("con ",confirmed.x,confirmed.y);
    }
    else{
      confirmed = {x:0,y:0};
      console.log("con ",confirmed.x,confirmed.y);
    }
  }

}
// zug erfolgreich reseter
function Exec() {
  confirmed = {x:0,y:0};
  clicked = {x:0,y:0};
}
// checkt ob und wie ein spieler geschlagen werden kann (single pos)
function bigBoss(x,y,spieler,bauer) {

  if(bauer==0) {

   if(spieler==1) {

    for(var i=0; i < spieler1.length;i++) {
    	if(spieler1[i].x == x && spieler1[i].y == y) {
        console.log("voll");
      	return false;
    	}
    }

    for(var i=0; i < spieler2.length;i++) {
    	if(spieler2[i].x == x && spieler2[i].y == y) {
        spieler2.splice(i,1);
        console.log("geschlagen");
    	}
    }

    return true;
   }

  if(spieler==2) {
    for(var i=0; i < spieler2.length;i++) {
    	if(spieler2[i].x == x && spieler2[i].y == y) {
        console.log("voll");
      	return false;

    	}
    }

    for(var i=0; i < spieler1.length;i++) {
    	if(spieler1[i].x == x && spieler1[i].y == y) {
        spieler1.splice(i,1);
        console.log("geschlagen");
    	}
    }
    return true;
  }
 }

 if(bauer==1) {
   if(spieler==1) {

    for(var i=0; i < spieler1.length;i++) {
    	if(spieler1[i].x == x && spieler1[i].y == y) {
        console.log("voll");
      	return false;
      }
    }

    for(var i=0; i < spieler2.length;i++) {
    	if(spieler2[i].x == x && spieler2[i].y == y) {
        console.log("voll gegner");
      	return false;
    	}
    }

    for(var i=0; i < spieler2.length;i++) {
    	if(spieler2[i].x == x && spieler2[i].y == y) {
        spieler2.splice(i,1);
        console.log("geschlagen");
    	}
    }
    return true;
  }

  if(spieler==2) {

    for(var i=0; i < spieler1.length;i++) {
    	if(spieler1[i].x == x && spieler1[i].y == y) {
        console.log("voll");
      	return false;
      }
    }

    for(var i=0; i < spieler2.length;i++) {
    	if(spieler2[i].x == x && spieler2[i].y == y) {
        console.log("voll gegner");
      	return false;

    	}
    }

    for(var i=0; i < spieler1.length;i++) {
    	if(spieler1[i].x == x && spieler1[i].y == y) {
        spieler1.splice(i,1);
        console.log("geschlagen");
    	}
    }
    return true;
  }
 }
}
// bauern schlag und im weg stehende figuren checker
function mist(x,y,spieler) {
  if(spieler==1) {

    for(var i=0; i < spieler1.length;i++) {
    	if(spieler1[i].x == x && spieler1[i].y == y) {
        console.log("voll");
      	return false;
    	}
    }

    for(var i=0; i < spieler2.length;i++) {
    	if(spieler2[i].x == x && spieler2[i].y == y) {
        spieler2.splice(i,1);
        console.log("bauer weg");
        return true;
    	}
    }

   }

  if(spieler==2) {
    for(var i=0; i < spieler2.length;i++) {
    	if(spieler2[i].x == x && spieler2[i].y == y) {
        console.log("voll");
      	return false;

    	}
    }

    for(var i=0; i < spieler1.length;i++) {
    	if(spieler1[i].x == x && spieler1[i].y == y) {
        spieler1.splice(i,1);
        console.log("bauer weg");
        return true;
    	}
    }

  }

  if(spieler==0) {
    //check if free
    for(var i=0; i < spieler2.length;i++) {
    	if(spieler2[i].x == x && spieler2[i].y == y) {
        console.log("figur im weg");
      	return false;

    	}
    }

    for(var i=0; i < spieler1.length;i++) {
    	if(spieler1[i].x == x && spieler1[i].y == y) {
        console.log("figur im weg");
        return false;
    	}
    }
    return true;
  }
}
