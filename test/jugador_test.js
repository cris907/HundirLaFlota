describe('disparar', function () {
    var colocarBarcosAleatoriamente = require('../logica_juego/metodos_barco').colocarBarcosAleatoriamente;   
    var disparar = require('../logica_juego/metodos_jugador').disparar;   
    var nuevaPartida = require('../logica_juego/metodos_jugador').nuevaPartida;   

    it('debería registrar un disparo del jugador', function () {

        nuevaPartida();
        disparar([1, 1]);
        expect(jugador1.barcos[0].daños).is.not.empty;
    });
});
