// Модуль для отображения прогресса пользователя

import { getFromLocalStorage } from '../script.js';

export function initProgress() {
    renderProgress();
}

function renderProgress() {
    const stats = getFromLocalStorage('progressStats', {
        wordsLearned: 0,
        lessonsCompleted: 0,
        quizBestScore: 0
    });

    const learnedWords = getFromLocalStorage('learnedWords', []);
    const completedLessons = getFromLocalStorage('completedLessons', []);
    
    // Обновляем статистику
    stats.wordsLearned = learnedWords.length;
    stats.lessonsCompleted = completedLessons.length;

    renderStatsCards(stats);
    renderDetailedProgress(stats, learnedWords, completedLessons);
}

function renderStatsCards(stats) {
    const container = document.getElementById('progressStats');
    if (!container) return;

    const totalWords = 25; // Общее количество слов в словаре
    const totalLessons = 6; // Общее количество уроков грамматики
    const totalQuizScore = 100; // Максимальный балл викторины

    container.innerHTML = `
        <div class="stat-card">
            <div class="stat-label">Изучено слов</div>
            <div class="stat-value">${stats.wordsLearned}</div>
            <div class="progress-bar-container">
                <div class="progress-bar" style="width: ${(stats.wordsLearned / totalWords) * 100}%;">
                    ${Math.round((stats.wordsLearned / totalWords) * 100)}%
                </div>
            </div>
            <div style="margin-top: 0.5rem; color: var(--text-light);">
                из ${totalWords} слов
            </div>
        </div>
        
        <div class="stat-card">
            <div class="stat-label">Пройдено уроков</div>
            <div class="stat-value">${stats.lessonsCompleted}</div>
            <div class="progress-bar-container">
                <div class="progress-bar" style="width: ${(stats.lessonsCompleted / totalLessons) * 100}%;">
                    ${Math.round((stats.lessonsCompleted / totalLessons) * 100)}%
                </div>
            </div>
            <div style="margin-top: 0.5rem; color: var(--text-light);">
                из ${totalLessons} уроков
            </div>
        </div>
        
        <div class="stat-card">
            <div class="stat-label">Лучший результат викторины</div>
            <div class="stat-value">${stats.quizBestScore}</div>
            <div class="progress-bar-container">
                <div class="progress-bar" style="width: ${(stats.quizBestScore / totalQuizScore) * 100}%;">
                    ${stats.quizBestScore}%
                </div>
            </div>
            <div style="margin-top: 0.5rem; color: var(--text-light);">
                из ${totalQuizScore} баллов
            </div>
        </div>
    `;
}

function renderDetailedProgress(stats, learnedWords, completedLessons) {
    const container = document.getElementById('detailedProgress');
    if (!container) return;

    const completionRate = Math.round(
        ((stats.wordsLearned / 25) + (stats.lessonsCompleted / 6) + (stats.quizBestScore / 100)) / 3 * 100
    );

    container.innerHTML = `
        <div style="margin-bottom: 2rem;">
            <h3 style="color: var(--primary-color); margin-bottom: 1rem;">Общий прогресс</h3>
            <div class="progress-bar-container" style="height: 40px;">
                <div class="progress-bar" style="width: ${completionRate}%; font-size: 1.1rem;">
                    ${completionRate}%
                </div>
            </div>
        </div>
        
        <div style="margin-top: 2rem;">
            <h3 style="color: var(--primary-color); margin-bottom: 1rem;">Статистика по разделам</h3>
            <div style="display: grid; gap: 1.5rem;">
                <div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span style="font-weight: 600;">Словарь</span>
                        <span style="color: var(--text-light);">
                            ${stats.wordsLearned} / 25 слов изучено
                        </span>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${(stats.wordsLearned / 25) * 100}%;">
                            ${Math.round((stats.wordsLearned / 25) * 100)}%
                        </div>
                    </div>
                </div>
                
                <div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span style="font-weight: 600;">Грамматика</span>
                        <span style="color: var(--text-light);">
                            ${stats.lessonsCompleted} / 6 уроков пройдено
                        </span>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${(stats.lessonsCompleted / 6) * 100}%;">
                            ${Math.round((stats.lessonsCompleted / 6) * 100)}%
                        </div>
                    </div>
                </div>
                
                <div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span style="font-weight: 600;">Викторина</span>
                        <span style="color: var(--text-light);">
                            Лучший результат: ${stats.quizBestScore} / 100
                        </span>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${(stats.quizBestScore / 100) * 100}%;">
                            ${stats.quizBestScore}%
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div style="margin-top: 2rem; padding: 1.5rem; background: var(--bg-light); border-radius: 10px;">
            <h3 style="color: var(--primary-color); margin-bottom: 1rem;">Достижения</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
                ${getAchievements(stats, learnedWords, completedLessons).map(achievement => `
                    <div style="padding: 0.8rem 1.2rem; background: var(--bg-white); border-radius: 8px; border-left: 4px solid var(--primary-color);">
                        <strong>${achievement.icon}</strong> ${achievement.text}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function getAchievements(stats, learnedWords, completedLessons) {
    const achievements = [];
    
    if (stats.wordsLearned >= 5) {
        achievements.push({ icon: '🎯', text: 'Начинающий: Изучено 5+ слов' });
    }
    if (stats.wordsLearned >= 10) {
        achievements.push({ icon: '📚', text: 'Любознательный: Изучено 10+ слов' });
    }
    if (stats.wordsLearned >= 20) {
        achievements.push({ icon: '🌟', text: 'Энтузиаст: Изучено 20+ слов' });
    }
    if (stats.lessonsCompleted >= 3) {
        achievements.push({ icon: '📖', text: 'Ученик: Пройдено 3+ урока' });
    }
    if (stats.lessonsCompleted >= 6) {
        achievements.push({ icon: '🎓', text: 'Отличник: Все уроки пройдены!' });
    }
    if (stats.quizBestScore >= 50) {
        achievements.push({ icon: '🏆', text: 'Победитель: 50+ баллов в викторине' });
    }
    if (stats.quizBestScore === 100) {
        achievements.push({ icon: '👑', text: 'Чемпион: Идеальный результат в викторине!' });
    }
    
    return achievements.length > 0 ? achievements : [{ icon: '🚀', text: 'Начните обучение, чтобы получить достижения!' }];
}

