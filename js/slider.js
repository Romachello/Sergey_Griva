(function() {
   const track = document.getElementById('testimonialTrack');
   const prevBtn = document.getElementById('prevBtn');
   const nextBtn = document.getElementById('nextBtn');
   const dotsContainer = document.getElementById('testimonialDots');
   const viewport = document.getElementById('testimonialViewport');

   if (!track || !prevBtn || !nextBtn || !dotsContainer || !viewport) return;

   const slides = Array.from(track.children);
   if (slides.length === 0) return;

   // Если слайд один — скрываем элементы управления
   if (slides.length <= 1) {
       prevBtn.style.display = 'none';
       nextBtn.style.display = 'none';
       dotsContainer.style.display = 'none';
       return;
   }

   let currentIndex = 0;
   let isTransitioning = false;
   let autoPlayInterval;
   let isHovered = false;

   // Создаём точки
   slides.forEach((_, index) => {
       const dot = document.createElement('span');
       dot.classList.add('testimonials__dot');
       dot.addEventListener('click', () => goToSlide(index));
       dotsContainer.appendChild(dot);
   });
   const dots = Array.from(dotsContainer.children);

   // Установка позиции
   function updatePosition() {
       track.style.transform = `translateX(-${currentIndex * 100}%)`;
       dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
   }

   // Переход к слайду
   function goToSlide(index) {
       if (isTransitioning || index === currentIndex) return;
       isTransitioning = true;
       currentIndex = index;
       updatePosition();
       setTimeout(() => { isTransitioning = false; }, 500);
   }

   // Следующий / предыдущий
   function nextSlide() {
       goToSlide((currentIndex + 1) % slides.length);
   }
   function prevSlide() {
       goToSlide((currentIndex - 1 + slides.length) % slides.length);
   }

   // Автоплей
   function startAutoPlay() {
       stopAutoPlay();
       autoPlayInterval = setInterval(nextSlide, 5000);
   }
   function stopAutoPlay() {
       clearInterval(autoPlayInterval);
   }
   function resetAutoPlay() {
       stopAutoPlay();
       if (!isHovered) startAutoPlay();
   }

   // Обработчики кнопок
   prevBtn.addEventListener('click', (e) => {
       e.stopPropagation();
       prevSlide();
       resetAutoPlay();
   });
   nextBtn.addEventListener('click', (e) => {
       e.stopPropagation();
       nextSlide();
       resetAutoPlay();
   });

   // Пауза при наведении на всю область слайдера (не только viewport)
   const slider = document.querySelector('.testimonials__slider');
   slider.addEventListener('mouseenter', () => {
       isHovered = true;
       stopAutoPlay();
   });
   slider.addEventListener('mouseleave', () => {
       isHovered = false;
       startAutoPlay();
   });

   // Свайп (touch)
   let touchStartX = 0;
   viewport.addEventListener('touchstart', (e) => {
       touchStartX = e.changedTouches[0].screenX;
       stopAutoPlay();
   }, {passive: true});
   viewport.addEventListener('touchend', (e) => {
       const touchEndX = e.changedTouches[0].screenX;
       const diff = touchStartX - touchEndX;
       if (Math.abs(diff) > 40) {
           if (diff > 0) nextSlide();
           else prevSlide();
       }
       if (!isHovered) startAutoPlay();
   });

   // Ресайз
   window.addEventListener('resize', updatePosition);

   // Инициализация
   updatePosition();
   startAutoPlay();
})();