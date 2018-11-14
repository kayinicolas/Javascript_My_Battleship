/*jslint browser this */
/*global _, player */

(function (global) {
    "use strict";

    var computer = _.assign({}, player, {
        grid: [],
        tries: [],
        fleet: [],
        game: null,
        play: function () {
            var self = this;
            setTimeout(function () {
                var x = Math.floor(Math.random() * 10);
                var y = Math.floor(Math.random() * 10);
                self.game.fire(this, y, x, function (hasSucced) {
                    self.tries[x][y] = hasSucced;
                    self.miniRenderTries (self.game.miniGrid);
                });
            }, 2000);
        },
        areShipsOk: function (callback) { // etape 5 
            
            var ships = 0;

            while (ships <= 4){

                var a = Math.floor(Math.random() * 10);
                var b = Math.floor(Math.random() * 10);
                   
                var c = Math.floor(Math.random() * 2);
                if (c === 0){
                    this.pos = "horizontal";
                }
                else{
                    this.pos = "verticale";
                }

                
                if (this.setActiveShipPosition(a, b)){
                this.activateNextShip();
                ships++;
                }
            }

            if (ships >= 4){

                callback();
            }
        }
    })

     global.computer = computer;

}(this));