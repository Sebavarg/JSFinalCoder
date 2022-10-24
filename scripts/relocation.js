//redirección  index a página scoringScale.html
const calculadoraNotas = document.getElementById("calculadoraNotas");
calculadoraNotas.addEventListener("click", () => {
    window.location.href = 'scoringScale.html';
});

//redirección index a página usefulContacts.html 
const paginasInteres = document.getElementById("contactosUtiles");
paginasInteres.onclick = () => {
    window.location.href = 'usefulContacts.html';
};