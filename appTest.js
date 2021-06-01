//génération d'aliens aléatoires
let randomNumber = Math.floor(Math.random() * 15);
let randomAlienNumber = randomNumber + 1;
let alien = "alien"+ randomAlienNumber;
console.log(alien);

let missile = new Sprite ("./images/missile.png", 0, 0);
    missile.display = "none";

let vaisseau = new Sprite ("./images/vaisseau.png", 100, 700);  //("source", left, top);
let alien1 = new Sprite ("./images/alien1.png", 100, 50);
let alien2 = new Sprite ("./images/alien2.png", 100, 50);
let alien3 = new Sprite ("./images/alien3.png", 100, 50);
let alien4 = new Sprite ("./images/alien4.png", 100, 50);
let alien5 = new Sprite ("./images/alien5.png", 100, 50);

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