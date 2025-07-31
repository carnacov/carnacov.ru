// Menu
(() => {
	const menuButton = document.querySelector('.menu__button');
	const menuList = document.querySelector('.menu__list');
	const menuLinks = menuList.querySelectorAll('a');
	const menuIconMenu = document.querySelector('.menu__icon-menu');
	const menuIconCross = document.querySelector('.menu__icon-cross');

	// Функция для закрытия меню
	const closeMenu = () => {
		menuButton.setAttribute('aria-expanded', 'false');
		menuButton.classList.remove('menu__button--open');
		menuList.classList.remove('menu__list--open');
		menuIconMenu.classList.remove('menu__icon--hidden');
		menuIconCross.classList.add('menu__icon--hidden');
	};

	// Обработчик клика по кнопке меню
	menuButton.addEventListener('click', () => {
		let expanded = menuButton.getAttribute('aria-expanded') === 'true';
		menuButton.setAttribute('aria-expanded', !expanded);
		menuButton.classList.toggle('menu__button--open');
		menuList.classList.toggle('menu__list--open');
		menuIconMenu.classList.toggle('menu__icon--hidden');
		menuIconCross.classList.toggle('menu__icon--hidden');
	});

	// Обработчик клика по ссылкам меню
	menuLinks.forEach(link => {
		link.addEventListener('click', closeMenu);
	});
})();

// Slider
document.addEventListener('DOMContentLoaded', () => {
	const slider = document.querySelector('.portfolio__slider-inner');
	const slides = document.querySelectorAll('.portfolio__section-container');
	const prevBtn = document.querySelector('.portfolio__nav-btn--prev');
	const nextBtn = document.querySelector('.portfolio__nav-btn--next');
	let currentIndex = 0;
	let intervalId;
	let touchStartX = 0;
	let touchEndX = 0;

	// Показать первый слайд
	slides[currentIndex].classList.add('active');

	// Функция переключения слайда
	function goToSlide(index) {
		slides[currentIndex].classList.remove('active');
		currentIndex = (index + slides.length) % slides.length;
		slides[currentIndex].classList.add('active');
		slider.style.transform = `translateX(-${currentIndex * 100}%)`;
	}

	// Следующий слайд
	function nextSlide() {
		goToSlide(currentIndex + 1);
	}

	// Предыдущий слайд
	function prevSlide() {
		goToSlide(currentIndex - 1);
	}

	// Автоматическая прокрутка
	function startAutoSlide() {
		intervalId = setInterval(nextSlide, 15000);
	}

	function stopAutoSlide() {
		clearInterval(intervalId);
	}

	// Обработчики событий для кнопок
	nextBtn.addEventListener('click', () => {
		stopAutoSlide();
		nextSlide();
		startAutoSlide();
	});

	prevBtn.addEventListener('click', () => {
		stopAutoSlide();
		prevSlide();
		startAutoSlide();
	});

	// Обработка свайпа
	slider.addEventListener('touchstart', (e) => {
		touchStartX = e.changedTouches[0].screenX;
	});

	slider.addEventListener('touchend', (e) => {
		touchEndX = e.changedTouches[0].screenX;
		handleSwipe();
	});

	function handleSwipe() {
		const swipeThreshold = 50; // Минимальная дистанция для свайпа
		if (touchStartX - touchEndX > swipeThreshold) {
			// Свайп влево - следующий слайд
			stopAutoSlide();
			nextSlide();
			startAutoSlide();
		} else if (touchEndX - touchStartX > swipeThreshold) {
			// Свайп вправо - предыдущий слайд
			stopAutoSlide();
			prevSlide();
			startAutoSlide();
		}
	}

	// Запуск автоматической прокрутки
	startAutoSlide();

	// Остановка автопрокрутки при наведении мыши
	slider.addEventListener('mouseenter', stopAutoSlide);
	slider.addEventListener('mouseleave', startAutoSlide);
});
