function Springer(x,y,spieler) {
  this.x = x;
  this.y = y;
  this.size = 50;

  this.show = function() {
    push();
    translate(this.x,this.y);
    fill(0,255,255);
    if(spieler==2){
      rotate(180);
    }
    image(Springerw, -50, -50, 100, 100);
    pop();
  }

  this.event = function() {
    if(this.x == clicked.x && this.y == clicked.y) {
      if(confirmed.x != 0 && confirmed.y != 0) {
        if(floor(dist(this.x,this.y,confirmed.x,confirmed.y))==223){
          if(bigBoss(confirmed.x,confirmed.y,spieler,0)) {
          	this.x = confirmed.x;
          	this.y = confirmed.y;
          	Exec();
        	}
        }
    	}
    }
  }
}

function Bauer(x,y,spieler) {
  this.x = x;
  this.y = y;
  this.size = 50;

  this.show = function() {
    push();
    translate(this.x,this.y);
    fill(255,120,0);
    ellipseMode(CENTER);
    if(spieler==2){
      fill(0,0,255);
      rotate(180);
    }
    ellipse(0,0,this.size,this.size);
    pop();
  }

  this.event = function() {
    if(this.x == clicked.x && this.y == clicked.y) {
      if((confirmed.x != 0) && (confirmed.y != 0)) {
        if( (clicked.y-100 == confirmed.y) &&  (clicked.x == confirmed.x) && (spieler==1)){
          if(bigBoss(confirmed.x,confirmed.y,spieler,1)) {
          	this.x = confirmed.x;
          	this.y = confirmed.y;
          	Exec();
        	}
        }
        if((clicked.y+100 == confirmed.y) && (clicked.x == confirmed.x) && (spieler==2)){
          if(bigBoss(confirmed.x,confirmed.y,spieler,1)) {
          	this.x = confirmed.x;
          	this.y = confirmed.y;
          	Exec();
        	}
        }
        if(this.x == clicked.x && this.y == clicked.y) {
      	if((confirmed.x != 0) && (confirmed.y != 0)) {
        if( (clicked.y == 650) &&  (clicked.x == confirmed.x) && (confirmed.y==450) &&(spieler==1)){
          if(bigBoss(confirmed.x,confirmed.y,spieler,1)) {
          	this.x = confirmed.x;
          	this.y = confirmed.y;
          	Exec();
        	}
        }
        }
        }
        if((clicked.y == 150) &&  (clicked.x == confirmed.x) && (confirmed.y==350) &&(spieler==2)){
          if(bigBoss(confirmed.x,confirmed.y,spieler,1)) {
          	this.x = confirmed.x;
          	this.y = confirmed.y;
          	Exec();
        	}
        }
        if((clicked.y+100 == confirmed.y) && ((clicked.x -100 == confirmed.x) || (clicked.x +100 == confirmed.x))&& (spieler==2)){
          	if(mist(confirmed.x,confirmed.y,spieler)){
          		this.x = confirmed.x;
          		this.y = confirmed.y;
          		Exec();
        	}
        }
      	if((clicked.y-100 == confirmed.y) && ((clicked.x -100 == confirmed.x) || (clicked.x +100 == confirmed.x))&& (spieler ==1)){
            if(mist(confirmed.x,confirmed.y,spieler)){
          		this.x = confirmed.x;
          		this.y = confirmed.y;
          		Exec();
        	}
        }
      }
    }
  }
}

function Läufer(x,y,spieler) {
  this.x = x;
  this.y = y;
  this.size = 50;
  this.roger = false;

  this.show = function() {
    push();
    translate(this.x,this.y);
    fill(255,120,0);
    if(spieler==2){
      rotate(180);
      fill(0,0,255);
    }
    triangle(-30, 30, 0, -40, 30, 30);
    pop();
  }

  this.event = function() {
    if(this.x == clicked.x && this.y == clicked.y) {
      if(confirmed.x != 0 && confirmed.y != 0) {
        //anzahl der gewünschten felder.
        for(var i=1;i<9;i++){
          //zug ist eigentlich möglich..
          if(floor(dist(this.x,this.y,confirmed.x,confirmed.y)/i) ==141){
            //elendige tests ob alle felder in einer linie frei sind..
            if(confirmed.y < clicked.y){
              if(confirmed.x < clicked.x){
                //oben links
                for(var j=1;j<i;j++){
                  if(mist(this.x-100*j,this.y-100*j,0)){
                    this.roger = true;
                  }
                  else {
                    this.roger = false;
                    break;
                  }
                }
              }
              if(confirmed.x > clicked.x){
                //oben rechts
                for(var j=1;j<i;j++){
                  if(mist(this.x+100*j,this.y-100*j,0)){
                    this.roger = true;
                  }
                  else {
                    this.roger = false;
                    break;
                  }
                }
              }
            }
            if(confirmed.y > clicked.y){
              if(confirmed.x < clicked.x){
                //unten links
                for(var j=1;j<i;j++){
                  if(mist(this.x-100*j,this.y+100*j,0)){
                    this.roger = true;
                  }
                  else {
                    this.roger = false;
                    break;
                  }
                }
              }
              if(confirmed.x > clicked.x){
                //unten rechts
                for(var j=1;j<i;j++){
                  if(mist(this.x+100*j,this.y+100*j,0)){
                    this.roger = true;
                  }
                  else {
                    this.roger = false;
                    break;
                  }
                }
              }
            }
            //hui tests sind durch puhh..
            // mimimi ausnahme bei einem feld. gott wer hätte gedacht das läufer so ein elend sind in einer quadrat matrix. bahh!
            if(floor(dist(this.x,this.y,confirmed.x,confirmed.y)) ==141){
              console.log("ein feld läufer");
              if(bigBoss(confirmed.x,confirmed.y,spieler,0)) {
          	     this.x = confirmed.x;
          	     this.y = confirmed.y;
          	     Exec();
                 this.roger = false;
                 break;
               }
            }
            if(this.roger){
              if(bigBoss(confirmed.x,confirmed.y,spieler,0)) {
                console.log("mehr feld läufer");
          	     this.x = confirmed.x;
          	     this.y = confirmed.y;
          	     Exec();
                 this.roger = false;
                 break;
        	    }
            }
          }
        }
    	}
    }
  }
}

