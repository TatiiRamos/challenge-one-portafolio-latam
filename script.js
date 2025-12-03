/**
 * ============================================
 * FUNCIONES DE AYUDA (FEEDBACK)
 * Estas deben ir primero para ser accesibles
 * por la función principal.
 * ============================================
 */

/**
 * Muestra el mensaje de error debajo del campo y resalta el campo con la clase 'error'.
 * @param {HTMLElement} inputElement - El campo de entrada que falló.
 * @param {string} mensaje - El texto del error a mostrar.
 */
function mostrarError(inputElement, mensaje) {
    // Buscamos el span de error asociado (ej: error-nombre)
    const errorSpan = document.getElementById(`error-${inputElement.id}`);
    if (errorSpan) {
        errorSpan.textContent = mensaje;
        // Agregamos la clase 'error' para el estilo visual (borde rojo)
        inputElement.classList.add('error'); 
    }
}

/**
 * Oculta el mensaje de error y limpia el resaltado.
 * @param {HTMLElement} inputElement - El campo de entrada.
 */
function ocultarError(inputElement) {
    const errorSpan = document.getElementById(`error-${inputElement.id}`);
    if (errorSpan) {
        errorSpan.textContent = '';
        inputElement.classList.remove('error'); 
    }
}

/**
 * Muestra un mensaje de éxito en el DOM.
 * Requiere que se haya añadido un div con el id 'feedback-container'
 * en la sección de Contacto del HTML.
 * @param {string} mensaje - El texto de éxito a mostrar.
 */
function mostrarMensajeExito(mensaje) {
    const feedbackContainer = document.getElementById('feedback-container');
    if (feedbackContainer) {
        // Estilo simple para que se vea el feedback
        feedbackContainer.innerHTML = `<div class="mensaje-exito" style="color: green; font-weight: bold; margin-bottom: 15px;">${mensaje}</div>`;
        feedbackContainer.style.display = 'block';
        
        // Limpiar el mensaje después de 5 segundos
        setTimeout(() => {
            ocultarMensajeExito();
        }, 5000);
    } else {
        // Fallback en caso de que el div no exista (usando el alert)
        alert(mensaje);
    }
}

/**
 * Oculta el mensaje de éxito.
 */
function ocultarMensajeExito() {
    const feedbackContainer = document.getElementById('feedback-container');
    if (feedbackContainer) {
        feedbackContainer.innerHTML = '';
        feedbackContainer.style.display = 'none';
    }
}


/**
 * ============================================
 * FUNCIÓN PRINCIPAL (LÓGICA)
 * ============================================
 */

/**
 * Función principal para validar el formulario de contacto.
 * Esta función es llamada por el atributo 'onsubmit="validarFormulario(event)"' del formulario en index.html.
 * @param {Event} event - El evento de envío (submit) del formulario.
 */
function validarFormulario(event) {
    // 1. Inicialización: Asumimos que el formulario es válido al inicio.
    let esValido = true;
    ocultarMensajeExito(); // Limpia cualquier mensaje anterior de éxito.

    // 2. Obtener los elementos del DOM (usando los IDs que agregaste al HTML)
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const mensaje = document.getElementById('mensaje');

    // ------------------------------------------
    // VALIDACIÓN 1: Campo Nombre (Obligatorio y longitud)
    // ------------------------------------------
    if (nombre.value.trim() === '') {
        mostrarError(nombre, 'El nombre no puede estar vacío.');
        esValido = false;
    } else if (nombre.value.length > 50) {
        mostrarError(nombre, 'El nombre es demasiado largo (máximo 50 caracteres).');
        esValido = false;
    } else {
        ocultarError(nombre);
    }

    // ------------------------------------------
    // VALIDACIÓN 2: Campo Email (Obligatorio y formato)
    // ------------------------------------------
    // Expresión regular para verificar el formato básico del email (ej: usuario@dominio.com)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === '') {
        mostrarError(email, 'El correo electrónico no puede estar vacío.');
        esValido = false;
    } else if (!emailRegex.test(email.value)) {
        mostrarError(email, 'Por favor, ingrese un formato de correo válido (ej: tati@ejemplo.com).');
        esValido = false;
    } else {
        ocultarError(email);
    }

    // ------------------------------------------
    // VALIDACIÓN 3: Campo Mensaje (Obligatorio y longitud)
    // ------------------------------------------
    if (mensaje.value.trim() === '') {
        mostrarError(mensaje, 'El mensaje no puede estar vacío.');
        esValido = false;
    } else if (mensaje.value.length > 300) {
        mostrarError(mensaje, 'El mensaje es demasiado largo (máximo 300 caracteres).');
        esValido = false;
    } else {
        ocultarError(mensaje);
    }

    // ------------------------------------------
    // CONTROL DEL ENVÍO (Lógica de Prueba)
    // ------------------------------------------
    if (esValido) {
        // Si todo es válido: muestra el mensaje de éxito y limpia el formulario.
        mostrarMensajeExito('¡Mensaje enviado con éxito! Gracias por contactarme.');
        
        // Usamos el querySelector, ya que es el que tenías originalmente
        // Si tienes el ID "form-contacto" en tu HTML, usa document.getElementById('form-contacto').reset();
        document.querySelector('.contacto__formulario').reset(); 
        
        // Opcional: Reenfoca al formulario para ver el mensaje.
        document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Si no es válido, el event.preventDefault() no se ejecutó, 
    // pero no importa, porque el navegador solo intenta enviar si esVálido es true 
    // y el event.preventDefault() al inicio falla.

    // Por seguridad, podemos agregar un return false para asegurar el fin del submit
    return false;
}