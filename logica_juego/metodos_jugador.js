const TAMAÑO_MAX = 10;
var jugador1, jugador2;
var posicion = "Horizontal";
var numBarco = 0;
    

class Jugador
{
    constructor() 
    {
        this.tablero = this.iniciarTablero();
        this.barcos = [];
        this.disparos = new Array();
    }

    iniciarTablero()
    {
        var array = [];

        for(var i=0; i<TAMAÑO_MAX; i++)
        {
            var fila = [];
            for(var j=0; j<TAMAÑO_MAX; j++)
            {
                fila[j] = 0;
            }
            array[i] = fila;
        }

        return array;
    }
}
 
function nuevaPartida()
{
    jugador1 = new Jugador();
    jugador2 = new Jugador();
    
    colocarBarcosAleatoriamente(jugador2);

    posicion = "Horizontal";
    numBarco = 0;

    pintarTablero(jugador1);
    pintarTablero(jugador2, true);

    var reiniciar = document.getElementById("nuevaPartida");
    reiniciar.innerHTML = "Reiniciar";

    var contenedor = document.getElementById("contenedor");
    contenedor.style.display = "block";
};

function coordenadasBarco(x,y)
{
    if(numBarco < BARCOS.length && jugador1.barcos.length < BARCOS.length)
    {
        var _arrayLocalizaciones = new Array();
        var _tamañoBarco = BARCOS[numBarco];

        for(var j=0; j<_tamañoBarco; j++)
        {
            if(posicion == "Horizontal")
            {
                _arrayLocalizaciones[j] = [x++, y];
            }
            else
            {
                _arrayLocalizaciones[j] = [x, y++];
            }
        }
        var _barco = new Barco(_arrayLocalizaciones, new Array(), _tamañoBarco);
        var _numBarcosJugador = jugador1.barcos.length;
        colocarBarco(jugador1, _barco);

        if (_numBarcosJugador < jugador1.barcos.length)
        {
            numBarco++;
            pintarTablero(jugador1);
        }
    }
}

function disparar(x,y)
{
    var okDisparo = false;

    okDisparo = comprobarDisparo(jugador1, x, y);

    if(okDisparo && jugador1.barcos.length == BARCOS.length)
    {
        dañosEnElBarco(jugador2,[x,y]);

        jugador1.disparos.push([x,y]);

        pintarTablero(jugador2, true);

        if (jugador2.barcos.length == 0)
        {
            alert("¡HAS GANADO!");
        }

        do
        {
            var posicionX = Math.floor(Math.random()*TAMAÑO_MAX);
            var posicionY = Math.floor(Math.random()*TAMAÑO_MAX);
            okDisparo = comprobarDisparo(jugador2, posicionX, posicionY);
        }
        while (!okDisparo)

        dañosEnElBarco(jugador1,[posicionX,posicionY], true);

        jugador2.disparos.push([posicionX,posicionY]);

        pintarTablero(jugador1);

        if (jugador1.barcos.length == 0)
        {
            alert("¡HAS PERDIDO!");
        }
    }

}

function cambiarPosicion(nuevaPosicion)
{
    posicion = nuevaPosicion;
}

function comprobarDisparo(jugador, x, y)
{
    var okDisparo = true;

    jugador.disparos.forEach(disparo => {
        if (disparo[0] == x && disparo[1] == y ) okDisparo = false;
    });

    return okDisparo;
}

module.exports.nuevaPartida = nuevaPartida;
module.exports.disparar = disparar;
module.exports.Jugador = Jugador;