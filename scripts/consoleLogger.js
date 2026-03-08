// consoleLogger.js
document.addEventListener('DOMContentLoaded', function() {
    // Слушаем кастомное событие formValid
    document.addEventListener('formValid', function(event) {
        // Получаем данные формы
        const data = event.detail;
        
        // Очищаем консоль для наглядности
        console.clear();
        
        // Красивое оформление вывода
        console.log('%c📋 ДАННЫЕ ФОРМЫ ОБРАТНОЙ СВЯЗИ', 'font-size: 16px; font-weight: bold; color: #667eea;');
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #94a3b8');
        
        console.log('%c👤 ФИО:', 'font-weight: bold; color: #3b2b7c;', data.fullname);
        console.log('%c📞 Телефон:', 'font-weight: bold; color: #3b2b7c;', data.phone);
        console.log('%c✉️ Email:', 'font-weight: bold; color: #3b2b7c;', data.email);
        console.log('%c💬 Сообщение:', 'font-weight: bold; color: #3b2b7c;', data.message);
        
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #94a3b8');
        console.log('%c🕒 Время отправки:', 'font-weight: bold; color: #64748b;', data.timestamp);
        
        // Группировка для лучшей читаемости
        console.group('%c📊 Детальная информация', 'font-weight: bold; color: #764ba2;');
        console.table({
            'ФИО': data.fullname,
            'Телефон': data.phone,
            'Email': data.email,
            'Сообщение': data.message,
            'Время': data.timestamp
        });
        console.groupEnd();
        
        console.log('%c✅ Данные успешно получены и обработаны', 'color: #48bb78; font-weight: bold;');
    });
    
    console.log('%c🌐 Страница загружена, ждем отправку формы...', 'color: #667eea;');
});