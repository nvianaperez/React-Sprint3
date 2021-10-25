/*

* minlenght attribute in html5 does not provide any feedback, so you can write js code
* Validación de HTML5 pattern="/^[A-Z]+$/i" and title="alphabet only case-insensitive", 
or through regular expression, donde:
^...$ indica que el patrón debe coincidir exactamente con los caracteres dentro de los corchetes,
[A-Z] indica que los caracteres admitidos son letras del alfabeto (minusc y mayusc),
+ indica que los caracteres dentro de los corchetes se pueden repetir,
i indica que validaremos letras mayúsculas y minúsculas (case-insensitive)
Example:
<input class="ml-3 phone input rounded p-2" type="tel" placeholder="Phone No." id="phone" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}">
*
*/

// Get the input fields
var formulario = document.getElementById('formulario'); // acceder al formulario completo
var inputs = document.querySelectorAll('#formulario input'); // acceder a todos los elementos (array inputs) con class formulario y element input

var firstName = document.getElementById('firstName').value; // obtener el valor del id="firstName"
var lastName = document.getElementById('lastName').value;
var email = document.getElementById('email').value;
var address = document.getElementById('address').value;
var password = document.getElementById('password').value;
var phone = document.getElementById('phone').value;

// Get the error elements
var errorFirstName = document.getElementById('errorFirstName');
var errorLastName = document.getElementById('errorLastName');
var errorPassword = document.getElementById('errorPassword');
var errorPhone = document.getElementById('errorPhone');
var errorEmail = document.getElementById('errorEmail');

var expresionesRegulares = {
    nombre: /^[a-zA-Z]+$/, // alphabet only case-insensitive.
    telefono: /^\d{9,14}$/, // only numbers.
    password: /^[a-zA-Z0-9]{3,14}$/, // only alphabet and numbers.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

var campos = {
    firstName: false,
    lastName: false,
    password: false,
    email: false,
    address: false,
    phone: false,
}

var validarFormulario = (e) => {
    switch (e.target.name) {
        case 'firstName':
            checkCampo(expresionesRegulares.nombre, e.target, 'firstName', 'errorFirstName');
            checkComplete(e.target, 'firstName', 'errorCompleteFirstName');
            break;
        case 'lastName':
            checkCampo(expresionesRegulares.nombre, e.target, 'lastName', 'errorLastName');
            checkComplete(e.target, 'lastName', 'errorCompleteLastName');
            break;
        case 'password':
            checkCampo(expresionesRegulares.password, e.target, 'password', 'errorPassword');
            checkComplete(e.target, 'password', 'errorCompletePassword');
            break;
        case 'email':
            checkCampo(expresionesRegulares.correo, e.target, 'email', 'errorEmail');
            checkComplete(e.target, 'email', 'errorCompleteEmail');
            break;
        case 'phone':
            checkCampo(expresionesRegulares.telefono, e.target, 'phone', 'errorPhone');
            checkComplete(e.target, 'phone', 'errorCompletePhone');
            break;
        default:
            checkComplete(e.target, 'address', 'errorCompleteAddress');
    }
}

var checkCampo = (expresion, input, campo, error1) => {
    if (expresion.test(input.value)) {
        document.getElementById(`${campo}`).classList.add('formulario_input-validate');
        document.getElementById(`${campo}`).classList.remove('formulario_input-noValidate');
        document.getElementById(`${error1}`).style.display = "none";
        // document.querySelector(`${campo} p`).style.display="none";
    } else {
        document.getElementById(`${campo}`).classList.add('formulario_input-noValidate');
        document.getElementById(`${error1}`).style.display = "block";
        // document.querySelector(`${campo} p`).style.display="block";
    }
}

var checkComplete = (input, campo, error2) => {
    if (input.value != " " && input.value.indexOf(" ") == -1 && input.value.lenght >= 3) {
        document.getElementById(`${campo}`).classList.add('formulario_input-validate');
        document.getElementById(`${campo}`).classList.remove('formulario_input-noValidate');
        document.getElementById(`${error2}`).style.display = "none";        
    } else {
        document.getElementById(`${campo}`).classList.add('formulario_input-noValidate');
        document.getElementById(`${error2}`).style.display = "block";
    }
}


inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});
/*por cada input añade un eventListener: cuando levanto la tecla y cuando clico fuera del formulario, 
se ejecuta la función validarFormulario*/

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
});
/*cuando presiono boton que es type submit --> se llama a una función tipo arrow
en la función evento se pasa por parámetro y se ejecuta preventDefault()
preventDefault() no guarda nada, la página no cambia*/


/*
    // Validate var phone
    phone = parseInt(phone); //intento convertir a entero el input de la var phone. Si lo consigue, ya está. Si no lo consigue devuelve NaN
    //Compruebo si es un valor numérico
    if (isNaN(phone) || phone.toString().length < 3) {
        //entonces (no es numero) y devuelve mensaje de error
        return alert(errorPhone);
    } else {
        //En caso contrario (Si era un número) devuelvo el valor
        return phone;
    }
    // .length solo lee strings
    // typeof phone !== number --> usuario puede entrar números entre comillas..
*/

