// Модуль для работы с грамматикой

import { grammarData } from '../data/grammar-data.js';
import { saveToLocalStorage, getFromLocalStorage } from '../script.js';

export function initGrammar() {
    renderGrammarLessons();
}

// Рендеринг уроков грамматики
function renderGrammarLessons() {
    const container = document.getElementById('grammarLessons');
    if (!container) return;

    container.innerHTML = grammarData.map(lesson => createLessonElement(lesson)).join('');

    // Добавляем обработчики для аккордеона
    container.querySelectorAll('.lesson-header').forEach((header, index) => {
        header.addEventListener('click', () => {
            const lessonItem = header.parentElement;
            const isActive = lessonItem.classList.contains('active');
            
            // Закрываем все уроки
            container.querySelectorAll('.lesson-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Открываем кликнутый урок, если он был закрыт
            if (!isActive) {
                lessonItem.classList.add('active');
                
                // Отмечаем урок как пройденный при открытии
                const completedLessons = getFromLocalStorage('completedLessons', []);
                if (!completedLessons.includes(lesson.id)) {
                    completedLessons.push(lesson.id);
                    saveToLocalStorage('completedLessons', completedLessons);
                }
            }
        });
    });

    // Обработчики для упражнений
    container.querySelectorAll('.check-btn').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            checkExercise(index, btn);
        });
    });
}

// Создание элемента урока
function createLessonElement(lesson) {
    return `
        <div class="lesson-item">
            <div class="lesson-header">
                <h3>${lesson.title}</h3>
                <span class="lesson-icon">▼</span>
            </div>
            <div class="lesson-content">
                <div class="lesson-body">
                    <div class="rule">
                        <p><strong>Правило:</strong> ${lesson.rule}</p>
                        <p style="margin-top: 1rem;"><strong>Структура:</strong> ${lesson.structure}</p>
                    </div>
                    
                    <h4 style="margin: 1.5rem 0 1rem; color: var(--primary-color);">Примеры:</h4>
                    <table class="examples-table">
                        <thead>
                            <tr>
                                <th>Английский</th>
                                <th>Русский</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${lesson.examples.map(ex => `
                                <tr>
                                    <td>${ex.en}</td>
                                    <td>${ex.ru}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    
                    <div class="exercise">
                        <h4 style="margin-bottom: 1rem; color: var(--primary-color);">Упражнение:</h4>
                        <p>${lesson.exercise.sentence.replace('___', '<span class="exercise-gap">___</span>')}</p>
                        <input type="text" class="exercise-input" 
                               placeholder="Введите ответ" 
                               data-correct="${lesson.exercise.correctAnswer}"
                               data-hint="${lesson.exercise.hint}">
                        <div style="display: flex; gap: 1rem; align-items: center;">
                            <button class="check-btn">Проверить</button>
                            <span class="hint-text" style="color: var(--text-light); font-size: 0.9rem; display: none;">
                                Подсказка: ${lesson.exercise.hint}
                            </span>
                        </div>
                        <div class="feedback" style="display: none;"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Проверка упражнения
function checkExercise(lessonIndex, button) {
    const lessonItem = button.closest('.lesson-item');
    const input = lessonItem.querySelector('.exercise-input');
    const feedback = lessonItem.querySelector('.feedback');
    const hintText = lessonItem.querySelector('.hint-text');
    const correctAnswer = input.dataset.correct.toLowerCase().trim();
    const userAnswer = input.value.toLowerCase().trim();

    feedback.style.display = 'block';
    
    if (userAnswer === correctAnswer) {
        feedback.textContent = '✅ Правильно! Отличная работа!';
        feedback.className = 'feedback correct';
        input.disabled = true;
        button.disabled = true;
        button.style.opacity = '0.5';
        button.style.cursor = 'not-allowed';
        
        // Сохраняем результат
        const completedExercises = getFromLocalStorage('completedExercises', []);
        if (!completedExercises.includes(grammarData[lessonIndex].id)) {
            completedExercises.push(grammarData[lessonIndex].id);
            saveToLocalStorage('completedExercises', completedExercises);
        }
    } else {
        feedback.textContent = '❌ Неправильно. Попробуйте еще раз!';
        feedback.className = 'feedback incorrect';
        hintText.style.display = 'inline';
        
        // Показываем правильный ответ через 2 секунды
        setTimeout(() => {
            if (input.value.toLowerCase().trim() !== correctAnswer) {
                feedback.textContent = `Правильный ответ: ${correctAnswer}`;
            }
        }, 2000);
    }

    // Разрешаем нажать Enter для проверки
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !input.disabled) {
            button.click();
        }
    });
}

