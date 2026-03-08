document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Отмена стандартной отправки

        document.querySelectorAll('.error-msg').forEach(el => el.remove());
        document.querySelectorAll('.form-control').forEach(el => el.style.borderColor = '#e2e8f0');

        let isValid = true;

        // 1. Проверка ФИО 
        const fullname = document.getElementById('fullname');
        const nameWords = fullname.value.trim().split(/\s+/).filter(word => word.length > 0);
        if (nameWords.length < 2) {
            showError(fullname, 'Введите фамилию и имя');
            isValid = false;
        }

        // 2. Проверка телефона 
        const phone = document.getElementById('phone');
        const digits = phone.value.replace(/\D/g, '');
        if (digits.length < 10) {
            showError(phone, 'Введите минимум 10 цифр номера');
            isValid = false;
        }

        // 3. Проверка Email
        const email = document.getElementById('email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value.trim())) {
            showError(email, 'Неверный формат email');
            isValid = false;
        }

        if (isValid) {
            const formData = {
                fullname: fullname.value,
                phone: phone.value,
                email: email.value,
                message: document.getElementById('message').value || '(нет сообщения)'
            };

            const eventValid = new CustomEvent('formValid', { detail: formData });
            document.dispatchEvent(eventValid);
            
            alert('Форма успешно прошла валидацию!');
            form.reset();
        }
    });

    function showError(input, message) {
        input.style.borderColor = '#ff4d4d';
        const error = document.createElement('p');
        error.className = 'error-msg';
        error.style.color = '#ff4d4d';
        error.style.fontSize = '0.85rem';
        error.style.marginTop = '0.2rem';
        error.textContent = message;
        input.parentNode.appendChild(error);
    }
});