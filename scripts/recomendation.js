document.getElementById("recomendations").addEventListener("click", makeRecomendations)

// Consume una Api Local para ofrecer la informacion almacenada en un Doc .json y recorre la información plasmandola
// en una lista
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