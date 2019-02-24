//Tamaño máximo tablero
const TAMAÑO_MAX = 10;
//Array que contiene los barcos
const BARCOS = [4, 3, 2, 2, 1];

//Creamos la clase Barco
class Barco
{
    //Método constructor para crear e inicializar un objeto creado a partir de la clase Barco
    // con los atributos localizaciones, daños y tamaño
    constructor(localizaciones, daños, tamaño)
    {
        this.localizaciones = localizaciones;
        this.daños = daños;
        this.tamaño = tamaño;
    }
}

//Creamos la función comprobarBarco y le pasamos el jugador y las coordenadas
function comprobarBarco (jugador, coordenadas) {
    var barcoEncontrado, barco;
    
    //Recorremos el array de barcos
    for (var i = 0; i < jugador.barcos.length; i++) {
        barco = jugador.barcos[i];
        
        barcoEncontrado = barco.localizaciones.filter(
               function (coordenadaActual) {
            return (coordenadaActual[0] === coordenadas[0]) && (coordenadaActual[1] === coordenadas[1]);
        })[0];
        
        //Si encuantra barco en las mismas coordenadas devuelve true
        if (barcoEncontrado) 
        {
            return true;
        }
    }
    return false;
}

//Creamos la función dañosEnElBarco y le pasamos el jugador, la coodernadas y esMaquina como false
function dañosEnElBarco (jugador, coordenadas, esMaquina = false) {
    var barco, dañoCoordenada;
    
    //Recorremos el array de barcos
    for (var i = 0; i < jugador.barcos.length; i++) {
        barco = jugador.barcos[i];

        dañoCoordenada = barco.localizaciones.filter(
               function (coordenadaActual) {
            if ((coordenadaActual[0] === coordenadas[0]) && (coordenadaActual[1] === coordenadas[1]))
                {
                    return [coordenadaActual[0],coordenadaActual[1]]
                };
        });

        //Si dañoCoordenada está definido añadimos las coordenadas del daño el en array daños
        if (dañoCoordenada[0] != undefined)
        {
            jugador.barcos[i].daños.push(dañoCoordenada);
        }

        //Si la longitud del array daños del barco es igual a la longitud del array localizaciones del barco y además no esMaquina
        if (barco.daños.length == barco.localizaciones.length && !esMaquina)
        {
            //Mostramos mensaje de barco hundido
            alert("¡HAS HUNDIDO UN BARCO!");
            //Eliminamos el barco hundido del array barcos
            jugador.barcos.splice(i, 1);
        }
    }
}


//Creamos la función para colocar los barcos y le pasamos el jugador y el nuevoBarco
function colocarBarco (jugador, nuevoBarco) {
    var colocar = true;
    
    //Recorremos las coordenadas del nuevo barco
    nuevoBarco.localizaciones.forEach(coordenadaBarco => {
        //Comprobamos que no pueda colocar un barco fuera de los límites del tablero
        if (coordenadaBarco[0] < 0 || coordenadaBarco[0] >= TAMAÑO_MAX ||
            coordenadaBarco[1] < 0 || coordenadaBarco[1] >= TAMAÑO_MAX)
            {
                colocar = false;
            }

            //Recorremos las coordenadas de los barcos
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

    //Si colocar es true
    if (colocar)
    {
        var _numBarcos = jugador.barcos.length;
        //Actualizamos el tablero con el nuevo barco
        nuevoBarco.localizaciones.forEach(coordenada => {
            var x = coordenada[1];
            var y = coordenada[0];
            //Asignamos 1 a las coordenadas donde se coloque el barco
            jugador.tablero[x][y] = 1;
            
        });
        jugador.barcos[_numBarcos] = nuevoBarco;
    }
}


//Creamos función para poder colocar los barcos aleatoriamente y le pasamos el jugador1
function colocarBarcosAleatoriamente(jugador = jugador1) 
{
    //Recorremos el array de los barcos
    for (var i = 0; i<BARCOS.length; i++)
    {
        //Mientras haya barcos
        while(jugador.barcos.length <= i)
        {
            //Creamos variable con nuevo array de localizaciones y variable con el tamaño del barco
            var _arrayLocalizaciones = new Array();
            var _tamañoBarco = BARCOS[i];

            //Creamos variables y les asignamos un numero aleatorio entre 0 y 9
            var posicionX = Math.floor(Math.random()*TAMAÑO_MAX);
            var posicionY = Math.floor(Math.random()*TAMAÑO_MAX);
            
            //Creamos variable con la posición y le asignamos 'Horizontal' si devuelve 0 y 'Vertical' si devuelve 1
            posicion = Math.floor(Math.random()*2) == 0 ? "Horizontal" : "Vertical";
            
            //Recorremos array del tamaño de los barcos
            for(var j=0; j<_tamañoBarco; j++)
            {
                //Si la posición es horizontal, asignamos al array de localizaciones dicha posición
                if(posicion == "Horizontal")
                {
                    _arrayLocalizaciones[j] = [posicionX++, posicionY];
                }
                //Si no, asignamos al array de localizacions una posición vertical
                else
                {
                    _arrayLocalizaciones[j] = [posicionX, posicionY++];
                }
            }
            
            //Creamos objeto barco con las localizacions, el array de daños vacío y el tamaño del barco
            var _barco = new Barco(_arrayLocalizaciones, new Array(), _tamañoBarco);
            //LLamamos a la función para colocar los barcos y le pasamos el jugador y el barco que acabamos de crear
            colocarBarco(jugador, _barco);
        }
    }
    //Llamos a la función para pintar los barcos en el tablero
    pintarTablero(jugador);
}

module.exports.comprobarBarco = comprobarBarco;
module.exports.dañosEnElBarco = dañosEnElBarco;
module.exports.colocarBarco = colocarBarco;
module.exports.colocarBarcosAleatoriamente = colocarBarcosAleatoriamente;
