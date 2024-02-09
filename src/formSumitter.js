const message = document.getElementById('status_submit');

export const FormSubmitter = {
    submitForm: function(formId, url) {
        const form = document.getElementById(formId);
        if (form && !form.dataset.submitted) {
            form.dataset.submitted = true; 
            const formData = new FormData(form);
            fetch(url, {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        form.reset();
                        alert(data.message);
                        message.innerText = data.message;
                        message.style.color = 'green';
                        alert(JSON.stringify(this.formDataToJson(formData), null, 2))
                    } else {
                        alert("Ошибка при отправке данных: " + data.message)
                        message.innerText = data.message;
                        message.style.color = 'red';
                    }
                })
                .catch(error => {
                    console.error('Ошибка при отправке формы:', error);
                })
                .finally(() => delete form.dataset.submitted);
            ;
        }
    },

    formDataToJson: function(formData) {
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        return data;
    }
};
