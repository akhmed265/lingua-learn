// Модуль для работы со словарем

import { wordsData, categories, cefrLevels } from '../data/words-data.js';
import { speakText, saveToLocalStorage, getFromLocalStorage } from '../script.js';

let currentCategory = 'all';
let currentLevel = 'all';
let searchQuery = '';
let studyMode = false;
let studyIndex = 0;
let studyWords = [];
let learnedWords = getFromLocalStorage('learnedWords', []);
let spacedRepetition = getFromLocalStorage('spacedRepetition', {});

export function initVocabulary() {
    initSearch();
    initStudyMode();
    renderCategoryFilters();
    renderLevelFilters();
    applyFilters();
    updateProgress();
}

// Инициализация поиска
function initSearch() {
    const searchInput = document.getElementById('wordSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            applyFilters();
        });
    }
}

// Инициализация режима изучения
function initStudyMode() {
    const studyBtn = document.getElementById('toggleStudyMode');
    const reviewBtn = document.getElementById('reviewLearnedBtn');
    const randomBtn = document.getElementById('randomWordsBtn');
    
    if (studyBtn) {
        studyBtn.addEventListener('click', () => {
            studyMode = !studyMode;
            studyBtn.textContent = studyMode ? '❌ Выйти из режима изучения' : '📖 Режим изучения';
            
            if (studyMode) {
                startStudyMode('new');
            } else {
                exitStudyMode();
            }
        });
    }
    
    if (reviewBtn) {
        reviewBtn.addEventListener('click', () => {
            startStudyMode('review');
            studyMode = true;
        });
    }
    
    if (randomBtn) {
        randomBtn.addEventListener('click', () => {
            startStudyMode('random');
            studyMode = true;
        });
    }
}

// Начать режим изучения
function startStudyMode(mode = 'new') {
    const filteredWords = getFilteredWords();
    let wordsToStudy = [];
    
    if (mode === 'review') {
        // Повторить изученные слова
        wordsToStudy = filteredWords.filter(w => learnedWords.includes(w.id));
        if (wordsToStudy.length === 0) {
            alert('Нет изученных слов для повторения в этом фильтре!');
            return;
        }
    } else if (mode === 'random') {
        // Случайные слова из фильтра
        wordsToStudy = filteredWords;
        if (wordsToStudy.length === 0) {
            alert('Нет слов в этом фильтре!');
            return;
        }
    } else {
        // Новые слова
        wordsToStudy = filteredWords.filter(w => !learnedWords.includes(w.id));
        if (wordsToStudy.length === 0) {
            alert('Все слова из этого фильтра уже изучены!');
            studyMode = false;
            return;
        }
    }
    
    studyWords = shuffleArray([...wordsToStudy]);
    studyIndex = 0;
    renderStudyMode(mode);
}

// Выйти из режима изучения
function exitStudyMode() {
    const studyContainer = document.getElementById('studyModeContainer');
    
    if (studyContainer) {
        studyContainer.style.display = 'none';
    }
    applyFilters();
}

