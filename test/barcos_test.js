var expect = require('chai').expect;

describe('comprobarBarco', function () {
    var comprobarBarco = require('../logica_juego/metodos_barco').comprobarBarco;    

    it('debería devolver que no hay ningún barco en la coordenada pasada', function () {

        jugador = {
            barcos: [
                {
                    localizaciones: [[0, 0]]
                }
            ]
        };

        expect(comprobarBarco(jugador, [9, 9])).to.be.false;
    });
    it('debería devolver si hay un barco en la coordenada pasada', function () {
        
        jugador = {
            barcos: [
                {
                    localizaciones: [[0, 0]]
                }
            ]
        };

      expect(comprobarBarco(jugador, [0, 0])).to.be.true;
    });
    it('debería devolver si hay un barco en más de una coordenada', function () {
        
        jugador = {
            barcos: [
                {
                    localizaciones: [[0, 1], [0, 2]]
                }
            ]
        };

        expect(comprobarBarco(jugador, [0, 1])).to.be.true;
        expect(comprobarBarco(jugador, [0, 0])).to.be.false;
        expect(comprobarBarco(jugador, [0, 2])).to.be.true;
    });
    it('debería devolver si hay un barco en más de una coordenada', function () {
        
        jugador = {
            barcos: [
                {
                    localizaciones: [[0, 1], [0, 2]]
                },
                {
                    localizaciones: [[1, 0], [2, 0]]
                },
                {
                    localizaciones: [[3, 1], [3, 2]]
                }
            
            ]
        };

        expect(comprobarBarco(jugador, [0, 1])).to.be.true;
        expect(comprobarBarco(jugador, [0, 0])).to.be.false;
        expect(comprobarBarco(jugador, [0, 2])).to.be.true;
        expect(comprobarBarco(jugador, [2, 0])).to.be.true;
        expect(comprobarBarco(jugador, [3, 0])).to.be.false;
        expect(comprobarBarco(jugador, [1, 0])).to.be.true;
        expect(comprobarBarco(jugador, [3, 1])).to.be.true;
        expect(comprobarBarco(jugador, [3, 2])).to.be.true;
    });

});    

describe('dañosEnElBarco', function () {
    var dañosEnElBarco = require('../logica_juego/metodos_barco').dañosEnElBarco;    

    it('debería registrar el daño en un barco en una localización dada', function () {

        jugador = {
            barcos: [
                {
                    localizaciones: [[0, 0], [0, 1], [0, 2], [0, 3]],
                    daños: []
                }
            ]
        };

        dañosEnElBarco(jugador, [0, 1]);
        expect(jugador.barcos[0].daños).is.not.empty;
    });
    it('no debería registrar el daño en un barco', function () {

        jugador = {
            barcos: [
                {
                    localizaciones: [[0, 0], [0, 1], [0, 2], [0, 3]],
                    daños: []
                }
            ]
        };

        dañosEnElBarco(jugador, [1, 1]);
        expect(jugador.barcos[0].daños).is.empty;
    });
});

describe('colocarBarco', function () {
    var colocarBarco = require('../logica_juego/metodos_barco').colocarBarco;    

    it('debería añadir un barco al jugador', function () {

        jugador = {
            tablero: new Array(10).fill(new Array(10).fill(0)),
            barcos: []
        };
        
        var barco = {
                localizaciones: [[1, 1], [1, 2]],
                daños: []
        }

        colocarBarco(jugador, barco);
        expect(jugador.barcos).is.not.empty;
    });

    it('no debería añadir un barco al jugador debido a que hay otro barco en esa posición', function () {

        jugador = {
            barcos: [
                {
                    localizaciones: [[1, 1], [1, 2]],
                    daños: []
                }
            ]
        };
        
        var barco = {
                localizaciones: [[1, 1]],
                daños: []
        }

        colocarBarco(jugador, barco);
        expect(jugador.barcos).that.not.includes(barco);
    });

    it('no debería añadir un barco al jugador debido a que hay otro barco en las inmediaciones', function () {

        jugador = {
            barcos: [
                {
                    localizaciones: [[1, 1], [1, 2]],
                    daños: []
                }
            ]
        };
        
        var barco = {
                localizaciones: [[0, 1]],
                daños: []
        }

        colocarBarco(jugador, barco);
        expect(jugador.barcos).that.not.includes(barco);

        var barco = {
            localizaciones: [[1, 0]],
            daños: []
        }

        colocarBarco(jugador, barco);
        expect(jugador.barcos).that.not.includes(barco);

        var barco = {
            localizaciones: [[2, 3]],
            daños: []
        }

        colocarBarco(jugador, barco);
        expect(jugador.barcos).that.not.includes(barco);
    });

    it('no debería añadir un barco al jugador debido a que se encuentra fuera de los límites', function () {

        jugador = {
            barcos: [
                {
                    localizaciones: [],
                    daños: []
                }
            ]
        };
        
        var barco = {
                localizaciones: [],
                daños: []
        }

        colocarBarco(jugador, barco);
        expect(jugador.barcos).that.not.includes(barco);
    });
});

describe('colocarBarcosAleatoriamente', function () {
    var colocarBarcosAleatoriamente = require('../logica_juego/metodos_barco').colocarBarcosAleatoriamente;   

    it('debería colocar todos los barcos aleatoriamente', function () {

        jugador = {
            tablero: new Array(10).fill(new Array(10).fill(0)),
            barcos: []
        };

        colocarBarcosAleatoriamente(jugador);
        expect(jugador.barcos.length).to.equal(5);
    });
});
