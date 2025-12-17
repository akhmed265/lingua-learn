// Модуль для практических упражнений (Викторина, Аудирование)

import { quizData, quizDataByLevel, listeningData, listeningDataByLevel } from '../data/quiz-data.js';
import { speakText, saveToLocalStorage, getFromLocalStorage } from '../script.js';
import { cefrLevels } from '../data/words-data.js';

let currentQuizLevel = null;
let currentQuizData = [];
let currentQuizIndex = 0;
let quizScore = 0;
let currentQuizAnswers = [];
let currentListeningLevel = null;
let currentListeningIndex = 0;

export function initPractice() {
    initTabs();
    initQuiz();
    initListening();
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
    renderQuizLevelSelection();
}

function renderQuizLevelSelection() {
    const container = document.getElementById('quizContent');
    if (!container) return;

    container.innerHTML = `
        <div class="quiz-container">
            <h2 style="text-align: center; margin-bottom: 2rem; color: var(--text-dark);">
                Выберите уровень для викторины
            </h2>
            <p style="text-align: center; margin-bottom: 2rem; color: var(--text-light);">
                Викторина поможет проверить ваши знания на разных уровнях CEFR
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                ${cefrLevels.filter(l => l.id !== 'all' && quizDataByLevel[l.id] && quizDataByLevel[l.id].length > 0).map(level => {
                    const levelData = quizDataByLevel[level.id];
                    const stats = getFromLocalStorage('quizLevelStats', {});
                    const bestScore = stats[level.id]?.bestScore || 0;
                    return `
                        <div class="level-quiz-card" data-level="${level.id}" style="
                            padding: 2rem;
                            background: var(--bg-white);
                            border-radius: 15px;
                            box-shadow: var(--shadow);
                            text-align: center;
                            cursor: pointer;
                            transition: var(--transition);
                            border: 3px solid ${level.color}40;
                        ">
                            <div class="level-badge level-${level.id}" style="margin-bottom: 1rem;">
                                ${level.id}
                            </div>
                            <h3 style="color: var(--text-dark); margin-bottom: 0.5rem;">${level.name.split(' - ')[1]}</h3>
                            <p style="color: var(--text-light); font-size: 0.9rem; margin-bottom: 1rem;">
                                ${levelData.length} вопросов
                            </p>
                            ${bestScore > 0 ? `
                                <p style="color: ${level.color}; font-weight: 600; font-size: 0.9rem;">
                                    Лучший результат: ${bestScore}%
                                </p>
                            ` : ''}
                        </div>
                    `;
                }).join('')}
            </div>
            <div style="text-align: center;">
                <button class="quiz-btn secondary" id="quizProgressiveMode" style="padding: 1rem 2rem;">
                    📈 Постепенное прохождение (начните с A1)
                </button>
            </div>
        </div>
    `;

    // Обработчики выбора уровня
    container.querySelectorAll('.level-quiz-card').forEach(card => {
        card.addEventListener('click', () => {
            const level = card.dataset.level;
            startQuiz(level);
        });
    });

    // Режим постепенного прохождения
    const progressiveBtn = container.querySelector('#quizProgressiveMode');
    if (progressiveBtn) {
        progressiveBtn.addEventListener('click', () => {
            startProgressiveQuiz();
        });
    }
}

function startProgressiveQuiz() {
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const stats = getFromLocalStorage('quizLevelStats', {});
    
    // Находим первый уровень, который не пройден на 80%+
    for (const level of levels) {
        if (quizDataByLevel[level] && quizDataByLevel[level].length > 0) {
            const levelStats = stats[level] || { bestScore: 0 };
            if (levelStats.bestScore < 80) {
                startQuiz(level);
                return;
            }
        }
    }
    
    // Если все уровни пройдены, начинаем с A1
    startQuiz('A1');
}

function startQuiz(level) {
    currentQuizLevel = level;
    currentQuizData = quizDataByLevel[level] || [];
    currentQuizIndex = 0;
    quizScore = 0;
    currentQuizAnswers = [];
    renderQuiz();
}

