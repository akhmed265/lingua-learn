// Модуль для практических упражнений (Викторина, Аудирование, Конструктор предложений)

import { quizData, listeningData, sentenceBuilderData } from '../data/quiz-data.js';
import { speakText, saveToLocalStorage, getFromLocalStorage } from '../script.js';

let currentQuizIndex = 0;
let quizScore = 0;
let currentQuizAnswers = [];
let currentSentenceIndex = 0;

export function initPractice() {
    initTabs();
    initQuiz();
    initListening();
    initSentenceBuilder();
}

// Инициализация вкладок
function initTabs() {
    const tabs = document.querySelectorAll('.practice-tab');
    const contents = document.querySelectorAll('.practice-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;

            // Удаляем активный класс у всех вкладок и контента
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            // Добавляем активный класс выбранной вкладке и контенту
            tab.classList.add('active');
            const targetContent = document.getElementById(`${targetTab}Content`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// ===== ВИКТОРИНА =====
function initQuiz() {
    renderQuiz();
}

function renderQuiz() {
    const container = document.getElementById('quizContent');
    if (!container) return;

    if (currentQuizIndex < quizData.length) {
        const question = quizData[currentQuizIndex];
        container.innerHTML = `
            <div class="quiz-container">
                <div class="question-counter">
                    Вопрос ${currentQuizIndex + 1} из ${quizData.length}
                </div>
                <h2 class="question-title">${question.question}</h2>
                <div class="quiz-options">
                    ${question.options.map((option, index) => `
                        <div class="quiz-option" data-index="${index}">
                            ${option}
                        </div>
                    `).join('')}
                </div>
                <div class="quiz-controls">
                    <button class="quiz-btn secondary" id="prevBtn" ${currentQuizIndex === 0 ? 'disabled style="opacity: 0.5;"' : ''}>
                        Назад
                    </button>
                    <button class="quiz-btn primary" id="nextBtn">
                        ${currentQuizIndex === quizData.length - 1 ? 'Завершить' : 'Следующий'}
                    </button>
                </div>
            </div>
        `;

        // Обработчики для опций
        container.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', () => {
                // Убираем выделение с других опций
                container.querySelectorAll('.quiz-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                // Выделяем выбранную опцию
                option.classList.add('selected');
                currentQuizAnswers[currentQuizIndex] = parseInt(option.dataset.index);
            });
        });

        // Кнопка "Назад"
        const prevBtn = container.querySelector('#prevBtn');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentQuizIndex > 0) {
                    // Сохраняем текущий ответ перед переходом
                    const selectedOption = container.querySelector('.quiz-option.selected');
                    if (selectedOption) {
                        currentQuizAnswers[currentQuizIndex] = parseInt(selectedOption.dataset.index);
                    }
                    currentQuizIndex--;
                    renderQuiz();
                }
            });
        }

        // Кнопка "Следующий" / "Завершить"
        const nextBtn = container.querySelector('#nextBtn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentQuizIndex < quizData.length - 1) {
                    // Показываем правильность ответа
                    const selectedOption = container.querySelector('.quiz-option.selected');
                    if (selectedOption) {
                        const selectedIndex = parseInt(selectedOption.dataset.index);
                        const correctIndex = quizData[currentQuizIndex].correctAnswer;
                        
                        selectedOption.classList.add(selectedIndex === correctIndex ? 'correct' : 'incorrect');
                        container.querySelectorAll('.quiz-option')[correctIndex].classList.add('correct');
                        
                        if (selectedIndex === correctIndex) {
                            quizScore += quizData[currentQuizIndex].points;
                        }

                        setTimeout(() => {
                            currentQuizIndex++;
                            renderQuiz();
                        }, 1500);
                    } else {
                        alert('Пожалуйста, выберите ответ!');
                    }
                } else {
                    // Проверяем последний ответ перед завершением
                    const selectedOption = container.querySelector('.quiz-option.selected');
                    if (selectedOption) {
                        const selectedIndex = parseInt(selectedOption.dataset.index);
                        const correctIndex = quizData[currentQuizIndex].correctAnswer;
                        
                        selectedOption.classList.add(selectedIndex === correctIndex ? 'correct' : 'incorrect');
                        container.querySelectorAll('.quiz-option')[correctIndex].classList.add('correct');
                        
                        if (selectedIndex === correctIndex) {
                            quizScore += quizData[currentQuizIndex].points;
                        }
                        
                        setTimeout(() => {
                            finishQuiz();
                        }, 1500);
                    } else {
                        alert('Пожалуйста, выберите ответ!');
                    }
                }
            });
        }

        // Восстанавливаем предыдущий ответ, если есть
        if (currentQuizAnswers[currentQuizIndex] !== undefined) {
            container.querySelectorAll('.quiz-option')[currentQuizAnswers[currentQuizIndex]].classList.add('selected');
        }
    }
}

