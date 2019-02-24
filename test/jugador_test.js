var expect = require('chai').expect;

describe('comprobarDisparo', function () {
    var comprobarDisparo = require('../logica_juego/metodos_jugador').comprobarDisparo;     

    it('debería devolver que puede disparar en esas coordenadas', function () {

        jugador = {
            disparos: []
        };
        expect(comprobarDisparo(jugador, 1, 1)).to.be.true;
    });

    it('debería devolver que no puede disparar en esas coordenadas debido a que ya disparó ahí', function () {

        jugador = {
            disparos: [[1, 1]]
        };
        expect(comprobarDisparo(jugador, 1, 1)).to.be.false;
    });
});