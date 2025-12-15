// Основной файл для роутинга и инициализации SPA

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    initRouter();
    initMobileMenu();
    const page = getCurrentPage();
    updateActiveNavLink(page);
    loadPage(page);
});

// Определение текущей страницы из URL
function getCurrentPage() {
    const hash = window.location.hash.slice(1) || 'home';
    return hash;
}

// Инициализация роутера
function initRouter() {
    // Перехват кликов по навигационным ссылкам
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('href').slice(1);
            navigateTo(page);
        });
    });

    // Обработка изменения hash в URL (назад/вперед)
    window.addEventListener('popstate', () => {
        loadPage(getCurrentPage());
    });
}

// Навигация на страницу
function navigateTo(page) {
    window.location.hash = page;
    loadPage(page);
    updateActiveNavLink(page);
}

// Обновление активной ссылки в навигации
function updateActiveNavLink(page) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${page}`) {
            link.classList.add('active');
        }
    });
}

// Загрузка страницы
async function loadPage(page) {
    const app = document.getElementById('app');
    
    // Показываем индикатор загрузки
    app.innerHTML = '<div class="loading"><div class="spinner"></div><p>Загрузка...</p></div>';

    try {
        const response = await fetch(`pages/${page}.html`);
        if (!response.ok) {
            throw new Error('Страница не найдена');
        }
        const html = await response.text();
        app.innerHTML = html;

        // Загружаем соответствующий модуль
        await loadModule(page);
    } catch (error) {
        app.innerHTML = `<div class="error" style="text-align: center; padding: 3rem; color: var(--error-color);">
            <h2>Ошибка загрузки страницы</h2>
            <p>${error.message}</p>
        </div>`;
    }
}

// Загрузка модуля для страницы
async function loadModule(page) {
    const modules = {
        'vocabulary': () => {
            import('./modules/vocabulary-module.js').then(module => module.initVocabulary());
        },
        'grammar': () => {
            import('./modules/grammar-module.js').then(module => module.initGrammar());
        },
        'practice': () => {
            import('./modules/practice-module.js').then(module => module.initPractice());
        },
        'progress': () => {
            import('./modules/progress-module.js').then(module => module.initProgress());
        }
    };

    if (modules[page]) {
        await modules[page]();
    }
}

// Инициализация мобильного меню
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
}

// Утилита для сохранения в localStorage
export function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Ошибка сохранения в localStorage:', error);
    }
}

// Утилита для чтения из localStorage
export function getFromLocalStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Ошибка чтения из localStorage:', error);
        return defaultValue;
    }
}

// Функция для озвучивания текста через Web Speech API
export function speakText(text, lang = 'en-US') {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.9;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
    }
}