function finishQuiz() {
    const container = document.getElementById('quizContent');
    if (!container) return;

    const totalScore = quizScore;
    const percentage = Math.round((totalScore / (quizData.length * 10)) * 100);

    container.innerHTML = `
        <div class="quiz-container">
            <div class="quiz-result">
                <h2>Викторина завершена!</h2>
                <div class="quiz-score">${totalScore} / ${quizData.length * 10}</div>
                <p style="font-size: 1.2rem; margin-bottom: 2rem;">
                    Правильных ответов: ${percentage}%
                </p>
                <div class="quiz-controls">
                    <button class="quiz-btn primary" id="restartQuiz">Начать заново</button>
                </div>
            </div>
        </div>
    `;

    // Сохраняем лучший результат
    const stats = getFromLocalStorage('progressStats', {
        wordsLearned: 0,
        lessonsCompleted: 0,
        quizBestScore: 0
    });
    
    if (totalScore > stats.quizBestScore) {
        stats.quizBestScore = totalScore;
        saveToLocalStorage('progressStats', stats);
    }

    // Кнопка перезапуска
    const restartBtn = container.querySelector('#restartQuiz');
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            currentQuizIndex = 0;
            quizScore = 0;
            currentQuizAnswers = [];
            renderQuiz();
        });
    }
}

// ===== АУДИРОВАНИЕ =====
function initListening() {
    renderListening();
}

function renderListening() {
    const container = document.getElementById('listeningContent');
    if (!container) return;

    const listening = listeningData[0]; // Используем первый диалог
    container.innerHTML = `
        <div class="quiz-container">
            <h2 style="margin-bottom: 1.5rem; color: var(--text-dark);">${listening.title}</h2>
            <p style="margin-bottom: 2rem; color: var(--text-light);">
                Прослушайте текст и ответьте на вопросы
            </p>
            
            <div style="text-align: center; margin-bottom: 2rem;">
                <button class="quiz-btn primary" id="playAudio" style="font-size: 1.1rem; padding: 1.2rem 3rem;">
                    🔊 Проиграть аудио
                </button>
            </div>
            
            <div class="quiz-options" id="listeningQuestions">
                ${listening.questions.map((q, qIndex) => `
                    <div style="margin-bottom: 2.5rem;">
                        <h3 style="margin-bottom: 1rem; color: var(--text-dark);">
                            ${qIndex + 1}. ${q.question}
                        </h3>
                        ${q.options.map((option, oIndex) => `
                            <div class="quiz-option listening-option" 
                                 data-question="${qIndex}" 
                                 data-option="${oIndex}">
                                ${option}
                            </div>
                        `).join('')}
                    </div>
                `).join('')}
            </div>
            
            <div style="text-align: center; margin-top: 2rem;">
                <button class="quiz-btn primary" id="checkListening">Проверить ответы</button>
            </div>
            
            <div id="listeningFeedback" style="margin-top: 2rem;"></div>
        </div>
    `;

    // Обработчик проигрывания аудио
    container.querySelector('#playAudio').addEventListener('click', () => {
        speakText(listening.text, 'en-US');
    });

    // Обработчики выбора ответов
    container.querySelectorAll('.listening-option').forEach(option => {
        option.addEventListener('click', () => {
            const questionIndex = parseInt(option.dataset.question);
            // Убираем выделение с других опций того же вопроса
            container.querySelectorAll(`.listening-option[data-question="${questionIndex}"]`).forEach(opt => {
                opt.classList.remove('selected');
            });
            option.classList.add('selected');
        });
    });

    // Проверка ответов
    container.querySelector('#checkListening').addEventListener('click', () => {
        checkListeningAnswers(listening, container);
    });
}

function checkListeningAnswers(listening, container) {
    const feedbackDiv = container.querySelector('#listeningFeedback');
    let correctCount = 0;
    
    listening.questions.forEach((question, qIndex) => {
        const selectedOption = container.querySelector(`.listening-option.selected[data-question="${qIndex}"]`);
        if (selectedOption) {
            const selectedIndex = parseInt(selectedOption.dataset.option);
            const correctIndex = question.correctAnswer;
            
            if (selectedIndex === correctIndex) {
                selectedOption.classList.add('correct');
                correctCount++;
            } else {
                selectedOption.classList.add('incorrect');
                container.querySelectorAll(`.listening-option[data-question="${qIndex}"]`)[correctIndex].classList.add('correct');
            }
        }
    });

    const percentage = Math.round((correctCount / listening.questions.length) * 100);
    feedbackDiv.innerHTML = `
        <div class="feedback ${correctCount === listening.questions.length ? 'correct' : 'incorrect'}" 
             style="display: block; padding: 1.5rem; text-align: center;">
            <h3>Результат: ${correctCount} из ${listening.questions.length}</h3>
            <p style="font-size: 1.1rem; margin-top: 0.5rem;">
                Правильных ответов: ${percentage}%
            </p>
        </div>
    `;
}

// ===== КОНСТРУКТОР ПРЕДЛОЖЕНИЙ =====
function initSentenceBuilder() {
    renderSentenceBuilder();
}

