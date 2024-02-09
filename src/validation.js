import { FormSubmitter } from "./formSumitter";

const FormValidator = {
    init: function(formId) {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', this.validateForm.bind(this));
            form.querySelectorAll('input, textarea').forEach(field => {
                field.addEventListener('input', this.removeError.bind(this, field));
            });
        }
    },

    validateForm: function(event) {
        event.preventDefault();
        const form = event.target;
        let isValid = true;
        form.querySelectorAll('input, textarea').forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        if (isValid) {
            FormSubmitter.submitForm('form', 'http://localhost:9090/api/registration');
        }
    },

    validateField: function(field) {
        let isValid = true;

        if (!field.value.trim()) {
            isValid = false;
            this.setError(field, 'Поле не заполнено');
        } else {
            this.removeError(field);
            
            if (field.getAttribute('id') === 'email' && !this.validateEmail(field.value)) {
                isValid = false;
                this.setError(field, 'Введите корректный адрес электронной почты');
            }
        }

        return isValid;
    },

    validateEmail: function(email) {
        const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return validateEmail.test(email);
    },

    setError: function(field, errorMessage) {
        field.classList.add('error-message');
        const errorElementId = field.getAttribute('id') + '-error';
        const errorElement = document.getElementById(errorElementId);
        if (errorElement) {
            errorElement.textContent = errorMessage;
        }
        field.parentNode.classList.add('error-message');
    },

    removeError: function(field) {
        if (field.value.trim()) {
            field.classList.remove('error-message');
            const errorElementId = field.getAttribute('id') + '-error';
            const errorElement = document.getElementById(errorElementId);
            if (errorElement) {
                errorElement.textContent = '';
            }

            field.parentNode.classList.remove('error-message');
        }
    }
};

FormValidator.init('form');