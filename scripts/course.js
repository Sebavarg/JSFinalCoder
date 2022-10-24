const userInfo = JSON.parse(localStorage.getItem('userInfo'));
//Genera una bienvenida personalizada y llama a la funcion que va a usar los Datos recibidos en el Local Storage
function createWelcome() {
    const header = document.querySelector('.mainCourse');
    const title = document.createElement('h2');
    title.classList.add("bienvenida");
    const text = document.createTextNode(`Bienvenido usuario: ${userInfo.userName} al curso: ${userInfo.courseName} `)
    title.appendChild(text);
    header.insertBefore(title, header.childNodes[0]);
    userInfoHandler();
}
createWelcome();

function Student(studentName, studentLastName, studentScore) {
    this.studentName = studentName;
    this.studentLastName = studentLastName;
    this.studentScore = studentScore;
}

//recibe la informacion del nombre del curso y revisa si ya hay un curso guardado en el Local Storage y llama al Creador de Estudiantes
function userInfoHandler() {
    const studentsList = document.getElementById("studentsList");
    const students = JSON.parse(localStorage.getItem(userInfo.courseName));

    if (students == null) {
        studentsList.innerHTML = "<h4> Aun no has añadido estudiantes al curso</h4>"
    } else {
        showStudents(students);
    }
    createCourse();
}

// Genera el form para agregar los estudiantes al curso.
function createCourse() {
    const courseAdd = document.getElementById("courseAdded");

    courseAdd.innerHTML = `<h3>Usuario: ${userInfo.userName} Curso: ${userInfo.courseName}</h3>
    <form id="form-add-student">
      <input type="text" id="studentName" placeholder="Nombre alumno" >
      <input type="text" id="studentLastName" placeholder="Apellido alumno">
      <input type="number" id="studentScore" placeholder="Nota " > 
      <button type="submit" id="boton">Agregar estudiante a la lista</button>
    </form>`;

    document.getElementById('form-add-student').addEventListener('submit', addStudents);
}

//agrega los estudiantes tomando los datos aportados en el form

function addStudents(e) {
    e.preventDefault();
    const studentName = document.getElementById("studentName").value;
    const studentLastName = document.getElementById("studentLastName").value;
    const studentScore = document.getElementById("studentScore").value;

    const student = new Student(studentName, studentLastName, studentScore);


    const studentsSavedStorage = JSON.parse(localStorage.getItem(userInfo.courseName));

    if (nameValidation(student) && scoreValidation(student)) {
        swal("Bien hecho!", "Estudiante Agregado", "success")
        if (studentsSavedStorage == null) {
            localStorage.setItem(userInfo.courseName, JSON.stringify([student]));
            showStudents([student]);
        } else {
            studentsSavedStorage.push(student);
            localStorage.setItem(userInfo.courseName, JSON.stringify(studentsSavedStorage));
            showStudents(studentsSavedStorage);
        }
        e.target.reset();
    }
}

//valida el nombre ingresado
function nameValidation(student) {
    if (student.studentName == "" || student.studentLastName == "") {
        swal("!", "Estudiante no creado correctamente, nombre o apellido vacío", "error")
        return false;
    } else {
        return true;
    }
}

//valida la nota ingresada
function scoreValidation({ studentScore }) {
    if (studentScore <= 0 || studentScore >= 11) {
        swal("!", "Puntaje incorrecto, Ingrese un numero entre 1 y 10", "error")
        return false;
    } else {
        return true;
    }
}



//muestra la lista de estudiantes ingresados
function showStudents(students) {
    let studentsList = document.getElementById('studentsList')
    studentsList.innerHTML = '';

    students.forEach(student => {
        let li = document.createElement('li');
        li.innerHTML = `<i class="bi bi-person-square"></i>
        Estudiante Nombre: ${student.studentName} - ${student.studentLastName} - Nota:
        ${student.studentScore}     `;
        const deleteBtn = deleteBtncreation(student);
        li.appendChild(deleteBtn);
        studentsList.appendChild(li);
    })
}
//Crea el boton borrar estudiante de forma personalizada, confirmando si esta seguro de borrar estudiante.
//Devuelve Boton de Borrado
function deleteBtncreation(student) {
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = "Borrar Estudiante";
    let deletedStudent = student.studentName + ' ' + student.studentLastName;
    deleteBtn.addEventListener('click', () => {
        deleteStudent(student);
        swal({
                title: "¿Estas Seguro de Eliminar?",
                text: "Eliminarás a " + deletedStudent,
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    swal(deletedStudent + " Eliminado del cuso", {
                        icon: "success",
                    });
                } else {
                    swal("Estudiante NO eliminado");
                }
            });
    });
    return deleteBtn;
}

//Recibe estudiante a Borrar, lo elimina del curso a traves de un filter generando un nuevo array sin el estudiante filtrado 
//Muestra el nuevo Array sin el estudiante eliminado, llamando a la funcion ShowStudents
function deleteStudent(student) {
    const studentsSavedStorage = JSON.parse(localStorage.getItem(userInfo.courseName));
    const newArray = studentsSavedStorage.filter(item => item.studentName != student.studentName);
    localStorage.setItem(userInfo.courseName, JSON.stringify(newArray));
    showStudents(newArray);
}