function renderQuiz() {
    const container = document.getElementById('quizContent');
    if (!container) return;

    if (currentQuizData.length === 0) {
        renderQuizLevelSelection();
        return;
    }

    if (currentQuizIndex < currentQuizData.length) {
        const question = quizData[currentQuizIndex];
        const levelInfo = cefrLevels.find(l => l.id === currentQuizLevel);
        container.innerHTML = `
            <div class="quiz-container">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <div class="level-badge level-${currentQuizLevel}" style="margin: 0;">
                        ${currentQuizLevel}
                    </div>
                    <button class="quiz-btn secondary" id="exitQuiz" style="padding: 0.5rem 1rem; font-size: 0.9rem;">
                        Выйти
                    </button>
                </div>
                <div class="question-counter">
                    Вопрос ${currentQuizIndex + 1} из ${currentQuizData.length}
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
                        ${currentQuizIndex === currentQuizData.length - 1 ? 'Завершить' : 'Следующий'}
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
                if (currentQuizIndex < currentQuizData.length - 1) {
                    // Показываем правильность ответа
                    const selectedOption = container.querySelector('.quiz-option.selected');
                    if (selectedOption) {
                        const selectedIndex = parseInt(selectedOption.dataset.index);
                        const correctIndex = currentQuizData[currentQuizIndex].correctAnswer;
                        
                        selectedOption.classList.add(selectedIndex === correctIndex ? 'correct' : 'incorrect');
                        container.querySelectorAll('.quiz-option')[correctIndex].classList.add('correct');
                        
                        if (selectedIndex === correctIndex) {
                            quizScore += currentQuizData[currentQuizIndex].points;
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
                        const correctIndex = currentQuizData[currentQuizIndex].correctAnswer;
                        
                        selectedOption.classList.add(selectedIndex === correctIndex ? 'correct' : 'incorrect');
                        container.querySelectorAll('.quiz-option')[correctIndex].classList.add('correct');
                        
                        if (selectedIndex === correctIndex) {
                            quizScore += currentQuizData[currentQuizIndex].points;
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

        // Кнопка выхода
        const exitBtn = container.querySelector('#exitQuiz');
        if (exitBtn) {
            exitBtn.addEventListener('click', () => {
                if (confirm('Вы уверены, что хотите выйти? Прогресс не будет сохранен.')) {
                    renderQuizLevelSelection();
                }
            });
        }
    }
}

function finishQuiz() {
    const container = document.getElementById('quizContent');
    if (!container) return;

    const maxScore = currentQuizData.reduce((sum, q) => sum + q.points, 0);
    const totalScore = quizScore;
    const percentage = Math.round((totalScore / maxScore) * 100);
    const levelInfo = cefrLevels.find(l => l.id === currentQuizLevel);

    container.innerHTML = `
        <div class="quiz-container">
            <div class="quiz-result">
                <div class="level-badge level-${currentQuizLevel}" style="margin: 0 auto 1rem;">
                    ${currentQuizLevel}
                </div>
                <h2>Викторина завершена!</h2>
                <div class="quiz-score">${totalScore} / ${maxScore}</div>
                <p style="font-size: 1.2rem; margin-bottom: 2rem;">
                    Правильных ответов: ${percentage}%
                </p>
                ${percentage >= 80 ? `
                    <div style="padding: 1rem; background: rgba(39, 174, 96, 0.1); border-radius: 10px; margin-bottom: 2rem; color: var(--success-color);">
                        🎉 Отлично! Вы можете перейти к следующему уровню!
                    </div>
                ` : ''}
                <div class="quiz-controls" style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <button class="quiz-btn secondary" id="restartQuiz">Повторить</button>
                    <button class="quiz-btn primary" id="nextLevelQuiz">Следующий уровень</button>
                    <button class="quiz-btn secondary" id="backToLevels">Выбрать уровень</button>
                </div>
            </div>
        </div>
    `;

    // Сохраняем статистику по уровням
    const levelStats = getFromLocalStorage('quizLevelStats', {});
    if (!levelStats[currentQuizLevel] || percentage > levelStats[currentQuizLevel].bestScore) {
        levelStats[currentQuizLevel] = {
            bestScore: percentage,
            lastScore: percentage,
            completed: true
        };
    } else {
        levelStats[currentQuizLevel].lastScore = percentage;
    }
    saveToLocalStorage('quizLevelStats', levelStats);

    // Общая статистика
    const stats = getFromLocalStorage('progressStats', {
        wordsLearned: 0,
        lessonsCompleted: 0,
        quizBestScore: 0
    });
    
    const overallBest = Math.max(...Object.values(levelStats).map(s => s.bestScore));
    if (overallBest > stats.quizBestScore) {
        stats.quizBestScore = overallBest;
        saveToLocalStorage('progressStats', stats);
    }

    // Кнопки
    container.querySelector('#restartQuiz').addEventListener('click', () => {
        currentQuizIndex = 0;
        quizScore = 0;
        currentQuizAnswers = [];
        renderQuiz();
    });

    const nextLevelBtn = container.querySelector('#nextLevelQuiz');
    if (nextLevelBtn) {
        const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
        const currentIndex = levels.indexOf(currentQuizLevel);
        if (currentIndex < levels.length - 1 && quizDataByLevel[levels[currentIndex + 1]]) {
            nextLevelBtn.addEventListener('click', () => {
                startQuiz(levels[currentIndex + 1]);
            });
        } else {
            nextLevelBtn.style.display = 'none';
        }
    }

    container.querySelector('#backToLevels').addEventListener('click', () => {
        renderQuizLevelSelection();
    });
}

// ===== АУДИРОВАНИЕ =====
function initListening() {
    renderListeningLevelSelection();
}

function renderListeningLevelSelection() {
    const container = document.getElementById('listeningContent');
    if (!container) return;

    container.innerHTML = `
        <div class="quiz-container">
            <h2 style="text-align: center; margin-bottom: 2rem; color: var(--text-dark);">
                Выберите уровень для аудирования
            </h2>
            <p style="text-align: center; margin-bottom: 2rem; color: var(--text-light);">
                Прослушайте диалог и ответьте на вопросы
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;">
                ${cefrLevels.filter(l => l.id !== 'all' && listeningDataByLevel[l.id] && listeningDataByLevel[l.id].length > 0).map(level => {
                    const levelDialogs = listeningDataByLevel[level.id];
                    return `
                        <div class="level-listening-card" data-level="${level.id}" style="
                            padding: 2rem;
                            background: var(--bg-white);
                            border-radius: 15px;
                            box-shadow: var(--shadow);
                            text-align: center;
                            cursor: pointer;
                            transition: var(--transition);
                            border: 3px solid ${level.color}40;
                        ">
                            <div class="level-badge level-${level.id}" style="margin-bottom: 1rem;">
                                ${level.id}
                            </div>
                            <h3 style="color: var(--text-dark); margin-bottom: 0.5rem;">${level.name.split(' - ')[1]}</h3>
                            <p style="color: var(--text-light); font-size: 0.9rem;">
                                ${levelDialogs.length} диалог${levelDialogs.length > 1 ? 'ов' : ''}
                            </p>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;

    // Обработчики выбора уровня
    container.querySelectorAll('.level-listening-card').forEach(card => {
        card.addEventListener('click', () => {
            const level = card.dataset.level;
            currentListeningLevel = level;
            currentListeningIndex = 0;
            renderListening();
        });
    });
}

function renderListening() {
    const container = document.getElementById('listeningContent');
    if (!container) return;

    if (!currentListeningLevel || !listeningDataByLevel[currentListeningLevel]) {
        renderListeningLevelSelection();
        return;
    }

    const levelDialogs = listeningDataByLevel[currentListeningLevel];
    if (currentListeningIndex >= levelDialogs.length) {
        currentListeningIndex = 0;
    }

    const listening = levelDialogs[currentListeningIndex];
    const levelInfo = cefrLevels.find(l => l.id === currentListeningLevel);
    container.innerHTML = `
        <div class="quiz-container">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <div class="level-badge level-${currentListeningLevel}" style="margin: 0;">
                    ${currentListeningLevel}
                </div>
                <button class="quiz-btn secondary" id="exitListening" style="padding: 0.5rem 1rem; font-size: 0.9rem;">
                    Выйти
                </button>
            </div>
            <h2 style="margin-bottom: 1rem; color: var(--text-dark);">${listening.title}</h2>
            <p style="margin-bottom: 2rem; color: var(--text-light);">
                Диалог ${currentListeningIndex + 1} из ${levelDialogs.length}
            </p>
            
            <div style="text-align: center; margin-bottom: 2rem;">
                <button class="quiz-btn primary" id="playAudio" style="font-size: 1.1rem; padding: 1.2rem 3rem;">
                    🔊 Проиграть аудио
                </button>
                <button class="quiz-btn secondary" id="playAudioAgain" style="font-size: 1rem; padding: 1rem 2rem; margin-left: 1rem;">
                    🔁 Повторить
                </button>
            </div>
            
            <div style="background: var(--bg-light); padding: 1.5rem; border-radius: 10px; margin-bottom: 2rem;">
                <p style="color: var(--text-dark); line-height: 1.8; font-size: 1.05rem;">
                    ${listening.text}
                </p>
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
            
            <div style="text-align: center; margin-top: 2rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <button class="quiz-btn primary" id="checkListening">Проверить ответы</button>
                ${levelDialogs.length > 1 ? `
                    ${currentListeningIndex > 0 ? '<button class="quiz-btn secondary" id="prevDialog">← Предыдущий</button>' : ''}
                    ${currentListeningIndex < levelDialogs.length - 1 ? '<button class="quiz-btn secondary" id="nextDialog">Следующий →</button>' : ''}
                ` : ''}
            </div>
            
            <div id="listeningFeedback" style="margin-top: 2rem;"></div>
        </div>
    `;

    // Обработчик проигрывания аудио
    const playAudio = () => speakText(listening.text, 'en-US');
    
    container.querySelector('#playAudio').addEventListener('click', playAudio);
    
    const playAgainBtn = container.querySelector('#playAudioAgain');
    if (playAgainBtn) {
        playAgainBtn.addEventListener('click', playAudio);
    }

    // Кнопка выхода
    const exitBtn = container.querySelector('#exitListening');
    if (exitBtn) {
        exitBtn.addEventListener('click', () => {
            renderListeningLevelSelection();
        });
    }

    // Навигация по диалогам
    const prevDialogBtn = container.querySelector('#prevDialog');
    if (prevDialogBtn) {
        prevDialogBtn.addEventListener('click', () => {
            if (currentListeningIndex > 0) {
                currentListeningIndex--;
                renderListening();
            }
        });
    }

    const nextDialogBtn = container.querySelector('#nextDialog');
    if (nextDialogBtn) {
        nextDialogBtn.addEventListener('click', () => {
            if (currentListeningIndex < levelDialogs.length - 1) {
                currentListeningIndex++;
                renderListening();
            }
        });
    }

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


