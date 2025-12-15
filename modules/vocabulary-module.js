// Модуль для работы со словарем

import { wordsData, categories } from '../data/words-data.js';
import { speakText, saveToLocalStorage, getFromLocalStorage } from '../script.js';

let currentCategory = 'all';
let learnedWords = getFromLocalStorage('learnedWords', []);

export function initVocabulary() {
    renderCategoryFilters();
    renderVocabularyCards(wordsData);
    updateProgress();
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
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filteredWords = currentCategory === 'all' 
                ? wordsData 
                : wordsData.filter(word => word.category === currentCategory);
            
            renderVocabularyCards(filteredWords);
        });
    });
}

// Рендеринг карточек слов
function renderVocabularyCards(words) {
    const grid = document.getElementById('vocabularyGrid');
    if (!grid) return;

    grid.innerHTML = words.map(word => createVocabularyCard(word)).join('');

    // Добавляем обработчики для карточек
    grid.querySelectorAll('.vocab-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Не переворачиваем карточку при клике на кнопку аудио
            if (e.target.closest('.audio-btn')) {
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
    });

    // Обработчики для кнопок аудио
    grid.querySelectorAll('.vocab-card').forEach((card, cardIndex) => {
        const word = words[cardIndex];
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
    return `
        <div class="vocab-card ${isLearned ? 'learned' : ''}">
            <div class="vocab-card-inner">
                <div class="vocab-card-front">
                    <div class="word">${word.word}</div>
                    <div class="transcription">${word.transcription}</div>
                    <button class="audio-btn" aria-label="Озвучить">🔊</button>
                    <p style="margin-top: 1rem; color: var(--text-light); font-size: 0.9rem;">
                        Кликните для перевода
                    </p>
                </div>
                <div class="vocab-card-back">
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
        quizBestScore: 0
    });
    
    stats.wordsLearned = learnedWords.length;
    saveToLocalStorage('progressStats', stats);
}