function Turm(x,y,spieler) {
  this.x = x;
  this.y = y;
  this.size = 50;
  this.roger = false;

  this.show = function() {
    push();
    translate(this.x,this.y);
    fill(255,120,0);
    if(spieler==2){
      rotate(180);
      fill(0,0,255);
    }
    rectMode(CENTER);
    rect(0, 0, 40, 70);
    pop();
  }

  this.event = function() {
    if(this.x == clicked.x && this.y == clicked.y) {
      if(confirmed.x != 0 && confirmed.y != 0) {
        //anzahl der gewünschten felder.
        for(var i=1;i<9;i++){
          //zug ist eigentlich möglich..
          if(floor(dist(this.x,this.y,confirmed.x,confirmed.y)/i) ==100){
            //elendige tests ob alle felder in einer linie frei sind..
            if(confirmed.y < clicked.y){
                //oben
                for(var j=1;j<i;j++){
                  if(mist(this.x,this.y-100*j,0)){
                    this.roger = true;
                  }
                  else {
                    this.roger = false;
                    break;
                  }
              }
            }
              if(confirmed.x > clicked.x){
                //rechts
                for(var j=1;j<i;j++){
                  if(mist(this.x+100*j,this.y,0)){
                    this.roger = true;
                  }
                  else {
                    this.roger = false;
                    break;
                  }
                }
              }
              if(confirmed.x < clicked.x){
                //links
                for(var j=1;j<i;j++){
                  if(mist(this.x-100*j,this.y,0)){
                    this.roger = true;
                  }
                  else {
                    this.roger = false;
                    break;
                  }
                }
              }
              if(confirmed.y > clicked.y){
                //unten
                for(var j=1;j<i;j++){
                  if(mist(this.x,this.y+100*j,0)){
                    this.roger = true;
                  }
                  else {
                    this.roger = false;
                    break;
                  }
                }
              }
            //hui tests sind durch puhh..
            // mimimi ausnahme bei einem feld.
            if(floor(dist(this.x,this.y,confirmed.x,confirmed.y)) ==100){
              console.log("ein feld Turm");
              if(bigBoss(confirmed.x,confirmed.y,spieler,0)) {
          	     this.x = confirmed.x;
          	     this.y = confirmed.y;
          	     Exec();
                 this.roger = false;
                 break;
               }
            }
            if(this.roger){
              if(bigBoss(confirmed.x,confirmed.y,spieler,0)) {
                console.log("mehr feld Turm");
          	     this.x = confirmed.x;
          	     this.y = confirmed.y;
          	     Exec();
                 this.roger = false;
                 break;
        	    }
            }
          }
        }
    	}
    }
  }
}

