document.getElementById("recomendations").addEventListener("click", makeRecomendations)

async function makeRecomendations() {
    const response = await
    fetch('../scripts/data.json');
    const data = await response.json();
    console.log(data);

    data.forEach((contact) => {
        const containerRecomendations = document.querySelector("#containerRecomendations");
        const li = document.createElement("li")
        li.innerHTML = ` <p><b>${contact.name}</b> - Teléfono: ${contact.phone} - Email: ${contact.mail} </p> `
        containerRecomendations.append(li);
    })
}