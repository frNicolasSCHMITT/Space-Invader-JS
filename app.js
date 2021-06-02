
//-----------------------code Tuto-------------------------------------------------------------------
  //("source", top, left);
// let alien1 = new Sprite ("./images/alien1.png", 100, 50);
// let alien2 = new Sprite ("./images/alien2.png", 400, 50);
// let alien3 = new Sprite ("./images/alien3.png", 700, 50);
// let alien4 = new Sprite ("./images/alien4.png", 1000, 50);
// let alien5 = new Sprite ("./images/alien5.png", 1300, 50);
// let alien6 = new Sprite ("./images/alien1.png", 250, 150);
// let alien7 = new Sprite ("./images/alien2.png", 550, 150);
// let alien8 = new Sprite ("./images/alien3.png", 850, 150);
// let alien9 = new Sprite ("./images/alien4.png", 1150, 150);
// let alien10 = new Sprite ("./images/alien5.png", 1450, 150);
// let alien11 = new Sprite ("./images/alien1.png", 100, 250);
// let alien12 = new Sprite ("./images/alien2.png", 400, 250);
// let alien13 = new Sprite ("./images/alien3.png", 700, 250);
// let alien14 = new Sprite ("./images/alien4.png", 1000, 250);
// let alien15 = new Sprite ("./images/alien5.png", 1300, 250);

function Sprite( filename, left, top ) {  //fonction de construction d'objet donc nom avec majuscule au début
    this._node = document.createElement("img");  //crée un élément de type img
    this._node.src = filename;  //lie la src à l'élément img
    this._node.style.position = "absolute";  //attribue la position absolue à l'élément
    document.body.appendChild(this._node);  //crée l'élément sur le body

    Object.defineProperty(this, "left", {  // Modifie la valeur de left 
        get: function() {  //si left est accedée en lecture (read)
            return this._left;
        },
        set: function(value){  //si left est accedée en écriture (set)
            this._left = value;  //attribue la valeur à left
            this._node.style.left = value + "px";  //applique la valeur en pixels pour obtenir position
        }
    });

    Object.defineProperty(this, "top", {  // Modifie la valeur de top 
        get: function() {  //si top est accedée en lecture (read)
            return this._top;
        },
        set: function(value){  //si top est accedée en écriture (set)
            this._top = value;  //attribue la valeur à top
            this._node.style.top = value + "px";  //applique la valeur en pixels pour obtenir position
        }
    });

    Object.defineProperty(this, "display", {  // Modifie la valeur du display 
        get: function() {  //si display est accedée en lecture (read)
            return this._node.style.display;
        },
        set: function(value){  //si display est accedée en écriture (set)
            this._node.style.display = value;  //attribue la valeur à display
        }
    });

    //Attribue les propriétés d'au dessus comme valeurs pour
    this.left = left;  //left
    this.top = top;  //top
    
}
Sprite.prototype.startAnimation = function(fct, interval){
    if (this._clock) window.clearInterval(this._clock);  //si dja une animation, la clear et remplace par la nouvelle
    let _this = this;  //Pour récupérer le this précédent (Sprite)
    this._clock = window.setInterval(function(){  //déclenche un délai régulier (this._clock)
        fct(_this);  //fonction avec paramètre _this cité plus haut
    },interval);
}

Sprite.prototype.stopAnimation = function(){ //En cas de stop d'animation
    window.clearInterval(this._clock);  //clear le délai
}

Sprite.prototype.checkCollision = function (other){     //collision si n'est pas
    return ! ((this.top + this._node.height < other.top) ||     // au dessus ou
            this.top > (other.top + other._node.height) ||      // en dessous ou
            (this.left + this._node.width < other.left) ||      // avant ou
            this.left > (other.left + other._node.width));      // après
}

let missile = new Sprite ("./images/missile.png", 0, 0);
    missile.display = "none";

let vaisseau = new Sprite ("./images/vaisseau.png", 740, 700);

