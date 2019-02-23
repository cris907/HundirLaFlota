
    // 0 Agua
    // 1 Barco
    // 2 Disparo al agua
    // 3 Disparo al barco
    // 4 Casilla oculta enemigo

function pintarTablero (jugador, esMaquina = false) {
    var barco, div;

    if (esMaquina)
    {
        div = document.getElementById("jugador2");
        actualizarTablero(jugador2, jugador1);
    }
    else
    {
        div = document.getElementById("jugador1");
        actualizarTablero(jugador1, jugador2);
    }

    div.innerHTML = "";
    
    for (var i = 0; i < jugador.tablero.length; i++) {
        for (var j = 0; j < jugador.tablero[i].length; j++) {

            var casillaNode = document.createElement("DIV");

            if(esMaquina)
            {
                casillaNode.setAttribute("onClick", "disparar("+j+","+i+")");
            }
            else
            {
                casillaNode.setAttribute("onClick", "coordenadasBarco("+j+","+i+")");
            }

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

function actualizarTablero (jugador1, jugador2)
{
    jugador2.disparos.forEach(disparo => {
        var elemento = jugador1.tablero[disparo[1]][disparo[0]];

        if (elemento == 0) 
        {
            jugador1.tablero[disparo[1]][disparo[0]] = 2;
        }
        else if (elemento == 1)
        {
            jugador1.tablero[disparo[1]][disparo[0]] = 3;
        }
    });
}


module.exports.pintarTablero = pintarTablero;