function Dame(x,y,spieler) {
  this.x = x;
  this.y = y;
  this.size = 50;
  this.roger = false;

  this.show = function() {
    push();
    translate(this.x,this.y);
    fill(255,120,0);
    if(spieler==2){
      rotate(180);
      fill(0,0,255);
    }
    rectMode(CENTER);
    rect(0, 0, 40, 70);
    triangle(-30, 30, 0, -40, 30, 30);
    pop();
  }

  this.event = function() {
    if(this.x == clicked.x && this.y == clicked.y) {
      if(confirmed.x != 0 && confirmed.y != 0) {
        //anzahl der gewünschten felder.
        for(var i=1;i<9;i++){

          // LÄUFER!!! zug ist eigentlich möglich..
          if(floor(dist(this.x,this.y,confirmed.x,confirmed.y)/i) ==141){
            //elendige tests ob alle felder in einer linie frei sind..
            if(confirmed.y < clicked.y){
              if(confirmed.x < clicked.x){
                //oben links
                for(var j=1;j<i;j++){
                  if(mist(this.x-100*j,this.y-100*j,0)){
                    this.roger = true;
                  }
                  else {
                    this.roger = false;
                    break;
                  }
                }
              }
              if(confirmed.x > clicked.x){
                //oben rechts
                for(var j=1;j<i;j++){
                  if(mist(this.x+100*j,this.y-100*j,0)){
                    this.roger = true;
                  }
                  else {
                    this.roger = false;
                    break;
                  }
                }
              }
            }
            if(confirmed.y > clicked.y){
              if(confirmed.x < clicked.x){
                //unten links
                for(var j=1;j<i;j++){
                  if(mist(this.x-100*j,this.y+100*j,0)){
                    this.roger = true;
                  }
                  else {
                    this.roger = false;
                    break;
                  }
                }
              }
              if(confirmed.x > clicked.x){
                //unten rechts
                for(var j=1;j<i;j++){
                  if(mist(this.x+100*j,this.y+100*j,0)){
                    this.roger = true;
                  }
                  else {
                    this.roger = false;
                    break;
                  }
                }
              }
            }
            //hui tests sind durch puhh..
            // mimimi ausnahme bei einem feld. gott wer hätte gedacht das läufer so ein elend sind in einer quadrat matrix. bahh!
            if(floor(dist(this.x,this.y,confirmed.x,confirmed.y)) ==141){
              console.log("ein feld Dame");
              if(bigBoss(confirmed.x,confirmed.y,spieler,0)) {
          	     this.x = confirmed.x;
          	     this.y = confirmed.y;
          	     Exec();
                 this.roger = false;
                 break;
               }
            }
          }
            //TURM!!!! zug ist eigentlich möglich..
            if(floor(dist(this.x,this.y,confirmed.x,confirmed.y)/i) ==100){
              //elendige tests ob alle felder in einer linie frei sind..
              if(confirmed.y < clicked.y){
                  //oben
                  for(var j=1;j<i;j++){
                    if(mist(this.x,this.y-100*j,0)){
                      this.roger = true;
                    }
                    else {
                      this.roger = false;
                      break;
                    }
                }
              }
                if(confirmed.x > clicked.x){
                  //rechts
                  for(var j=1;j<i;j++){
                    if(mist(this.x+100*j,this.y,0)){
                      this.roger = true;
                    }
                    else {
                      this.roger = false;
                      break;
                    }
                  }
                }
                if(confirmed.x < clicked.x){
                  //links
                  for(var j=1;j<i;j++){
                    if(mist(this.x-100*j,this.y,0)){
                      this.roger = true;
                    }
                    else {
                      this.roger = false;
                      break;
                    }
                  }
                }
                if(confirmed.y > clicked.y){
                  //unten
                  for(var j=1;j<i;j++){
                    if(mist(this.x,this.y+100*j,0)){
                      this.roger = true;
                    }
                    else {
                      this.roger = false;
                      break;
                    }
                  }
                }
              //hui tests sind durch puhh..
              // mimimi ausnahme bei einem feld.
              if(floor(dist(this.x,this.y,confirmed.x,confirmed.y)) ==100){
                console.log("ein feld Dame");
                if(bigBoss(confirmed.x,confirmed.y,spieler,0)) {
                   this.x = confirmed.x;
                   this.y = confirmed.y;
                   Exec();
                   this.roger = false;
                   break;
                 }
              }
            }
            if(this.roger){
              if(bigBoss(confirmed.x,confirmed.y,spieler,0)) {
                console.log("mehr feld Dame");
          	     this.x = confirmed.x;
          	     this.y = confirmed.y;
          	     Exec();
                 this.roger = false;
                 break;
        	    }
            }
        }
    	}
    }
  }
}

function König(x,y,spieler) {
  this.x = x;
  this.y = y;
  this.size = 50;
  this.roger = false;

  this.show = function() {
    push();
    translate(this.x,this.y);
    fill(255,120,0);
    if(spieler==2){
      rotate(180);
      fill(0,0,255);
    }
    rectMode(CENTER);
    rect(0, 0, 15, 70);
    rect(0, -9, 60, 15);
    pop();
  }

  this.event = function() {
    if(this.x == clicked.x && this.y == clicked.y) {
      if(confirmed.x != 0 && confirmed.y != 0) {
        // Turm
        if(floor(dist(this.x,this.y,confirmed.x,confirmed.y)) ==100){
          console.log("König zug");
          if(bigBoss(confirmed.x,confirmed.y,spieler,0)) {
             this.x = confirmed.x;
             this.y = confirmed.y;
             Exec();
             this.roger = false;
           }
        }
            // Läufer
            if(floor(dist(this.x,this.y,confirmed.x,confirmed.y)) ==141){
              console.log("König zug");
              if(bigBoss(confirmed.x,confirmed.y,spieler,0)) {
          	     this.x = confirmed.x;
          	     this.y = confirmed.y;
          	     Exec();
                 this.roger = false;
               }
            }
          }
        }
    	}
}
