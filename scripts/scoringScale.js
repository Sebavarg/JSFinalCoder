document.querySelector(".btnGetScoringScale").addEventListener("click", scaleHandler);

//toma el puntaje maximo de un examen y genera una escala del uno al diez
function scaleHandler(e) {
    e.preventDefault();
    let puntajeTotal = document.getElementById("score").value;
    let notaMin = (puntajeTotal * 0.5) / 10;
    let notaMax = (puntajeTotal * 1.5) / 10;
    let resultado;
    let listaResultado = [];

    for (let i = 1; i < 11; i++) {
        notaMin = (puntajeTotal * (i - 0.5)) / 10;
        notaMin = notaMin.toFixed(1);
        if (i == 1) {
            notaMin = 0;
        }
        notaMax = ((puntajeTotal * (i + 0.5)) / 10) - 0.1;
        notaMax = notaMax.toFixed(1);
        if (i == 10) {
            notaMax = puntajeTotal;
        }
        resultado = "  La nota " + i + " es desde " + notaMin + " puntos hasta " + notaMax + " puntos ";
        listaResultado.push(resultado);
    }
    let containerScoringScale = document.getElementById("containerScoringScale");
    containerScoringScale.innerHTML = `<hr> 
    <p> ${listaResultado.join("<hr>  ")}</p> `;
    swal("Escala Creada!", "A continuación puede ver una lista con la escala de notas del 1 al 10 tomando como base el puntaje ingresado", "success")

}