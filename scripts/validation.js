// validation.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    if (!form) return;

    // Функция показа ошибки
    function showError(inputId, message) {
        const input = document.getElementById(inputId);
        const errorDiv = document.getElementById(inputId + 'Error');
        const errorSpan = errorDiv.querySelector('span');
        
        input.classList.add('is-invalid');
        errorSpan.textContent = message;
        errorDiv.style.display = 'flex';
    }

    // Функция скрытия ошибки
    function hideError(inputId) {
        const input = document.getElementById(inputId);
        const errorDiv = document.getElementById(inputId + 'Error');
        
        input.classList.remove('is-invalid');
        errorDiv.style.display = 'none';
    }

    // Валидация ФИО
    function validateFullname() {
        const fullname = document.getElementById('fullname');
        const value = fullname.value.trim();
        
        if (value === '') {
            showError('fullname', 'Введите фамилию, имя и отчество');
            return false;
        }
        
        const words = value.split(' ').filter(word => word.length > 0);
        if (words.length < 2) {
            showError('fullname', 'Введите минимум фамилию и имя');
            return false;
        }
        
        if (words.length > 3) {
            showError('fullname', 'Введите фамилию, имя и отчество (макс. 3 слова)');
            return false;
        }
        
        hideError('fullname');
        return true;
    }

    // Валидация телефона
    function validatePhone() {
        const phone = document.getElementById('phone');
        const value = phone.value.trim();
        
        if (value === '') {
            showError('phone', 'Введите номер телефона');
            return false;
        }
        
        // Оставляем только цифры
        const digits = value.replace(/\D/g, '');
        
        if (digits.length < 10) {
            showError('phone', 'Введите 10 цифр номера');
            return false;
        }
        
        if (digits.length > 11) {
            showError('phone', 'Номер телефона слишком длинный');
            return false;
        }
        
        hideError('phone');
        return true;
    }

    // Валидация email
    function validateEmail() {
        const email = document.getElementById('email');
        const value = email.value.trim();
        
        if (value === '') {
            showError('email', 'Введите email адрес');
            return false;
        }
        
        // Простая проверка формата email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            showError('email', 'Введите корректный email (например: name@domain.ru)');
            return false;
        }
        
        hideError('email');
        return true;
    }

    // Валидация сообщения (опционально, но проверяем длину)
    function validateMessage() {
        const message = document.getElementById('message');
        const value = message.value.trim();
        
        if (value.length > 500) {
            showError('message', 'Сообщение не должно превышать 500 символов');
            return false;
        }
        
        hideError('message');
        return true;
    }

    // Валидация согласия
    function validateAgreement() {
        const agreement = document.getElementById('agreement');
        
        if (!agreement.checked) {
            document.getElementById('agreementError').style.display = 'flex';
            return false;
        }
        
        document.getElementById('agreementError').style.display = 'none';
        return true;
    }

    // Обработчик отправки формы
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Запускаем все проверки
        const isFullnameValid = validateFullname();
        const isPhoneValid = validatePhone();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        const isAgreementValid = validateAgreement();
        
        // Если всё корректно
        if (isFullnameValid && isPhoneValid && isEmailValid && isMessageValid && isAgreementValid) {
            // Собираем данные формы
            const formData = {
                fullname: document.getElementById('fullname').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                email: document.getElementById('email').value.trim(),
                message: document.getElementById('message').value.trim() || '(не заполнено)',
                timestamp: new Date().toLocaleString()
            };
            
            // Создаем и отправляем кастомное событие
            const event = new CustomEvent('formValid', { detail: formData });
            document.dispatchEvent(event);
            
            // Показываем уведомление
            alert('✅ Форма успешно отправлена! Данные в консоли (F12).');
        } else {
            // Прокручиваем к первому полю с ошибкой
            const firstError = document.querySelector('.is-invalid');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    // Очистка ошибок при вводе
    document.getElementById('fullname').addEventListener('input', function() {
        hideError('fullname');
    });
    
    document.getElementById('phone').addEventListener('input', function() {
        hideError('phone');
        // Автоматически форматируем телефон (простой вариант)
        let value = this.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 10) {
                this.value = value.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');
            }
        }
    });
    
    document.getElementById('email').addEventListener('input', function() {
        hideError('email');
    });
    
    document.getElementById('message').addEventListener('input', function() {
        hideError('message');
    });
    
    document.getElementById('agreement').addEventListener('change', function() {
        if (this.checked) {
            document.getElementById('agreementError').style.display = 'none';
        }
    });
});