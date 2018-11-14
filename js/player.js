/*jslint browser this */
/*global _, shipFactory, player, utils */

(function (global) {
    "use strict";

    var sheep = {dom: {parentNode: {removeChild: function () {}}}};

    var player = {
        grid: [],
        tries: [],
        fleet: [],
        game: null,
        activeShip: 0,
        init: function () {
            // créé la flotte
            this.fleet.push(shipFactory.build(shipFactory.TYPE_BATTLESHIP));
            this.fleet.push(shipFactory.build(shipFactory.TYPE_DESTROYER));
            this.fleet.push(shipFactory.build(shipFactory.TYPE_SUBMARINE));
            this.fleet.push(shipFactory.build(shipFactory.TYPE_SMALL_SHIP));

            // créé les grilles
            this.grid = utils.createGrid(10, 10);
            this.tries = utils.createGrid(10, 10);
        },
        isShipOk: function (player) {
        },
        setGame: function (game) {

            this.game = game;
        },
        play: function (col, line) {
            // appel la fonction fire du game, et lui passe une calback pour récupérer le résultat du tir
            this.game.fire(this, col, line, _.bind(function (hasSucced) {
                this.tries[line][col] = hasSucced;
            }, this));
            /*var i = 0; // etape 9
            var j = 0;

            while (i < 9){

               while (j < 9){

                this.grid[i][j] = 0;
                
                    j++;
               } 
                    i++; j=0;
            }*/
        },
        // quand il est attaqué le joueur doit dire si il a un bateaux ou non à l'emplacement choisi par l'adversaire
        receiveAttack: function (col, line, callback) {
            var succeed = false;

            if (this.grid[line][col] !== 0) {
                succeed = true;
                this.grid[line][col] = 0;
            }
            callback.call(undefined, succeed);
        },
        setActiveShipPosition: function (x, y) {
            var ship = this.fleet[this.activeShip];
            var i = 0;
            var a = 0;

            console.log(x);
            console.log(y);
            if(ship.pos == "horizontal") {
                
                x = x - Math.floor(ship.getLife()/2); // etape 3 
                while ( a < ship.getLife()) { // etape 3 j'ai ajouter un for qui place le bateau si la position et different de 0
                    if(this.grid[y][x + a] !== 0) {
                        return false;
                    }
                    a +=1;
                }


                while (i < ship.getLife()) {
                    this.grid[y][x + i] = ship.getId();
                    i += 1;
                }

                return true;
            }
            else
            {
                
                if(ship.pos == "vertical") {
                    y = y - Math.floor(ship.getLife()/2); // etape 3 
                    while ( a < ship.getLife()) { // etape 3 j'ai ajouter un for qui place le bateau si la position et different de 0
                        if (typeof(this.grid[y+a]) === "undefined"){
                            return false; 
                        }

                        if(this.grid[y + a][x] !== 0) {
                            return false;
                        }
                        a +=1;
                }


                while (i < ship.getLife()) {
                    this.grid[y + i][x] = ship.getId();
                    i += 1;
                }

                return true;

            }

        }


        },
        clearPreview: function () {
            this.fleet.forEach(function (ship) {
                if (ship.dom.parentNode) {
                    ship.dom.parentNode.removeChild(ship.dom);
                }
            });
        },
        resetShipPlacement: function () {
            this.clearPreview();

            this.activeShip = 0;
            this.grid = utils.createGrid(10, 10);
        },
        activateNextShip: function () {
            if (this.activeShip < this.fleet.length - 1) {
                this.activeShip += 1;
                return true;
            } else {
                return false;
            }
        },
        miniRenderTries: function (miniGrid) { 
            this.tries.forEach(function (row, rid) {
                row.forEach(function (val, col) { // etape 6 val correspond a la valeur et col collonne 
                    var node = miniGrid.querySelector('.row:nth-child(' + (rid + 1) + ') .cell:nth-child(' + (col + 1) + ')');

                    if (val === true) {
                        node.style.backgroundColor = '#e60019';
                    } 
                });
            });
        }, 

        renderTries: function (grid) { //etape 9
            this.tries.forEach(function (row, rid) {
                row.forEach(function (val, col) { // etape 6 val correspond a la valeur et col collonne 
                    var node = grid.querySelector('.row:nth-child(' + (rid + 1) + ') .cell:nth-child(' + (col + 1) + ')');

                    if (val === true) {
                        node.style.backgroundColor = '#e60019';
                    } else if (val === false) {
                        node.style.backgroundColor = '#aeaeae';
                    }
                });
            });
        }, 
        renderShips: function () {

            var shipone = 0;
            var shiptwo = 0;
            var shipthree = 0;
            var shipfour = 0;

            var i = 0; 
            var j = 0;

            while (i < 9){

               while (j < 9){

                switch (this.grid[i][j]){

                    case 1 : shipone++;
                break;

                case 2 : shiptwo++;
                break;

                case 3 : shipthree++;
                break;

                case 4 : shipfour++;
                break;
                }
                    j++;
               } 
                    i++; j=0;
            }
                if (shipone == 0){

                    document.getElementsByClassName("ship battleship")[0].classList.add("sunk");
                }

                if (shiptwo == 0){

                    document.getElementsByClassName("ship destroyer")[0].classList.add("sunk");
                }
                if (shipthree == 0){

                    document.getElementsByClassName("ship submarine")[0].classList.add("sunk");
                }
                if (shipfour == 0){

                    document.getElementsByClassName("ship small-ship")[0].classList.add("sunk");
                }


        },
    };

    global.player = player;

}(this));