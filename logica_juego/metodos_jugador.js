//Creamos variables jugador
var jugador1, jugador2;
//Creamos varibale posición y la inicializamos a Horizontal
var posicion = "Horizontal";
//Creamos variable numBarco y la inicializamos a 0
var numBarco = 0;
    
//Creamos la clase Jugador 
class Jugador
{
    //Método constructor para crear e inicializar un objeto creado a partir de la clase Jugador
    // con los atributos tablero, barcos y disparos
    constructor() 
    {
        this.tablero = this.iniciarTablero();
        this.barcos = [];
        this.disparos = new Array();
    }

    //Método para iniciar el tablero
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

//Creamos función nuevaPartida
function nuevaPartida()
{
    //Creamos dos objetos jugador, correspondientes al usuario jugador (jugador 1) y al jugador enemigo (jugador2) respectivamente
    jugador1 = new Jugador();
    jugador2 = new Jugador();
    

    //LLamamos a la función que coloca los barcos de forma aleatoria y le pasamos el jugador2 (enemigo)
    colocarBarcosAleatoriamente(jugador2);

    //Inicializamos la posición del barco en horizontal y el numero de barcos como 0
    posicion = "Horizontal";
    numBarco = 0;

    //LLamamos a la función pintarTablero para el jugador1 y para el jugador2
    pintarTablero(jugador1);
    pintarTablero(jugador2, true);

    //Cambiamos el texto del botón 'Nueva Partida' por 'Reiniciar'
    var reiniciar = document.getElementById("nuevaPartida");
    reiniciar.innerHTML = "Reiniciar";

    //Mostramos el div que contiene los tableros y los botones para colocar los barcos
    var contenedor = document.getElementById("contenedor");
    contenedor.style.display = "block";
    
    //Mostrar mensaje con instrucciones
    alert("¡Coloque los barcos en su tablero para comenzar a disparar en el tablero enemigo!");
};

//Creamos función coordenadasBarco 
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
        //Creamos objeto barco 
        var _barco = new Barco(_arrayLocalizaciones, new Array(), _tamañoBarco);
        //reamos variable con la longitud del array de barcos del jugador1
        var _numBarcosJugador = jugador1.barcos.length;
        //Llamamos a la función para colocar los barcos del jugador1
        colocarBarco(jugador1, _barco);

        //Llamamos a la función pintarTablero para pintar los barcos en el tablero del jugador1
        if (_numBarcosJugador < jugador1.barcos.length)
        {
            numBarco++;
            pintarTablero(jugador1);
        }
    }
}

//Creamos función para disparar
function disparar(x,y)
{
    var okDisparo = false;

    //Comprobamos disparo y pasamos el jugador1
    okDisparo = comprobarDisparo(jugador1, x, y);

    if(okDisparo && jugador1.barcos.length == BARCOS.length)
    {
        //Llamamos a la función dañosEnElBarco y le pasamos el jugador2 y las coordenadas donde ha disparado el jugador1
        dañosEnElBarco(jugador2,[x,y]);

        //Añadimos las coordenadas del disparo en el array disparos del jugador1
        jugador1.disparos.push([x,y]);

        //Llamamos a la función pintarTablero y le pasamos el jugador2
        pintarTablero(jugador2, true);

        //Si el jugador2 se queda sin barcos mostramos mensaje
        if (jugador2.barcos.length == 0)
        {
            alert("¡HAS GANADO!");
        }

        do
        {
            //Las posiciones de los disparos del jugador2 son en una posición aleatoria
            var posicionX = Math.floor(Math.random()*TAMAÑO_MAX);
            var posicionY = Math.floor(Math.random()*TAMAÑO_MAX);
            //Comprobamos disparo y pasamos el jugador2
            okDisparo = comprobarDisparo(jugador2, posicionX, posicionY);
        }
        while (!okDisparo)

        //Llamamos a la función dañosEnElBarco y le pasamos el jugador1 y las coordenadas donde ha disparado el jugador2
        dañosEnElBarco(jugador1,[posicionX,posicionY], true);

        //Añadimos las coordenadas del disparo en el array disparos del jugador2
        jugador2.disparos.push([posicionX,posicionY]);

        //Llamamos a la función pintarTablero y le pasamos el jugador1
        pintarTablero(jugador1);

        //Si el jugador1 se queda sin barcos mostramos mensaje
        if (jugador1.barcos.length == 0)
        {
            alert("¡HAS PERDIDO!");
        }
    }

}

//Función para cambiar la posición del barco de horizontal a vertical y viceversa
function cambiarPosicion(nuevaPosicion)
{
    posicion = nuevaPosicion;
}


//Creamos función para comprobar el disparo
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
module.exports.comprobarDisparo = comprobarDisparo;