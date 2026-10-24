document.addEventListener('DOMContentLoaded', function() {
    
   // Логика аккордеона (для кейсов и FAQ)
   const accordions = document.querySelectorAll('.accordion__item');
   
   accordions.forEach(item => {
       const header = item.querySelector('.accordion__header');
       
       header.addEventListener('click', () => {
           // Закрыть все остальные в этом же аккордеоне
           const parent = item.parentElement;
           const siblings = parent.querySelectorAll('.accordion__item');
           
           siblings.forEach(sibling => {
               if (sibling !== item) {
                   sibling.classList.remove('active');
               }
           });
           
           // Переключить текущий
           item.classList.toggle('active');
       });
   });

   // Бургер-меню (мобильная версия)
   const burger = document.getElementById('burger');
   const nav = document.getElementById('nav');
   
   if (burger) {
       burger.addEventListener('click', () => {
           nav.classList.toggle('nav--active');
           if (nav.classList.contains('nav--active')) {
               nav.style.display = 'flex';
               nav.style.flexDirection = 'column';
               nav.style.position = 'absolute';
               nav.style.top = '80px';
               nav.style.left = '0';
               nav.style.width = '100%';
               nav.style.background = '#1a1a1a';
               nav.style.padding = '2rem';
               nav.style.borderBottom = '1px solid #3a3a3a';
           } else {
               nav.style.display = 'none';
           }
       });
   }

   // Плавное изменение шапки при скролле
   const header = document.getElementById('header');
   window.addEventListener('scroll', () => {
       if (window.scrollY > 50) {
           header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
       } else {
           header.style.boxShadow = 'none';
       }
   });

   // Простейшая валидация формы
   const form = document.getElementById('contactForm');
   if (form) {
       form.addEventListener('submit', function(e) {
           const consent = form.querySelector('input[name="consent"]');
           if (consent && !consent.checked) {
               e.preventDefault();
               alert('Пожалуйста, подтвердите согласие на обработку персональных данных.');
               return false;
           }
           // Если всё хорошо — форма уйдёт на submit.php
       });
   }
});