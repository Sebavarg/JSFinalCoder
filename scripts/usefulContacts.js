class Contact {
    constructor(contactName, contactPhone, contactMail) {
        this.contactName = contactName;
        this.contactPhone = contactPhone;
        this.contactMail = contactMail;
    }
}

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
document.getElementById("form-contact").addEventListener("submit", handlerAddContact);

function handlerAddContact(e) {
    e.preventDefault();

    const formulario = new FormData(e.target);
    const contactName = formulario.get("contactName");
    const contactPhone = formulario.get("contactPhone");
    const contactMail = formulario.get("contactMail");

    const contact = new Contact(contactName, contactPhone, contactMail);

    addContact(contact)
    e.target.reset();
}

function addContact(contact) {
    contacts.push(contact)
    localStorage.setItem("contacts", JSON.stringify(contacts));
    showContacts();
}

function showContacts() {
    let contactsList = document.getElementById("contactsList");
    contactsList.innerHTML = "";

    contacts.forEach(({ contactName, contactPhone, contactMail }) => {
        let li = document.createElement("li");
        li.innerHTML = `
      <hr> 
      ${contactName} - 
      ${"telefono: "+ contactPhone && contactPhone + " -"}
      ${"email: " + contactMail && contactMail + " - "}`;

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Borrar";
        deleteBtn.classList.add("btn", "btn-danger");

        deleteBtn.addEventListener("click", () => {
            deleteContact(contactName);
        })
        li.appendChild(deleteBtn);

        contactsList.appendChild(li);
    });
}

function deleteContact(contactName) {
    swal({
            title: "¿Estas Seguro de Eliminar?",
            text: "Perderás tu contacto",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                contacts = contacts.filter(item => item.contactName != contactName);
                localStorage.setItem("contacts", JSON.stringify(contacts))
                swal(" Contacto Eliminado", {
                    icon: "success",
                });
            } else {
                swal(" Contacto NO eliminado");
            }
        });
}

showContacts();