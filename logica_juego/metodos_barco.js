//Tamaño máximo tablero
const TAMAÑO_MAX = 10;
const BARCOS = [4, 3, 2, 2, 1];

class Barco
{
    constructor(localizaciones, daños, tamaño)
    {
        this.localizaciones = localizaciones;
        this.daños = daños;
        this.tamaño = tamaño;
    }
}

function comprobarBarco (jugador, coordenadas) {
    var barcoEncontrado, barco;
    
    for (var i = 0; i < jugador.barcos.length; i++) {
        barco = jugador.barcos[i];
        
        barcoEncontrado = barco.localizaciones.filter(
               function (coordenadaActual) {
            return (coordenadaActual[0] === coordenadas[0]) && 
                         (coordenadaActual[1] === coordenadas[1]);
        })[0];
        
        if (barcoEncontrado) 
        {
            return true;
        }
    }
    return false;
}

function dañosEnElBarco (jugador, coordenadas, esMaquina = false) {
    var barco, dañoCoordenada;
    
    for (var i = 0; i < jugador.barcos.length; i++) {
        barco = jugador.barcos[i];

        dañoCoordenada = barco.localizaciones.filter(
               function (coordenadaActual) {
            if ((coordenadaActual[0] === coordenadas[0]) && (coordenadaActual[1] === coordenadas[1]))
                {
                    return [coordenadaActual[0],coordenadaActual[1]]
                };
        });

        if (dañoCoordenada[0] != undefined)
        {
            jugador.barcos[i].daños.push(dañoCoordenada);
        }

        if (barco.daños.length == barco.localizaciones.length && !esMaquina)
        {
            alert("¡HAS HUNDIDO UN BARCO!");
            jugador.barcos.splice(i, 1);
        }
    }
}

function colocarBarco (jugador, nuevoBarco) {
    var colocar = true;

    nuevoBarco.localizaciones.forEach(coordenadaBarco => {
        //Comprobamos que se encuentra en los límites del tablero
        if (coordenadaBarco[0] < 0 || coordenadaBarco[0] >= TAMAÑO_MAX ||
            coordenadaBarco[1] < 0 || coordenadaBarco[1] >= TAMAÑO_MAX)
            {
                colocar = false;
            }

            jugador.barcos.forEach(barco => {
                barco.localizaciones.forEach(coordenada => {                        
                //Comprobamos que no pueda colocar un barco en la posicion de otro barco o en las inmediaciones
                if ((coordenadaBarco[0] == coordenada[0] && coordenadaBarco[1] == coordenada[1]) ||
                    (coordenadaBarco[0] == coordenada[0] - 1 && coordenadaBarco[1] == coordenada[1]) ||
                    (coordenadaBarco[0] == coordenada[0] - 1 && coordenadaBarco[1] == coordenada[1] + 1) ||
                    (coordenadaBarco[0] == coordenada[0] && coordenadaBarco[1] == coordenada[1] + 1) ||
                    (coordenadaBarco[0] == coordenada[0] + 1 && coordenadaBarco[1] == coordenada[1] + 1) || 
                    (coordenadaBarco[0] == coordenada[0] + 1 && coordenadaBarco[1] == coordenada[1]) ||
                    (coordenadaBarco[0] == coordenada[0] + 1 && coordenadaBarco[1] == coordenada[1] - 1) ||
                    (coordenadaBarco[0] == coordenada[0] && coordenadaBarco[1] == coordenada[1] - 1) ||
                    (coordenadaBarco[0] == coordenada[0] - 1 && coordenadaBarco[1] == coordenada[1] - 1))
                    {
                        colocar = false;
                    }
            });
        });
    });

    if (colocar)
    {
        var _numBarcos = jugador.barcos.length;
        //Actualizamos el tablero con el nuevo barco
        nuevoBarco.localizaciones.forEach(coordenada => {
            var x = coordenada[1];
            var y = coordenada[0];
            jugador.tablero[x][y] = 1;
            
        });
        jugador.barcos[_numBarcos] = nuevoBarco;
    }
}

function colocarBarcosAleatoriamente(jugador = jugador1) 
{
    for (var i = 0; i<BARCOS.length; i++)
    {
        while(jugador.barcos.length <= i)
        {
            var _arrayLocalizaciones = new Array();
            var _tamañoBarco = BARCOS[i];

            var posicionX = Math.floor(Math.random()*TAMAÑO_MAX);
            var posicionY = Math.floor(Math.random()*TAMAÑO_MAX);

            posicion = Math.floor(Math.random()*2) == 0 ? "Horizontal" : "Vertical";
    
            for(var j=0; j<_tamañoBarco; j++)
            {
                if(posicion == "Horizontal")
                {
                    _arrayLocalizaciones[j] = [posicionX++, posicionY];
                }
                else
                {
                    _arrayLocalizaciones[j] = [posicionX, posicionY++];
                }
            }
            
            var _barco = new Barco(_arrayLocalizaciones, new Array(), _tamañoBarco);
            colocarBarco(jugador, _barco);
        }
    }
    pintarTablero(jugador);
}

module.exports.comprobarBarco = comprobarBarco;
module.exports.dañosEnElBarco = dañosEnElBarco;
module.exports.colocarBarco = colocarBarco;
module.exports.colocarBarcosAleatoriamente = colocarBarcosAleatoriamente;
