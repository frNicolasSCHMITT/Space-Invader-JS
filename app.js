
let missile = new Sprite ("./images/missile.png", 0, 0);
    missile.display = "none";

let vaisseau = new Sprite ("./images/vaisseau.png", 740, 700);  //("source", top, left);
let alien1 = new Sprite ("./images/alien1.png", 100, 50);
let alien2 = new Sprite ("./images/alien2.png", 400, 50);
let alien3 = new Sprite ("./images/alien3.png", 700, 50);
let alien4 = new Sprite ("./images/alien4.png", 1000, 50);
let alien5 = new Sprite ("./images/alien5.png", 1300, 50);

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
        missile.display = "block";
        missile.top = vaisseau.top; //positionne le missile sous le vaisseau
        missile.left = vaisseau.left + (vaisseau._node.width - missile._node.width) / 2; //au centre du V
    }

};