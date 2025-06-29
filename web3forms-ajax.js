// Enhanced Web3Forms Integration with AJAX
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault(); // Prevenir envío normal del formulario
            
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Validar campos obligatorios
            if (!validateForm()) {
                return;
            }
            
            // Mostrar estado de carga
            showLoadingState(submitButton, originalText);
            
            try {
                // Enviar formulario con AJAX
                const formData = new FormData(form);
                
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                if (response.ok) {
                    const result = await response.text();
                    showSuccessMessage();
                    form.reset(); // Limpiar formulario
                    clearAllErrors();
                } else {
                    throw new Error('Error en el envío');
                }
                
            } catch (error) {
                console.error('Error:', error);
                showErrorMessage('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.');
            } finally {
                // Restaurar botón
                resetButton(submitButton, originalText);
            }
        });
    }
});

function validateForm() {
    const form = document.getElementById('contact-form');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        clearFieldError(field);
        
        if (!field.value.trim()) {
            isValid = false;
            showFieldError(field, 'Este campo es obligatorio');
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
            isValid = false;
            showFieldError(field, 'Por favor, ingresa un email válido');
        }
    });
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(field, message) {
    field.style.borderColor = '#dc2626';
    field.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
    
    const errorDiv = document.getElementById(field.name + '-error') || 
                    document.getElementById(field.id + '-error');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
}

function clearFieldError(field) {
    field.style.borderColor = '';
    field.style.boxShadow = '';
    
    const errorDiv = document.getElementById(field.name + '-error') || 
                    document.getElementById(field.id + '-error');
    if (errorDiv) {
        errorDiv.textContent = '';
        errorDiv.style.display = 'none';
    }
}

function clearAllErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
    
    const fields = document.querySelectorAll('.form-control');
    fields.forEach(field => {
        field.style.borderColor = '';
        field.style.boxShadow = '';
    });
}

function showLoadingState(button, originalText) {
    button.textContent = 'Enviando...';
    button.disabled = true;
    button.classList.add('loading');
}

function resetButton(button, originalText) {
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        button.classList.remove('loading');
    }, 1000);
}

function showSuccessMessage() {
    // Remover mensaje anterior si existe
    removeMessage();
    
    const form = document.getElementById('contact-form');
    const message = document.createElement('div');
    message.className = 'form-message form-message--success';
    message.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; justify-content: center;">
            <span style="font-size: 1.5em;">✅</span>
            <div>
                <strong>¡Mensaje enviado exitosamente!</strong><br>
                <span style="font-size: 0.9em;">Te contactaré dentro de las próximas 24 horas.</span>
            </div>
        </div>
    `;
    
    form.appendChild(message);
    
    // Scroll al mensaje
    message.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Auto-remover después de 8 segundos
    setTimeout(removeMessage, 8000);
}

function showErrorMessage(text) {
    // Remover mensaje anterior si existe
    removeMessage();
    
    const form = document.getElementById('contact-form');
    const message = document.createElement('div');
    message.className = 'form-message form-message--error';
    message.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; justify-content: center;">
            <span style="font-size: 1.5em;">❌</span>
            <div>
                <strong>Error al enviar</strong><br>
                <span style="font-size: 0.9em;">${text}</span>
            </div>
        </div>
    `;
    
    form.appendChild(message);
    
    // Scroll al mensaje
    message.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Auto-remover después de 6 segundos
    setTimeout(removeMessage, 6000);
}

function removeMessage() {
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
}

// Opcional: Validación en tiempo real
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.form-control');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                showFieldError(this, 'Este campo es obligatorio');
            } else if (this.type === 'email' && this.value && !isValidEmail(this.value)) {
                showFieldError(this, 'Por favor, ingresa un email válido');
            } else {
                clearFieldError(this);
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                clearFieldError(this);
            }
        });
    });
});