function renderSentenceBuilder() {
    const container = document.getElementById('sentenceBuilderContent');
    if (!container) return;

    const sentenceData = sentenceBuilderData[currentSentenceIndex];
    const shuffledWords = [...sentenceData.words].sort(() => Math.random() - 0.5);

    container.innerHTML = `
        <div class="sentence-builder">
            <h2 style="margin-bottom: 1rem; color: var(--text-dark);">
                Задание ${currentSentenceIndex + 1} из ${sentenceBuilderData.length}
            </h2>
            <p style="margin-bottom: 2rem; color: var(--text-light);">
                ${sentenceData.hint}
            </p>
            
            <div class="words-pool" id="wordsPool">
                ${shuffledWords.map(word => `
                    <div class="word-chip" draggable="true" data-word="${word}">
                        ${word}
                    </div>
                `).join('')}
            </div>
            
            <div class="sentence-area" id="sentenceArea">
                <p style="color: var(--text-light);">Перетащите слова сюда, чтобы составить предложение</p>
            </div>
            
            <div style="display: flex; gap: 1rem; margin-top: 2rem; justify-content: center;">
                <button class="quiz-btn secondary" id="clearSentence">Очистить</button>
                <button class="quiz-btn primary" id="checkSentence">Проверить</button>
                ${currentSentenceIndex < sentenceBuilderData.length - 1 
                    ? '<button class="quiz-btn secondary" id="nextSentence">Следующее задание</button>'
                    : ''
                }
            </div>
            
            <div id="sentenceFeedback" style="margin-top: 2rem;"></div>
        </div>
    `;

    initDragAndDrop(sentenceData);
}

function initDragAndDrop(sentenceData) {
    const wordsPool = document.getElementById('wordsPool');
    const sentenceArea = document.getElementById('sentenceArea');
    const chips = wordsPool.querySelectorAll('.word-chip');
    let draggedElement = null;
    const droppedWords = [];

    // Drag start
    chips.forEach(chip => {
        chip.addEventListener('dragstart', (e) => {
            draggedElement = chip;
            chip.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
        });

        chip.addEventListener('dragend', () => {
            chip.classList.remove('dragging');
        });
    });

    // Drop zone
    sentenceArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        sentenceArea.classList.add('drag-over');
    });

    sentenceArea.addEventListener('dragleave', () => {
        sentenceArea.classList.remove('drag-over');
    });

    sentenceArea.addEventListener('drop', (e) => {
        e.preventDefault();
        sentenceArea.classList.remove('drag-over');
        
        if (draggedElement && draggedElement.parentElement === wordsPool) {
            const word = draggedElement.dataset.word;
            droppedWords.push(word);
            draggedElement.remove();
            
            const sentenceWord = document.createElement('span');
            sentenceWord.className = 'sentence-word';
            sentenceWord.textContent = word;
            sentenceWord.dataset.word = word;
            
            sentenceArea.querySelector('p').style.display = 'none';
            sentenceArea.appendChild(sentenceWord);
        }
    });

    // Кнопка очистки
    document.getElementById('clearSentence').addEventListener('click', () => {
        const sentenceWords = sentenceArea.querySelectorAll('.sentence-word');
        sentenceWords.forEach(sw => {
            const word = sw.dataset.word;
            const chip = document.createElement('div');
            chip.className = 'word-chip';
            chip.draggable = true;
            chip.dataset.word = word;
            chip.textContent = word;
            chip.addEventListener('dragstart', (e) => {
                draggedElement = chip;
                chip.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
            });
            chip.addEventListener('dragend', () => {
                chip.classList.remove('dragging');
            });
            wordsPool.appendChild(chip);
        });
        
        sentenceArea.innerHTML = '<p style="color: var(--text-light);">Перетащите слова сюда, чтобы составить предложение</p>';
        droppedWords.length = 0;
    });

    // Проверка предложения
    document.getElementById('checkSentence').addEventListener('click', () => {
        const feedbackDiv = document.getElementById('sentenceFeedback');
        const userSentence = Array.from(sentenceArea.querySelectorAll('.sentence-word'))
            .map(sw => sw.dataset.word)
            .join(' ')
            .toLowerCase();
        const correctSentence = sentenceData.correctSentence.toLowerCase();

        if (userSentence === correctSentence) {
            feedbackDiv.innerHTML = `
                <div class="feedback correct" style="display: block; text-align: center; padding: 1.5rem;">
                    ✅ Правильно! Отличная работа!
                </div>
            `;
        } else {
            feedbackDiv.innerHTML = `
                <div class="feedback incorrect" style="display: block; text-align: center; padding: 1.5rem;">
                    ❌ Неправильно. Попробуйте еще раз!<br>
                    <small style="margin-top: 0.5rem; display: block;">
                        Правильный ответ: ${sentenceData.correctSentence}
                    </small>
                </div>
            `;
        }
    });

    // Следующее задание
    const nextBtn = document.getElementById('nextSentence');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentSentenceIndex < sentenceBuilderData.length - 1) {
                currentSentenceIndex++;
                renderSentenceBuilder();
            }
        });
    }
}

