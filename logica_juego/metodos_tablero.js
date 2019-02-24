
    // 0 Agua
    // 1 Barco
    // 2 Disparo al agua
    // 3 Disparo al barco
    // 4 Casilla oculta enemigo

//Creamos función para pintar el tablero
function pintarTablero (jugador, esMaquina = false) {
    var barco, div;

    //Si es maquina
    if (esMaquina)
    {
        //Seleccionamos el div del jugador2
        div = document.getElementById("jugador2");
        //Llamamos a la función actulizar tablero, para actualizar el tablero del jugador2
        actualizarTablero(jugador2, jugador1);
    }
    //Si no es maquina
    else
    {
        ////Seleccionamos el div del jugador1
        div = document.getElementById("jugador1");
        //Llamamos a la función actulizar tablero, para actualizar el tablero del jugador1
        actualizarTablero(jugador1, jugador2);
    }

    div.innerHTML = "";
    
    //Recorremos el array tablero
    for (var i = 0; i < jugador.tablero.length; i++) {
        for (var j = 0; j < jugador.tablero[i].length; j++) {

            //Creamos las casillas del tablero con el elemento div
            var casillaNode = document.createElement("DIV");

            if(esMaquina)
            {
                //Si es el tablero enemigo creamos un evento click en las casillas que llama a la función disparar
                casillaNode.setAttribute("onClick", "disparar("+j+","+i+")");
            }
            else
            {
                //Si es el tablero usuario creamos un evento click en las casillas que llama a la función coordenadasBarco
                casillaNode.setAttribute("onClick", "coordenadasBarco("+j+","+i+")");
            }

            //Comprobamos el valor que tiene asigando cada casilla y dependiendo del valor
            // asignamos un un atributo clase para darle un color y forma a las casillas
            var valorCasilla = jugador.tablero[i][j];

            if(valorCasilla == 0 || valorCasilla == 4 || (valorCasilla == 1 && esMaquina)){
                casillaNode.setAttribute("class", "blanco casilla");
            }
            else if(valorCasilla == 1){
                casillaNode.setAttribute("class", "gris casilla");
            }
            else if(valorCasilla == 2){
                casillaNode.setAttribute("class", "azul casilla");
            }
            else if(valorCasilla == 3){
                casillaNode.setAttribute("class", "rojo casilla");
            }

            div.appendChild(casillaNode);
        }
        div.innerHTML += "<br>";
    }
}

//Creamos función para actualizar el tablero de un jugador respecto el otro
function actualizarTablero (jugador1, jugador2)
{
    //Recorremos el array disparos del jugador2 para actualizar los disparos en el tablero del jugador1
    jugador2.disparos.forEach(disparo => {
    
        var elemento = jugador1.tablero[disparo[1]][disparo[0]];
        
        //Si el disparo es en el agua
        if (elemento == 0) 
        {
            //Asignamos 2 al disparo al agua
            jugador1.tablero[disparo[1]][disparo[0]] = 2;
        }
        //Si el disparo es en el barco
        else if (elemento == 1)
        {
            //Asignamos 3 al disparo al barco
            jugador1.tablero[disparo[1]][disparo[0]] = 3;
        }
    });
}


module.exports.pintarTablero = pintarTablero;