// Рендер режима изучения
function renderStudyMode(mode = 'new') {
    const studyContainer = document.getElementById('studyModeContainer');
    const vocabularyGrid = document.getElementById('vocabularyGrid');
    
    if (!studyContainer || !vocabularyGrid) return;
    
    if (studyIndex >= studyWords.length) {
        const modeText = mode === 'review' ? 'повторили все изученные слова' : 
                         mode === 'random' ? 'просмотрели все слова' : 
                         'изучили все слова из выбранного фильтра';
        studyContainer.innerHTML = `
            <div style="text-align: center; padding: 3rem; background: var(--bg-white); border-radius: 15px; box-shadow: var(--shadow);">
                <h2 style="color: var(--success-color); margin-bottom: 1rem;">🎉 Отлично!</h2>
                <p style="color: var(--text-dark); margin-bottom: 2rem;">Вы ${modeText}!</p>
                <button class="quiz-btn primary" onclick="location.reload()" style="padding: 1rem 2rem; background: var(--primary-color); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; font-weight: 600;">Продолжить</button>
            </div>
        `;
        studyContainer.style.display = 'block';
        vocabularyGrid.style.display = 'none';
        return;
    }
    
    const currentWord = studyWords[studyIndex];
    const progress = ((studyIndex + 1) / studyWords.length * 100).toFixed(0);
    const modeLabel = mode === 'review' ? 'Повторение' : mode === 'random' ? 'Случайные слова' : 'Изучение';
    
    studyContainer.innerHTML = `
        <div class="study-mode-card">
            <div style="text-align: center; margin-bottom: 1rem; color: var(--text-light); font-weight: 600;">
                ${modeLabel}
            </div>
            <div class="study-progress-bar">
                <div class="study-progress-fill" style="width: ${progress}%"></div>
                <span class="study-progress-text">${studyIndex + 1} / ${studyWords.length}</span>
            </div>
            
            <div class="study-word-card" id="studyWordCard">
                <div class="study-word-front">
                    <div class="level-badge level-${currentWord.level}">${currentWord.level}</div>
                    <div class="word" style="font-size: 2.5rem; margin: 2rem 0;">${currentWord.word}</div>
                    <div class="transcription" style="font-size: 1.5rem;">${currentWord.transcription}</div>
                    <button class="audio-btn" style="margin-top: 1.5rem; width: 60px; height: 60px; font-size: 1.5rem;">🔊</button>
                    <p style="margin-top: 2rem; color: var(--text-light);">Нажмите для просмотра перевода</p>
                </div>
                <div class="study-word-back" style="display: none;">
                    <div class="level-badge level-${currentWord.level}">${currentWord.level}</div>
                    <div class="translation" style="font-size: 2rem; margin: 2rem 0;">${currentWord.translation}</div>
                    <div class="example" style="font-size: 1.2rem; margin-bottom: 1.5rem;">${currentWord.example}</div>
                    <button class="audio-btn" style="margin-bottom: 1.5rem; width: 60px; height: 60px; font-size: 1.5rem;">🔊</button>
                    
                    <div class="study-actions">
                        <button class="study-btn incorrect" data-action="incorrect">❌ Не знаю</button>
                        <button class="study-btn correct" data-action="correct">✅ Знаю</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    studyContainer.style.display = 'block';
    vocabularyGrid.style.display = 'none';
    
    // Обработчики для карточки изучения
    const studyCard = document.getElementById('studyWordCard');
    const audioBtns = studyContainer.querySelectorAll('.audio-btn');
    
    studyCard.addEventListener('click', (e) => {
        if (e.target.closest('.audio-btn') || e.target.closest('.study-actions')) return;
        
        const front = studyCard.querySelector('.study-word-front');
        const back = studyCard.querySelector('.study-word-back');
        
        if (front.style.display !== 'none') {
            front.style.display = 'none';
            back.style.display = 'flex';
            back.style.flexDirection = 'column';
            back.style.alignItems = 'center';
            back.style.justifyContent = 'center';
        }
    });
    
    // Кнопка аудио для слова
    if (audioBtns[0]) {
        audioBtns[0].addEventListener('click', (e) => {
            e.stopPropagation();
            speakText(currentWord.word);
        });
    }
    
    // Кнопка аудио для примера
    if (audioBtns[1]) {
        audioBtns[1].addEventListener('click', (e) => {
            e.stopPropagation();
            speakText(currentWord.example);
        });
    }
    
    // Обработчики кнопок действий
    studyContainer.querySelectorAll('.study-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const action = btn.dataset.action;
            handleStudyAction(action, currentWord);
        });
    });
}

// Обработка действия в режиме изучения
function handleStudyAction(action, word) {
    const now = Date.now();
    
    if (action === 'correct') {
        // Добавляем в изученные
        if (!learnedWords.includes(word.id)) {
            learnedWords.push(word.id);
        }
        
        // Обновляем spaced repetition (следующее повторение через 1 день)
        spacedRepetition[word.id] = {
            nextReview: now + (24 * 60 * 60 * 1000),
            level: 1,
            lastReview: now
        };
    } else {
        // Неправильный ответ - повторим через 1 час
        spacedRepetition[word.id] = {
            nextReview: now + (60 * 60 * 1000),
            level: 0,
            lastReview: now
        };
    }
    
    saveToLocalStorage('learnedWords', learnedWords);
    saveToLocalStorage('spacedRepetition', spacedRepetition);
    
    studyIndex++;
    updateProgress();
    renderStudyMode();
}

// Получить отфильтрованные слова
function getFilteredWords() {
    let filtered = [...wordsData];
    
    // Фильтр по категории
    if (currentCategory !== 'all') {
        filtered = filtered.filter(word => word.category === currentCategory);
    }
    
    // Фильтр по уровню
    if (currentLevel !== 'all') {
        filtered = filtered.filter(word => word.level === currentLevel);
    }
    
    // Фильтр по поиску
    if (searchQuery) {
        filtered = filtered.filter(word => 
            word.word.toLowerCase().includes(searchQuery) ||
            word.translation.toLowerCase().includes(searchQuery) ||
            word.example.toLowerCase().includes(searchQuery)
        );
    }
    
    return filtered;
}

// Применить фильтры
function applyFilters() {
    const filteredWords = getFilteredWords();
    renderVocabularyCards(filteredWords);
    
    // Обновить счетчик
    const counter = document.getElementById('wordsCounter');
    if (counter) {
        const learnedCount = filteredWords.filter(w => learnedWords.includes(w.id)).length;
        counter.innerHTML = `
            <strong>Найдено слов: ${filteredWords.length}</strong>
            ${learnedCount > 0 ? `<span style="color: var(--success-color); margin-left: 1rem;">✓ Изучено: ${learnedCount}</span>` : ''}
        `;
    }
}


// Рендеринг фильтров категорий
function renderCategoryFilters() {
    const filterContainer = document.getElementById('categoryFilter');
    if (!filterContainer) return;

    filterContainer.innerHTML = categories.map(cat => `
        <button class="filter-btn ${cat.id === currentCategory ? 'active' : ''}" 
                data-category="${cat.id}">
            ${cat.name}
        </button>
    `).join('');

    // Обработчики кликов на фильтры
    filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentCategory = btn.dataset.category;
            document.querySelectorAll('#categoryFilter .filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyFilters();
        });
    });
}

// Рендеринг фильтров уровней
function renderLevelFilters() {
    const levelContainer = document.getElementById('levelFilter');
    if (!levelContainer) return;

    levelContainer.innerHTML = cefrLevels.map(level => `
        <button class="level-filter-btn ${level.id === currentLevel ? 'active' : ''}" 
                data-level="${level.id}"
                style="${level.color ? `border-color: ${level.color};` : ''}">
            ${level.name}
        </button>
    `).join('');

    // Обработчики кликов на фильтры уровней
    levelContainer.querySelectorAll('.level-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentLevel = btn.dataset.level;
            document.querySelectorAll('#levelFilter .level-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyFilters();
        });
    });
}

// Рендеринг карточек слов
function renderVocabularyCards(words) {
    const grid = document.getElementById('vocabularyGrid');
    if (!grid) return;
    
    grid.style.display = 'grid';

    if (words.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-light);">
                <p style="font-size: 1.2rem;">Слова не найдены</p>
                <p>Попробуйте изменить фильтры или поисковый запрос</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = words.map(word => createVocabularyCard(word)).join('');

    // Добавляем обработчики для карточек
    grid.querySelectorAll('.vocab-card').forEach((card, index) => {
        const word = words[index];
        
        card.addEventListener('click', (e) => {
            // Не переворачиваем карточку при клике на кнопку аудио или бейдж уровня
            if (e.target.closest('.audio-btn') || e.target.closest('.level-badge')) {
                return;
            }
            card.classList.toggle('flipped');
            
            // Отмечаем слово как изученное при перевороте
            if (!learnedWords.includes(word.id)) {
                learnedWords.push(word.id);
                saveToLocalStorage('learnedWords', learnedWords);
                updateProgress();
            }
        });
        
        // Обработчики для кнопок аудио
        const audioBtns = card.querySelectorAll('.audio-btn');
        
        // Кнопка на лицевой стороне - озвучивает слово
        if (audioBtns[0]) {
            audioBtns[0].addEventListener('click', (e) => {
                e.stopPropagation();
                speakText(word.word);
            });
        }
        
        // Кнопка на обратной стороне - озвучивает пример
        if (audioBtns[1]) {
            audioBtns[1].addEventListener('click', (e) => {
                e.stopPropagation();
                speakText(word.example);
            });
        }
    });
}

// Создание карточки слова
function createVocabularyCard(word) {
    const isLearned = learnedWords.includes(word.id);
    const levelColor = cefrLevels.find(l => l.id === word.level)?.color || '#666';
    
    return `
        <div class="vocab-card ${isLearned ? 'learned' : ''}" data-word-id="${word.id}">
            <div class="vocab-card-inner">
                <div class="vocab-card-front">
                    <div class="level-badge level-${word.level}" style="background-color: ${levelColor}20; color: ${levelColor}; border-color: ${levelColor};">
                        ${word.level}
                    </div>
                    <div class="word">${word.word}</div>
                    <div class="transcription">${word.transcription}</div>
                    <button class="audio-btn" aria-label="Озвучить">🔊</button>
                    <p style="margin-top: 1rem; color: var(--text-light); font-size: 0.9rem;">
                        Кликните для перевода
                    </p>
                    ${isLearned ? '<div style="margin-top: 0.5rem; color: var(--success-color); font-size: 0.85rem;">✓ Изучено</div>' : ''}
                </div>
                <div class="vocab-card-back">
                    <div class="level-badge level-${word.level}" style="background-color: ${levelColor}20; color: ${levelColor}; border-color: ${levelColor};">
                        ${word.level}
                    </div>
                    <div class="translation">${word.translation}</div>
                    <div class="example">${word.example}</div>
                    <button class="audio-btn" aria-label="Озвучить пример">🔊</button>
                </div>
            </div>
        </div>
    `;
}

// Обновление прогресса изученных слов
function updateProgress() {
    const stats = getFromLocalStorage('progressStats', {
        wordsLearned: 0,
        lessonsCompleted: 0,
        quizBestScore: 0,
        wordsByLevel: {}
    });
    
    stats.wordsLearned = learnedWords.length;
    
    // Статистика по уровням
    stats.wordsByLevel = {};
    cefrLevels.forEach(level => {
        if (level.id !== 'all') {
            const levelWords = wordsData.filter(w => w.level === level.id);
            const learnedLevelWords = levelWords.filter(w => learnedWords.includes(w.id));
            stats.wordsByLevel[level.id] = {
                total: levelWords.length,
                learned: learnedLevelWords.length
            };
        }
    });
    
    saveToLocalStorage('progressStats', stats);
}

// Утилита для перемешивания массива
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Получить слова для повторения (Spaced Repetition)
export function getWordsForReview() {
    const now = Date.now();
    const wordsToReview = [];
    
    Object.keys(spacedRepetition).forEach(wordId => {
        const reviewData = spacedRepetition[wordId];
        if (reviewData.nextReview <= now) {
            const word = wordsData.find(w => w.id === parseInt(wordId));
            if (word) {
                wordsToReview.push(word);
            }
        }
    });
    
    return wordsToReview;
}