document.onkeydown = function(event){  //track de la touche pressée
    console.log(event.keyCode);

    if(event.keyCode == 90){            // touche Z = déplacement haut
        vaisseau.top -= 10;
    }
    else if(event.keyCode == 65){            // touche A = déplacement haut/gauche
        vaisseau.top -= 10;
        vaisseau.left -= 10;
    }
    else if(event.keyCode == 69){            // touche E = déplacement haut/droite
        vaisseau.top -= 10;
        vaisseau.left += 10;
    }
    else if(event.keyCode == 81){            // touche Q = déplacement gauche
        vaisseau.left -= 10;
    }
    else if(event.keyCode == 68){            // touche D = déplacement droite
        vaisseau.left += 10;
    }
    else if(event.keyCode == 83){            // touche S = déplacement bas
        vaisseau.top += 10;
    }
    else if(event.keyCode == 87){            // touche W = déplacement bas/gauche
        vaisseau.top += 10;
        vaisseau.left -= 10;
    }
    else if(event.keyCode == 67){            // touche C = déplacement bas/droite
        vaisseau.top += 10;
        vaisseau.left += 10;
    }

    //Pour limiter les déplacements sur l'axe X à l'écran visible
    if (vaisseau.left < 0) {
        vaisseau.left = 0;
    }   
    if (vaisseau.left > document.body.clientWidth - vaisseau._node.width) {
        vaisseau.left = document.body.clientWidth - vaisseau._node.width;
    }

    //Pour limiter les déplacements sur l'axe Y à l'écran visible
    if (vaisseau.top < 0) {
        vaisseau.top = 0;
    }   
    if (vaisseau.top > document.body.clientHeight - vaisseau._node.height) {
        vaisseau.top = document.body.clientHeight - vaisseau._node.height;
    }

    if(event.keyCode == 32){            // touche SPACEBAR = Tir missile
        if (missile.display == "none"){  //lance un missile que si aucun affiché
            missile.display = "block";  //affiche le missile
            missile.top = vaisseau.top; //positionne le missile sous le vaisseau
            missile.left = vaisseau.left + (vaisseau._node.width - missile._node.width) / 2; //au centre du V
            missile.startAnimation(moveMissile, 10); //lance la fonction déplacement du missile toute les 20ms
        }
    }

};

let alien = [];

for(let i=1; i<=5; i++){
        alien[i] = new Sprite("./images/alien"+(Math.floor(Math.random() * 5)+1)+".png", i * 100, 20);
    alien[i].startAnimation(moveAlienToRight, 30);
}

function moveMissile(missile){
    missile.top -=10;  //déplacement du missile en px / refresh fonction startAnimation(moveMissile)
    if(missile.top < -40) {
        missile.stopAnimation();
        missile.display = "none";
    }  //clear les missiles off-screen

    for(let i=1; i<=5; i++){

        if (alien[i].display == "none") continue;
        if (missile.checkCollision(alien[i])){
            missile.stopAnimation();
            missile.display = "none";
            alien[i].stopAnimation();
            alien[i].display = "none";
        }
    }
}

function moveAlienToRight(alien){
    alien.left += 10;   //déplace les Aliens de 10 px vers la droite / refresh
    if(alien.left > document.body.clientWidth - alien._node.width){
        alien.top += 50;        //descend d'un étage
        alien.startAnimation(moveAlienToLeft, 30);     //Puis va dans l'autre sens
    }
}

function moveAlienToLeft(alien){
    alien.left -= 10;   //déplace les Aliens de 10 px vers la gauche / refresh
    if(alien.left <= 0){
        alien.top += 50;    //descend d'un étage
        alien.startAnimation(moveAlienToRight, 30);    //Puis va dans l'autre sens
    }
}

// for(let i=1; i<=15; i++){       //variable où i= n° Alien
//     window["alien"+i].startAnimation(moveAlienToRight, 100);
// } //marche pas??

// alien1.startAnimation(moveAlienToRight, 100);
// alien2.startAnimation(moveAlienToRight, 100);
// alien3.startAnimation(moveAlienToRight, 100);
// alien4.startAnimation(moveAlienToRight, 100);
// alien5.startAnimation(moveAlienToRight, 100);
// alien6.startAnimation(moveAlienToRight, 100);
// alien7.startAnimation(moveAlienToRight, 100);
// alien8.startAnimation(moveAlienToRight, 100);
// alien9.startAnimation(moveAlienToRight, 100);
// alien10.startAnimation(moveAlienToRight, 100);
// alien11.startAnimation(moveAlienToRight, 100);
// alien12.startAnimation(moveAlienToRight, 100);
// alien13.startAnimation(moveAlienToRight, 100);
// alien14.startAnimation(moveAlienToRight, 100);
// alien15.startAnimation(moveAlienToRight, 100);



//----------------------Code Libre-------------------------------------------------------------------

//génération d'aliens aléatoires
// let randomNumber = Math.floor(Math.random() * 5)+1;
// let alien = "./images/alien"+ randomNumber +".png";
// console.log(alien);

