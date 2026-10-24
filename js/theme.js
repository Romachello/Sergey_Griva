// Переключатель тем
(function() {
   const toggleBtn = document.getElementById('themeToggle');
   const sunIcon = toggleBtn.querySelector('.fa-sun');
   const moonIcon = toggleBtn.querySelector('.fa-moon');
   const body = document.body;

   // При загрузке проверяем сохранённую тему
   const savedTheme = localStorage.getItem('theme');
   if (savedTheme === 'light') {
       body.classList.add('light-theme');
       sunIcon.style.display = 'none';
       moonIcon.style.display = 'inline-block';
   }

   toggleBtn.addEventListener('click', () => {
       if (body.classList.contains('light-theme')) {
           // Переключаем на тёмную
           body.classList.remove('light-theme');
           localStorage.setItem('theme', 'dark');
           sunIcon.style.display = 'inline-block';
           moonIcon.style.display = 'none';
       } else {
           // Переключаем на светлую
           body.classList.add('light-theme');
           localStorage.setItem('theme', 'light');
           sunIcon.style.display = 'none';
           moonIcon.style.display = 'inline-block';
       }
   });
})();